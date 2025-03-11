const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo las reviews" });
    }
};

exports.createReview = async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const newReview = new Review({ title, content, image });
        await newReview.save();
        res.json({ message: "Review creada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la review" });
    }
};

exports.updateReview = async (req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Review actualizada" });
    } catch (error) {
        res.status(500).json({ message: "Error actualizando la review" });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error eliminando la review" });
    }
};