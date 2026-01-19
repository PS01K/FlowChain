import mongoose from 'mongoose';

const businessRegistrationSchema = new mongoose.Schema({
  // User association
  userId: { type: String, required: true },

  // Business Identity
  businessName: { type: String, required: true },
  legalEntityType: { type: String, required: true },
  otherEntityType: { type: String },
  registrationNumber: { type: String },
  gstNumber: { type: String },
  yearEstablished: { type: Number },

  // Primary Contact Details
  contactName: { type: String, required: true },
  role: { type: String },
  email: { type: String, required: true },
  phone: { type: String },

  // Business Address
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  billingSameAsBusiness: { type: Boolean, default: true },

  // Supply Chain Role & Business Type
  supplyChainRoles: [{ type: String }],
  primaryIndustry: { type: String },

  // Operational Scale
  warehouses: { type: String },
  stores: { type: String },
  skus: { type: String },

  // Inventory Handling Basics
  inventoryTypes: [{ type: String }],
  inventoryFlow: { type: String },
  trackingMethod: { type: String },

  // System Preferences
  currency: { type: String },
  timeZone: { type: String },
  language: { type: String },

  // Compliance & Consent
  acceptTerms: { type: Boolean, required: true },
  acceptPrivacy: { type: Boolean, required: true },
  consentAlerts: { type: Boolean, default: false },

  // Inventory PDF
  inventoryPDFFilename: { type: String },

  // Metadata
  pdfFilename: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

businessRegistrationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const BusinessRegistration = mongoose.model('BusinessRegistration', businessRegistrationSchema);

export default BusinessRegistration;