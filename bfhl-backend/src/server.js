const express = require('express');
const cors = require('cors');  // Ensure cors is imported
const app = express();
const port = process.env.PORT || 3001;  // Change to 3001 or another available port

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
  const data = req.body.data;
  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input format' });
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
    user_id: "your_fullname_ddmmyyyy",
    email: "your_email@example.com",
    roll_number: "your_roll_number",
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet
  });
});

app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
