import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Building2,
  User,
  MapPin,
  Cog,
  BarChart3,
  Package,
  Settings,
  Shield,
  Sparkles,
  Star,
  Trophy,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';

const BusinessRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const steps = [
    {
      title: 'Business Identity',
      icon: Building2,
      color: 'from-blue-500 to-indigo-600',
      description: 'Tell us about your business'
    },
    {
      title: 'Primary Contact Details',
      icon: User,
      color: 'from-green-500 to-emerald-600',
      description: 'Who should we contact?'
    },
    {
      title: 'Business Address',
      icon: MapPin,
      color: 'from-purple-500 to-violet-600',
      description: 'Where are you located?'
    },
    {
      title: 'Supply Chain Role & Business Type',
      icon: Cog,
      color: 'from-orange-500 to-red-600',
      description: 'What do you do in the supply chain?'
    },
    {
      title: 'Operational Scale',
      icon: BarChart3,
      color: 'from-cyan-500 to-blue-600',
      description: 'How big is your operation?'
    },
    {
      title: 'Inventory Handling Basics',
      icon: Package,
      color: 'from-pink-500 to-rose-600',
      description: 'How do you manage inventory?'
    },
    {
      title: 'System Preferences',
      icon: Settings,
      color: 'from-yellow-500 to-orange-600',
      description: 'Customize your experience'
    },
    {
      title: 'Compliance & Consent',
      icon: Shield,
      color: 'from-gray-500 to-slate-600',
      description: 'Final legal requirements'
    },
  ];

  const [formData, setFormData] = useState({
    // Step 1: Business Identity
    businessName: '',
    legalEntityType: '',
    otherEntityType: '',
    registrationNumber: '',
    gstNumber: '',
    yearEstablished: '',

    // Step 2: Primary Contact Details
    contactName: '',
    role: '',
    email: '',
    phone: '',

    // Step 3: Business Address
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    billingSameAsBusiness: false,

    // Step 4: Supply Chain Role & Business Type
    supplyChainRoles: [],
    primaryIndustry: '',

    // Step 5: Operational Scale
    warehouses: '',
    stores: '',
    skus: '',

    // Step 6: Inventory Handling Basics
    inventoryTypes: [],
    inventoryFlow: '',
    trackingMethod: '',

    // Step 7: System Preferences
    currency: 'USD',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: 'en',

    // Step 8: Compliance & Consent
    acceptTerms: false,
    acceptPrivacy: false,
    consentAlerts: false,
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsCompleting(true);
    setShowConfetti(true);

    try {
      // Send data to backend to generate PDF
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('PDF generated successfully:', result.filename);
        // You can store the filename in localStorage or state for later reference
        localStorage.setItem('businessRegistrationPDF', result.filename);
      } else {
        console.error('Error generating PDF:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    // Simulate processing time for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to dashboard
    navigate('/dashboard');
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.businessName && formData.legalEntityType && formData.registrationNumber;
      case 1:
        return formData.contactName && formData.email && formData.phone;
      case 2:
        return formData.streetAddress && formData.city && formData.state && formData.postalCode && formData.country;
      case 3:
        return formData.supplyChainRoles.length > 0 && formData.primaryIndustry;
      case 4:
        return formData.warehouses && formData.stores && formData.skus;
      case 5:
        return formData.inventoryTypes.length > 0 && formData.inventoryFlow && formData.trackingMethod;
      case 6:
        return formData.currency && formData.timeZone && formData.language;
      case 7:
        return formData.acceptTerms && formData.acceptPrivacy;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <motion.label
                className="block text-sm font-medium mb-2 text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                Business Name
              </motion.label>
              <motion.input
                type="text"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground transition-all duration-200"
                placeholder="Enter business name"
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Legal Entity Type</label>
              <select
                value={formData.legalEntityType}
                onChange={(e) => updateFormData('legalEntityType', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="">Select entity type</option>
                <option value="sole">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llp">LLP</option>
                <option value="private">Private Limited</option>
                <option value="public">Public Limited</option>
                <option value="other">Other</option>
              </select>
            </div>
            {formData.legalEntityType === 'other' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Specify Other Entity Type</label>
                <input
                  type="text"
                  value={formData.otherEntityType}
                  onChange={(e) => updateFormData('otherEntityType', e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  placeholder="Specify entity type"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Business Registration Number</label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => updateFormData('registrationNumber', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="Enter registration number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">GST / Tax Identification Number</label>
              <input
                type="text"
                value={formData.gstNumber}
                onChange={(e) => updateFormData('gstNumber', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="Enter GST/Tax ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Year of Establishment</label>
              <input
                type="number"
                min="1900"
                max="2026"
                value={formData.yearEstablished}
                onChange={(e) => updateFormData('yearEstablished', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="YYYY"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Owner / Primary Contact Full Name</label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => updateFormData('contactName', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Role / Designation</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => updateFormData('role', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="Enter role/designation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Street Address</label>
              <input
                type="text"
                value={formData.streetAddress}
                onChange={(e) => updateFormData('streetAddress', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                placeholder="Enter street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">State / Province</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter state/province"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Postal / ZIP Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData('postalCode', e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter postal code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => updateFormData('country', e.target.value)}
                  className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="billingSame"
                checked={formData.billingSameAsBusiness}
                onChange={(e) => updateFormData('billingSameAsBusiness', e.target.checked)}
                className="mr-2 accent-primary"
              />
              <label htmlFor="billingSame" className="text-sm text-foreground">Billing Address Same as Business Address</label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <motion.label
                className="block text-sm font-medium mb-2 text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                Business Role in Supply Chain
              </motion.label>
              <div className="space-y-3">
                {['Manufacturer', 'Distributor', 'Wholesaler', 'Retailer', 'Service Provider'].map((role, index) => (
                  <motion.label
                    key={role}
                    className="flex items-center text-foreground cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.input
                      type="checkbox"
                      checked={formData.supplyChainRoles.includes(role)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...formData.supplyChainRoles, role]
                          : formData.supplyChainRoles.filter(r => r !== role);
                        updateFormData('supplyChainRoles', updated);
                      }}
                      className="mr-3 accent-primary"
                      whileHover={{ scale: 1.1 }}
                    />
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      {role}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Primary Industry / Category</label>
              <select
                value={formData.primaryIndustry}
                onChange={(e) => updateFormData('primaryIndustry', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="">Select industry</option>
                <option value="fmcg">FMCG</option>
                <option value="apparel">Apparel</option>
                <option value="electronics">Electronics</option>
                <option value="pharma">Pharma</option>
                <option value="automotive">Automotive</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Number of Warehouses</label>
              <select
                value={formData.warehouses}
                onChange={(e) => updateFormData('warehouses', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="">Select range</option>
                <option value="1-5">1-5</option>
                <option value="6-20">6-20</option>
                <option value="21-50">21-50</option>
                <option value="50+">50+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Number of Stores / Distribution Points</label>
              <select
                value={formData.stores}
                onChange={(e) => updateFormData('stores', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="">Select range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="200+">200+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Approximate Number of SKUs</label>
              <select
                value={formData.skus}
                onChange={(e) => updateFormData('skus', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="">Select range</option>
                <option value="1-50">1–50</option>
                <option value="51-200">51–200</option>
                <option value="201-1000">201–1,000</option>
                <option value="1000+">1,000+</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Inventory Type</label>
              <div className="space-y-2">
                {['Raw Materials', 'Finished Goods', 'Both'].map(type => (
                  <label key={type} className="flex items-center text-foreground">
                    <input
                      type="checkbox"
                      checked={formData.inventoryTypes.includes(type)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...formData.inventoryTypes, type]
                          : formData.inventoryTypes.filter(t => t !== type);
                        updateFormData('inventoryTypes', updated);
                      }}
                      className="mr-2 accent-primary"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <motion.label
                className="block text-sm font-medium mb-2 text-foreground"
                whileHover={{ scale: 1.02 }}
              >
                Inventory Flow Model
              </motion.label>
              <div className="space-y-3">
                {['Made-to-Stock', 'Made-to-Order', 'Hybrid'].map((model, index) => (
                  <motion.label
                    key={model}
                    className="flex items-center text-foreground cursor-pointer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.input
                      type="radio"
                      name="inventoryFlow"
                      value={model}
                      checked={formData.inventoryFlow === model}
                      onChange={(e) => updateFormData('inventoryFlow', e.target.value)}
                      className="mr-3 accent-primary"
                      whileHover={{ scale: 1.1 }}
                    />
                    <span className="flex items-center gap-2">
                      {model === 'Made-to-Stock' && <Package className="w-4 h-4 text-blue-500" />}
                      {model === 'Made-to-Order' && <Cog className="w-4 h-4 text-green-500" />}
                      {model === 'Hybrid' && <Zap className="w-4 h-4 text-purple-500" />}
                      {model}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Current Inventory Tracking Method</label>
              <div className="space-y-2">
                {['Manual (paper / Excel)', 'POS / ERP', 'No formal tracking'].map(method => (
                  <label key={method} className="flex items-center text-foreground">
                    <input
                      type="radio"
                      name="trackingMethod"
                      value={method}
                      checked={formData.trackingMethod === method}
                      onChange={(e) => updateFormData('trackingMethod', e.target.value)}
                      className="mr-2 accent-primary"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Preferred Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => updateFormData('currency', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Time Zone</label>
              <select
                value={formData.timeZone}
                onChange={(e) => updateFormData('timeZone', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Asia/Kolkata">India</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Default Language</label>
              <select
                value={formData.language}
                onChange={(e) => updateFormData('language', e.target.value)}
                className="w-full px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptTerms}
                onChange={(e) => updateFormData('acceptTerms', e.target.checked)}
                className="mt-1 mr-2 accent-primary"
              />
              <label htmlFor="terms" className="text-sm text-foreground">
                I accept the <a href="#" className="text-primary hover:underline">Terms & Conditions</a> (required)
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacy"
                checked={formData.acceptPrivacy}
                onChange={(e) => updateFormData('acceptPrivacy', e.target.checked)}
                className="mt-1 mr-2 accent-primary"
              />
              <label htmlFor="privacy" className="text-sm text-foreground">
                I accept the <a href="#" className="text-primary hover:underline">Privacy Policy</a> (required)
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="alerts"
                checked={formData.consentAlerts}
                onChange={(e) => updateFormData('consentAlerts', e.target.checked)}
                className="mt-1 mr-2 accent-primary"
              />
              <label htmlFor="alerts" className="text-sm text-foreground">
                I consent to receive operational alerts (optional)
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative overflow-hidden">
      {/* Completion overlay */}
      {isCompleting && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground mb-2">🎉 Registration Complete!</h3>
            <p className="text-muted-foreground mb-4">Setting up your FlowChain AI dashboard...</p>
            <div className="flex justify-center">
              <motion.div
                className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Welcome animation */}
      {/* <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="w-5 h-5" />
          <span className="font-medium">Welcome to FlowChain AI Registration!</span>
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </motion.div> */}

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${['bg-yellow-400', 'bg-pink-500', 'bg-blue-500', 'bg-green-400', 'bg-purple-500'][i % 5]
                }`}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: -10,
                rotate: 0,
                scale: 0
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 10,
                rotate: 360,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isUpcoming = index > currentStep;

              return (
                <div key={step.title} className="flex flex-col items-center relative">
                  <motion.div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${isCompleted
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                      : isCurrent
                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg shadow-indigo-500/30`
                        : 'bg-muted text-muted-foreground'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/30"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`text-xs font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                      {step.title}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="relative mb-4">
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full shadow-lg -translate-x-1"
              animate={{
                left: `${(currentStep / (steps.length - 1)) * 100}%`,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Form content */}
        <Card className="overflow-hidden">
          <CardHeader className={`bg-gradient-to-r ${steps[currentStep].color} text-white`}>
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = steps[currentStep].icon;
                return (
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                );
              })()}
              <div>
                <CardTitle className="text-white">{steps[currentStep].title}</CardTitle>
                <CardDescription className="text-white/80">
                  Step {currentStep + 1} of {steps.length} • {steps[currentStep].description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center px-6 py-3 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </motion.button>
              {currentStep === steps.length - 1 ? (
                <motion.button
                  onClick={handleSubmit}
                  disabled={!validateStep(currentStep)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-green-500/30"
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Complete Registration
                  <Zap className="w-4 h-4 ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-primary/30"
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={validateStep(currentStep) ? {
                    boxShadow: ["0 0 0 0 rgba(99, 102, 241, 0.4)", "0 0 0 10px rgba(99, 102, 241, 0)", "0 0 0 0 rgba(99, 102, 241, 0)"]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                  <motion.div
                    className="ml-1"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </motion.button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default BusinessRegistration;

