import React, { useState } from 'react';
import axios from 'axios';

function FilterComponent() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const parsedData = JSON.parse(jsonData);
      if (!parsedData || !Array.isArray(parsedData.data)) {
        setError('Invalid JSON format or request failed');
        setResponse(null);
        return;
      }
      const res = await axios.post('http://localhost:3001/bfhl', parsedData);
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid JSON format or request failed');
      setResponse(null);
    }
  };

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

  const renderDropdownContent = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOption.includes('Alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
          </div>
        )}
        {selectedOption.includes('Numbers') && (
          <div>
            <h3>Numbers:</h3>
            <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
          </div>
        )}
        {selectedOption.includes('Highest alphabet') && (
          <div>
            <h3>Highest Alphabet:</h3>
            <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
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
          <select multiple={true} value={selectedOption} onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest alphabet">Highest Alphabet</option>
          </select>
          {renderDropdownContent()}
        </div>
      )}
    </div>
  );
}

export default FilterComponent;
