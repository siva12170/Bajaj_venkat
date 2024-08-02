const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            throw new Error("Invalid input format");
        }

        const numbers = [];
        const alphabets = [];

        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (typeof item === 'string' && item.length === 1) {
                alphabets.push(item);
            }
        });

        const highestAlphabet = alphabets.length > 0 
            ? [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()]
            : [];

        res.json({
            is_success: true,
            user_id: "your_fullname_ddmmyyyy",  // Replace with your details
            email: "your_email@example.com",  // Replace with your details
            roll_number: "your_roll_number",  // Replace with your details
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});
