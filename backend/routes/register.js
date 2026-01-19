import express from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import BusinessRegistration from '../models/BusinessRegistration.js';
import ragService from '../services/ragService.js';

const router = express.Router();

// Ensure pdfs directory exists
const pdfsDir = path.join(process.cwd(), 'pdfs');
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    cb(null, `inventory_${timestamp}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('inventoryPDF'), async (req, res) => {
  try {
    const formData = req.body;
    let inventoryPDFFilename = null;

    // Parse JSON strings back to arrays
    if (formData.supplyChainRoles && typeof formData.supplyChainRoles === 'string') {
      try {
        formData.supplyChainRoles = JSON.parse(formData.supplyChainRoles);
      } catch (e) {
        console.error('Error parsing supplyChainRoles:', e);
        formData.supplyChainRoles = [];
      }
    }

    if (formData.inventoryTypes && typeof formData.inventoryTypes === 'string') {
      try {
        formData.inventoryTypes = JSON.parse(formData.inventoryTypes);
      } catch (e) {
        console.error('Error parsing inventoryTypes:', e);
        formData.inventoryTypes = [];
      }
    }

    // Handle uploaded PDF
    if (req.file) {
      inventoryPDFFilename = req.file.filename;
      console.log('Inventory PDF uploaded:', inventoryPDFFilename);
    }

    // Generate unique filename for registration PDF
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `business_registration_${timestamp}.pdf`;
    const filepath = path.join(pdfsDir, filename);

    // Save to MongoDB
    const registrationData = {
      ...formData,
      pdfFilename: filename,
      inventoryPDFFilename: inventoryPDFFilename,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newRegistration = new BusinessRegistration(registrationData);
    await newRegistration.save();

    // Create PDF document
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Add content to PDF
    doc.fontSize(20).text('Business Registration Details', { align: 'center' });
    doc.moveDown();

    // Business Identity
    doc.fontSize(16).text('Business Identity');
    doc.fontSize(12);
    doc.text(`Business Name: ${formData.businessName || 'N/A'}`);
    doc.text(`Legal Entity Type: ${formData.legalEntityType || 'N/A'}`);
    if (formData.otherEntityType) {
      doc.text(`Other Entity Type: ${formData.otherEntityType}`);
    }
    doc.text(`Registration Number: ${formData.registrationNumber || 'N/A'}`);
    doc.text(`GST Number: ${formData.gstNumber || 'N/A'}`);
    doc.text(`Year Established: ${formData.yearEstablished || 'N/A'}`);
    doc.moveDown();

    // Primary Contact Details
    doc.fontSize(16).text('Primary Contact Details');
    doc.fontSize(12);
    doc.text(`Contact Name: ${formData.contactName || 'N/A'}`);
    doc.text(`Role: ${formData.role || 'N/A'}`);
    doc.text(`Email: ${formData.email || 'N/A'}`);
    doc.text(`Phone: ${formData.phone || 'N/A'}`);
    doc.moveDown();

    // Business Address
    doc.fontSize(16).text('Business Address');
    doc.fontSize(12);
    doc.text(`Street Address: ${formData.streetAddress || 'N/A'}`);
    doc.text(`City: ${formData.city || 'N/A'}`);
    doc.text(`State: ${formData.state || 'N/A'}`);
    doc.text(`Postal Code: ${formData.postalCode || 'N/A'}`);
    doc.text(`Country: ${formData.country || 'N/A'}`);
    doc.text(`Billing Same as Business: ${formData.billingSameAsBusiness ? 'Yes' : 'No'}`);
    doc.moveDown();

    // Supply Chain Role & Business Type
    doc.fontSize(16).text('Supply Chain Role & Business Type');
    doc.fontSize(12);
    doc.text(`Supply Chain Roles: ${formData.supplyChainRoles?.join(', ') || 'N/A'}`);
    doc.text(`Primary Industry: ${formData.primaryIndustry || 'N/A'}`);
    doc.moveDown();

    // Operational Scale
    doc.fontSize(16).text('Operational Scale');
    doc.fontSize(12);
    doc.text(`Warehouses: ${formData.warehouses || 'N/A'}`);
    doc.text(`Stores: ${formData.stores || 'N/A'}`);
    doc.text(`SKUs: ${formData.skus || 'N/A'}`);
    doc.moveDown();

    // Inventory Handling Basics
    doc.fontSize(16).text('Inventory Handling Basics');
    doc.fontSize(12);
    doc.text(`Inventory Types: ${formData.inventoryTypes?.join(', ') || 'N/A'}`);
    doc.text(`Inventory Flow: ${formData.inventoryFlow || 'N/A'}`);
    doc.text(`Tracking Method: ${formData.trackingMethod || 'N/A'}`);
    doc.moveDown();

    // System Preferences
    doc.fontSize(16).text('System Preferences');
    doc.fontSize(12);
    doc.text(`Currency: ${formData.currency || 'N/A'}`);
    doc.text(`Time Zone: ${formData.timeZone || 'N/A'}`);
    doc.text(`Language: ${formData.language || 'N/A'}`);
    doc.moveDown();

    // Compliance & Consent
    doc.fontSize(16).text('Compliance & Consent');
    doc.fontSize(12);
    doc.text(`Accept Terms: ${formData.acceptTerms ? 'Yes' : 'No'}`);
    doc.text(`Accept Privacy: ${formData.acceptPrivacy ? 'Yes' : 'No'}`);
    doc.text(`Consent Alerts: ${formData.consentAlerts ? 'Yes' : 'No'}`);
    doc.moveDown();

    // Add timestamp
    doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'right' });

    // Finalize PDF
    doc.end();

    // Wait for stream to finish
    stream.on('finish', async () => {
      res.json({
        success: true,
        message: 'Business registration data saved to database and PDF generated',
        filename: filename,
        inventoryPDFFilename: inventoryPDFFilename,
        filepath: filepath,
        registrationId: newRegistration._id
      });

      // Process PDFs for RAG in background
      const pdfPaths = [filepath];
      if (inventoryPDFFilename) {
        pdfPaths.push(path.join(pdfsDir, inventoryPDFFilename));
      }
      const userId = formData.userId; // Use the Clerk userId (email)
      try {
        await ragService.processUserPDFs(userId, pdfPaths);
        console.log('RAG processing completed for user:', userId);
      } catch (ragError) {
        console.error('Error processing PDFs for RAG:', ragError);
      }
    });

    stream.on('error', (error) => {
      console.error('Error writing PDF:', error);
      res.status(500).json({ success: false, message: 'Error generating PDF' });
    });

  } catch (error) {
    console.error('Error processing registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;