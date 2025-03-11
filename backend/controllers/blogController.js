const Blog = require('../models/Blog');

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new blog post
exports.createBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing blog post
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.author = req.body.author || blog.author;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        await blog.remove();
        res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};