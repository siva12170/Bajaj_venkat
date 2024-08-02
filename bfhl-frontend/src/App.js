// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Import your CSS file
import Dropdown from './components/Dropdown'; // Import the Dropdown component

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState([]);

  // Set the document title to your roll number
  useEffect(() => {
    document.title = 'YourRollNumber'; // Replace 'YourRollNumber' with your actual roll number
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Attempt to parse JSON data
      const parsedData = JSON.parse(jsonData);

      // Validate the format
      if (!parsedData || !Array.isArray(parsedData.data)) {
        setError('Invalid JSON format or request failed');
        setResponse(null);
        return;
      }

      // Send the request to the backend
      const res = await axios.post('http://localhost:3001/bfhl', parsedData);

      // Update the state with the response
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError('Invalid JSON format or request failed');
      setResponse(null);
    }
  };

  // Handle dropdown selection
  const handleDropdownChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedOption(selected);
  };

  // Render content based on dropdown selection
  const renderDropdownContent = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOption.includes('Alphabets') && response.alphabets && (
          <div>
            <h3>Alphabets:</h3>
            <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
          </div>
        )}
        {selectedOption.includes('Numbers') && response.numbers && (
          <div>
            <h3>Numbers:</h3>
            <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
          </div>
        )}
        {selectedOption.includes('Highest alphabet') && response.highest_alphabet && (
          <div>
            <h3>Highest Alphabet:</h3>
            <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  const dropdownOptions = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest alphabet', label: 'Highest Alphabet' },
  ];

  return (
    <div>
      <h1>Real Estate Management System</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder='Enter JSON data here, e.g., {"data": ["A", "C", "z", "2", "4", "5", "92"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {response && (
        <div>
          <h2>Select Data to Display:</h2>
          <Dropdown
            options={dropdownOptions}
            selectedOptions={selectedOption}
            onChange={handleDropdownChange}
          />
          {renderDropdownContent()}
        </div>
      )}
    </div>
  );
}

export default App;
