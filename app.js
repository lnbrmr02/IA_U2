const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Hard-coded salesmen data
const salesmen = [
  { id: 1, name: 'John Doe', performance: 1 },
  { id: 2, name: 'Jane Smith', performance: 2 },
];

// GET endpoint to retrieve salesmen
app.get('/salesmen', (req, res) => {
  res.json(salesmen);
});

// POST endpoint to create a new salesman
app.post('/salesmen', (req, res) => {
  const newSalesman = req.body;
  salesmen.push(newSalesman);
  res.status(201).json(newSalesman);
});

// DELETE endpoint to remove a salesman by ID
app.delete('/salesmen/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = salesmen.findIndex(salesman => salesman.id === id);

  if (index !== -1) {
    salesmen.splice(index, 1); // Remove the salesman from the array
    res.status(204).send(); // Send a 204 No Content response
  } else {
    res.status(404).json({ message: 'Salesman not found' }); // Send 404 if not found
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
