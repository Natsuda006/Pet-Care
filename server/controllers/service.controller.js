const Service = require("../models/Service");


exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createService = async (req, res) => {
    try {
        const { name, detail, price, cover } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Name and Price are required" });
        }
        const newService = new Service({ name, detail, price, cover });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedService) return res.status(404).json({ message: "Service not found" });
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: "Service not found" });
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
