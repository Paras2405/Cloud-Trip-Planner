import React, { useState } from 'react';
import axios from 'axios';

const TravelPlanner = () => {
  const [formData, setFormData] = useState({
    location: '',
    budget: '',
    duration: '',
    ageGroup: '',
    transport: ''
  });

  const baseURL = import.meta.env.PROD
  ? 'https://k5m74a3y7k.execute-api.eu-north-1.amazonaws.com/prod'
  : '/api'; // Vite dev server proxy
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post(`${baseURL}/generate-plan`, formData);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ success: false, error: error.message });
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: 'auto' }}>
      <h2>Travel Plan Generator</h2>
      <form onSubmit={handleSubmit}>
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="budget" placeholder="Budget" onChange={handleChange} required />
        <input name="duration" placeholder="Duration (in days)" onChange={handleChange} required />
        <input name="ageGroup" placeholder="Age Group" onChange={handleChange} required />
        <input name="transport" placeholder="Transport Mode" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: 20 }}>
          {response.success ? (
            <>
              <h3>Generated Plan:</h3>
              <p>{response.data?.generatedPlan || "No plan available."}</p>


            </>
          ) : (
            <p style={{ color: 'red' }}>Error: {response.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelPlanner;