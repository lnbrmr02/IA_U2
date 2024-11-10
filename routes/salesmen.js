const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Hard-coded salesmen data with `sid` as the unique identifier
const salesmen = [
    {
        sid: 1,
        firstname: 'John',
        lastname: 'Doe',
        SPR: [
            {
                goalId: 101,
                year: 2023,
                value: 92, // Average target value
                actualValue: 87, // Average actual value
                SSPR: [
                    {
                        targetValue: 90,
                        actualValue: 85,
                        bonus: 10,
                        name: 'Leadership Competence'
                    },
                    {
                        targetValue: 95,
                        actualValue: 90,
                        bonus: 12,
                        name: 'Communication Skills'
                    }
                ]
            }
        ]
    },
    {
        sid: 2,
        firstname: 'Jane',
        lastname: 'Smith',
        SPR: []
    }
];

// GET endpoint to retrieve all salesmen
app.get('/salesmen', (req, res) => {
    res.json(salesmen);
});

// POST endpoint to create a new salesman
app.post('/salesmen', (req, res) => {
    const newSalesman = req.body;

    // Check if a salesman with the same sid already exists
    const exists = salesmen.some(salesman => salesman.sid === newSalesman.sid);
    if (exists) {
        return res.status(409).json({ message: 'Salesman with this SID already exists' });
    }

    // Check if any goalId in the newSalesman is already taken by another salesman
    for (let goal of newSalesman.SPR) {
        const goalExists = salesmen.some(salesman =>
            salesman.sid !== newSalesman.sid && // Ensure the check is for other salesmen, not the same one
            salesman.SPR.some(existingGoal => existingGoal.goalId === goal.goalId)
        );
        if (goalExists) {
            return res.status(409).json({ message: `GoalId ${goal.goalId} already exists for another salesman` });
        }
    }

    // Add the new salesman if SID and goalId are unique
    salesmen.push(newSalesman);
    res.status(201).json(newSalesman);
});



// DELETE endpoint to remove a salesman by SID
app.delete('/salesmen/:sid', (req, res) => {
    const sid = parseInt(req.params.sid);
    const index = salesmen.findIndex(salesman => salesman.sid === sid);

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
