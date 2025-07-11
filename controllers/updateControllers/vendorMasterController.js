const { ValidationError } = require('sequelize');
const VendorMaster = require('../../models/updateModels/vendorMasterSchema');

// Create
exports.createVendor = async (req, res) => {
  try {
    const userId = req.userId;
    const {vendorId, vendorName,services,phone,address ,city} = req.body;
    const newVendor = await VendorMaster.create({vendorId, vendorName,services,phone,address ,city});
    res.status(201).json(newVendor);
  } catch (err) {
     if (err instanceof ValidationError) {
      const messages = err.errors.map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
   
  }
};

// Read all
exports.getVendors = async (req, res) => {
  try {
    const userId = req.userId;
    const vendors = await VendorMaster.findAll();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateVendor = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const {vendorId, vendorName,services,phone,address ,city } = req.body;
    const vendor = await VendorMaster.findOne({ where: {id } });
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

   
    vendor.vendorId=vendorId,
    vendor.vendorName=vendorName,
    vendor.services= services,
    vendor.phone= phone,
    vendor.address= address,
    vendor.city= city
    await vendor.save();

    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteVendor = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const deleted = await VendorMaster.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Vendor not found" });
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
