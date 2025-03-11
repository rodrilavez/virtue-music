require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const reviewRoutes = require('./routes/reviewRoutes');
const blogRoutes = require('./routes/blogRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log('❌ Error conectando a MongoDB:', err));

// Rutas
app.use('/reviews', reviewRoutes);
app.use('/blogs', blogRoutes);
app.use('/playlists', playlistRoutes);

// Root route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));