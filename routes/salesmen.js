const express = require('express');
const router = express.Router();

// Hard-coded example data
let salesmen = [
    { id: 1, name: "John Doe", sales: 100 },
    { id: 2, name: "Jane Smith", sales: 200 },
];

// Create a new salesman
router.post('/', (req, res) => {
    const newSalesman = req.body;
    salesmen.push(newSalesman);
    res.status(201).json(newSalesman);
});

// Get all salesmen
router.get('/', (req, res) => {
    res.json(salesmen);
});

// Get a single salesman by ID
router.get('/:id', (req, res) => {
    const salesman = salesmen.find(s => s.id === parseInt(req.params.id));
    if (salesman) {
        res.json(salesman);
    } else {
        res.status(404).send("Salesman not found");
    }
});

// Delete a salesman by ID
router.delete('/:id', (req, res) => {
    salesmen = salesmen.filter(s => s.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;






// Hard-coded performance data
let performanceRecords = [
    { id: 1, salesManId: 1, year: 2023, performance: 2 },
    { id: 2, salesManId: 2, year: 2023, performance: 1 },
];

// Add a social performance record for a salesman
router.post('/:id/performance-records', (req, res) => {
    const newRecord = req.body;
    newRecord.salesManId = parseInt(req.params.id);
    performanceRecords.push(newRecord);
    res.status(201).json(newRecord);
});

// Get all performance records for a specific salesman
router.get('/:id/performance-records', (req, res) => {
    const records = performanceRecords.filter(r => r.salesManId === parseInt(req.params.id));
    res.json(records);
});

// Delete a specific performance record for a salesman by record ID
router.delete('/:id/performance-records/:recordId', (req, res) => {
    performanceRecords = performanceRecords.filter(
        r => !(r.salesManId === parseInt(req.params.id) && r.id === parseInt(req.params.recordId))
    );
    res.status(204).send();
});

