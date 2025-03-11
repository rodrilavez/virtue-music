const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Get all blog posts
router.get('/', blogController.getAllBlogs);

// Get a single blog post by ID
router.get('/:id', blogController.getBlogById);

// Create a new blog post
router.post('/', blogController.createBlog);

// Update a blog post by ID
router.put('/:id', blogController.updateBlog);

// Delete a blog post by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;