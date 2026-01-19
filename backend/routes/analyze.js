import express from 'express';
import BusinessRegistration from '../models/BusinessRegistration.js';
import ragService from '../services/ragService.js';

const router = express.Router();

// Analyze business data for AI insights
router.get('/insights', async (req, res) => {
  try {
    const registrations = await BusinessRegistration.find({})
      .select('businessName primaryIndustry supplyChainRoles warehouses stores skus inventoryTypes inventoryFlow trackingMethod')
      .sort({ createdAt: -1 });

    // Basic analysis - can be enhanced with AI/ML later
    const insights = {
      totalBusinesses: registrations.length,
      industries: {},
      supplyChainRoles: {},
      scaleDistribution: {
        warehouses: {},
        stores: {},
        skus: {}
      },
      inventoryTypes: {},
      trackingMethods: {}
    };

    registrations.forEach(reg => {
      // Industry count
      if (reg.primaryIndustry) {
        insights.industries[reg.primaryIndustry] = (insights.industries[reg.primaryIndustry] || 0) + 1;
      }

      // Supply chain roles
      if (reg.supplyChainRoles) {
        reg.supplyChainRoles.forEach(role => {
          insights.supplyChainRoles[role] = (insights.supplyChainRoles[role] || 0) + 1;
        });
      }

      // Scale distribution (ranges)
      if (reg.warehouses) {
        insights.scaleDistribution.warehouses[reg.warehouses] = (insights.scaleDistribution.warehouses[reg.warehouses] || 0) + 1;
      }
      if (reg.stores) {
        insights.scaleDistribution.stores[reg.stores] = (insights.scaleDistribution.stores[reg.stores] || 0) + 1;
      }
      if (reg.skus) {
        insights.scaleDistribution.skus[reg.skus] = (insights.scaleDistribution.skus[reg.skus] || 0) + 1;
      }

      // Inventory types
      if (reg.inventoryTypes) {
        reg.inventoryTypes.forEach(type => {
          insights.inventoryTypes[type] = (insights.inventoryTypes[type] || 0) + 1;
        });
      }

      // Tracking methods
      if (reg.trackingMethod) {
        insights.trackingMethods[reg.trackingMethod] = (insights.trackingMethods[reg.trackingMethod] || 0) + 1;
      }
    });

    // No need to calculate averages since we now use distributions

    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating insights'
    });
  }
});

// Get recommendations based on business profile
router.post('/recommendations', async (req, res) => {
  try {
    const { businessId } = req.body;

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: 'Business ID is required'
      });
    }

    const business = await BusinessRegistration.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Generate basic recommendations based on business data
    const recommendations = [];

    if (business.warehouses < 5) {
      recommendations.push('Consider expanding warehouse capacity for better inventory management');
    }

    if (!business.trackingMethod || business.trackingMethod === 'Manual') {
      recommendations.push('Implement automated inventory tracking system for improved accuracy');
    }

    if (business.supplyChainRoles && business.supplyChainRoles.includes('Retailer')) {
      recommendations.push('Focus on demand forecasting to optimize inventory levels');
    }

    if (business.skus > 1000) {
      recommendations.push('Consider implementing SKU rationalization to reduce complexity');
    }

    res.json({
      success: true,
      data: {
        businessName: business.businessName,
        recommendations
      }
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations'
    });
  }
});

// AI-powered insights using RAG
router.post('/ai-insights', async (req, res) => {
  try {
    const { userId, query } = req.body;

    console.log('AI Insights request for userId:', userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const insights = await ragService.getAIInsights(userId, query);

    console.log('AI Insights response:', insights.response.substring(0, 100));

    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    console.error('Error getting AI insights:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating AI insights'
    });
  }
});

// Get inventory data and metrics for a specific user
router.get('/inventory-data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Get inventory metrics from RAG service
    const contextChunks = await ragService.query(userId, 'inventory analysis');
    const inventoryMetrics = await ragService.calculateInventoryMetrics(userId, contextChunks);

    res.json({
      success: true,
      data: inventoryMetrics
    });
  } catch (error) {
    console.error('Error getting inventory data:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving inventory data'
    });
  }
});

export default router;