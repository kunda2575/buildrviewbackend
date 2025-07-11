const LostReasons = require('../../models/updateModels/lostReasonsSchema');

// Create
exports.createLostReasons = async (req, res) => {
  try {
    const userId = req.userId;
    const { lostReason } = req.body;
    const newLostReasons = await LostReasons.create({ lostReason});
    res.status(201).json(newLostReasons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getLostReasons = async (req, res) => {
  try {
    const userId = req.userId;
    const lostReason = await LostReasons.findAll();
    res.json(lostReason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateLostReasons = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { lostReason } = req.body;
    const lostReasons = await LostReasons.findOne({ where: {id } });
    if (!lostReasons) return res.status(404).json({ error: "Lost Reasons not found" });

   
    lostReasons.lostReason=lostReason
    await lostReasons.save();

    res.json(lostReason);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteLostReasons = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const deleted = await LostReasons.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Lost Reason not found" });
    res.json({ message: "Lost Reason deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
