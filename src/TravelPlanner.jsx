/*import { useState } from "react"
import axios from "axios"
import { MapPin, Wallet, Calendar, Users, Car, Loader2, Plane } from "lucide-react"
import "./App.css"
import "./globals.css"
export default function TravelPlanner() {
  const [formData, setFormData] = useState({
    location: "",
    budget: "",
    duration: "",
    ageGroup: "",
    transport: "",
  })

  const baseURL = import.meta.env.PROD
  ? 'https://k5m74a3y7k.execute-api.eu-north-1.amazonaws.com/prod'
  : '/api'; // Vite dev server proxy

  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const res = await axios.post(`${baseURL}/generate-plan`, formData)
      setResponse(res.data)
    } catch (error) {
      console.error("Error:", error)
      setResponse({ success: false, error: error.message })
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="title-container">
            <Plane className="icon primary-icon" />
            <h1 className="card-title">Travel Plan Generator</h1>
          </div>
          <p className="card-description">Fill in the details below to generate your personalized travel plan</p>
        </div>

        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="location">Destination</label>
              <div className="input-container">
                <MapPin className="input-icon" />
                <input
                  id="location"
                  name="location"
                  placeholder="Where do you want to go?"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <div className="input-container">
                <Wallet className="input-icon" />
                <input id="budget" name="budget" placeholder="What's your budget?" onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (in days)</label>
              <div className="input-container">
                <Calendar className="input-icon" />
                <input
                  id="duration"
                  name="duration"
                  placeholder="How many days?"
                  onChange={handleChange}
                  required
                  type="number"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ageGroup">Age Group</label>
              <div className="input-container">
                <Users className="input-icon" />
                <input
                  id="ageGroup"
                  name="ageGroup"
                  placeholder="What's your age group? (e.g., 20-30, family)"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="transport">Transport Mode</label>
              <div className="input-container">
                <Car className="input-icon" />
                <input
                  id="transport"
                  name="transport"
                  placeholder="How do you want to travel? (e.g., car, public transport)"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="spinner" />
                  Generating your plan...
                </>
              ) : (
                "Generate Travel Plan"
              )}
            </button>
          </form>
        </div>

        {response && (
          <div className="card-footer">
            <div className="separator"></div>
            {response.success ? (
              <div className="response-container">
                <h3 className="response-title">Your Travel Plan:</h3>
                <div className="plan-content">{response.data?.generatedPlan || "No plan available."}</div>
              </div>
            ) : (
              <div className="error-container">
                <p>Error: {response.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}*/



import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const baseURL = import.meta.env.PROD
? 'https://k5m74a3y7k.execute-api.eu-north-1.amazonaws.com/prod'
: '/api';

const TravelPlanner = () => {
  const [formData, setFormData] = useState({
    location: '',
    budget: '',
    duration: '',
    ageGroup: '',
    transport: ''
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track if the form is submitted

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setSubmitted(true); // Form submitted, shift the form to left

    try {
      const res = await axios.post(`${API_URL}/generate-plan`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setResponse(res.data);
    } catch (error) {
      setResponse({
        success: false,
        error: error.response?.data?.error || 'Failed to connect to server'
      });
    }
    setLoading(false);
  };

  return (
    <>
      {/* Top Navbar
      <nav className="topnav">
        <div className="nav-left">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png" alt="Profile" className="nav-icon" />
        </div>
        <div className="nav-right">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png" alt="Menu" className="nav-icon" />
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="travel-planner-container">
        <div className={`form-and-response ${submitted && response?.success ? 'shifted' : ''}`}>
          <div className="form-container">
            <h2>Travel Plan Generator</h2>
            <form onSubmit={handleSubmit} className="travel-form">
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <input
                name="budget"
                placeholder="Budget"
                value={formData.budget}
                onChange={handleChange}
                required
              />
              <input
                name="duration"
                placeholder="Duration (in days)"
                value={formData.duration}
                onChange={handleChange}
                required
              />
              <input
                name="ageGroup"
                placeholder="Age Group"
                value={formData.ageGroup}
                onChange={handleChange}
                required
              />
              <input
                name="transport"
                placeholder="Transport Mode"
                value={formData.transport}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Plan'}
              </button>
            </form>
          </div>

          {/* Response Section */}
          <div className="response-container">
            {response && (
              <div className="response-box">
                {response.success ? (
                  <>
                    <h3>Generated Plan:</h3>
                    <p>{response.data.generatedPlan}</p>
                  </>
                ) : (
                  <p className="error-text">Error: {response.error}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelPlanner;
