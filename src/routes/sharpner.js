const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Route to get all data from the 'sharpner' table
router.get('/', (req, res) => {
  const query = 'SELECT * FROM sharpner';  // Query to select all data from the 'sharpner' table

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Error retrieving data from the database');
      return;
    }
    res.json(results);  // Send the results as JSON
  });
});

// Route to insert a new product
router.post('/', (req, res) => {
  const { title, price, description, imageUrl } = req.body;

  // Validate input
  if (!title || !price || !description || !imageUrl) {
    return res.status(400).send('All fields (title, price, description, imageUrl) are required');
  }

  // Query to insert a product (no 'id' since it should auto-increment)
  const query = 'INSERT INTO sharpner (title, price, description, imageUrl) VALUES (?, ?, ?, ?)';

  db.query(query, [title, price, description, imageUrl], (err, result) => {
    if (err) {
      console.error('Error inserting product:', err.stack);
      res.status(500).send('Error inserting product into the database');
      return;
    }
    res.json({ message: 'Product added successfully', productId: result.insertId });
  });
});

// Route to update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, price, description, imageUrl } = req.body;

  // Validate input
  if (!title || !price || !description || !imageUrl) {
    return res.status(400).send('All fields (title, price, description, imageUrl) are required');
  }

  // Query to update a product
  const query = 'UPDATE sharpner SET title = ?, price = ?, description = ?, imageUrl = ? WHERE id = ?';

  db.query(query, [title, price, description, imageUrl, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err.stack);
      res.status(500).send('Error updating product in the database');
      return;
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Product not found');
    }
    res.json({ message: 'Product updated successfully' });
  });
});

module.exports = router;
