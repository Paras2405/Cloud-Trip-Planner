const AWS = require('aws-sdk');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'eu-north-1' });
const GEMINI_API_KEY = "AIzaSyDjV7Y7Py8jOsr0uFQS4DSq9mQ-QsrMnaU";

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Request body is required" })
      };
    }

    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "Invalid JSON format in request body" })
      };
    }

    const { location, budget, duration, ageGroup, transport } = requestBody;
    if (!location || !budget || !duration || !ageGroup || !transport) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields. Please provide: location, budget, duration, ageGroup, and transport"
        })
      };
    }

    const prompt = `Create a detailed and complete ${duration}-day travel itinerary for ${location}, 
tailored for travelers aged ${ageGroup}, with a total budget of ${budget}, 
using ${transport} as the primary mode of travel.

Structure the output using clear bullet points and headings. 
Ensure ample spacing between sections so that each section is visually distinct.

Include the following sections in the response:

---

1. ✨ Best Places to Visit  
   - Highlight **must-see attractions**  
   - Include a few **hidden gems or offbeat places**

---

2. 🏨 Recommended Accommodations  
   - Suggest **budget-friendly** and **age-appropriate** options  
   - Mention locations (e.g., Panjim, Palolem) and type (hostels, guesthouses, etc.)

---

3. 📅 Day-Wise Itinerary  
   For each day from Day 1 to Day ${duration}, break down the plan into:
   - **Morning:** Activities, travel, or sightseeing  
   - **Afternoon:** Lunch spots, local experiences  
   - **Evening:** Sunset views, nightlife, dinner plans  

---

4. 🍽 Dining Suggestions  
   - List **local delicacies** to try  
   - Recommend **budget-friendly eateries** or types of places (e.g., beach shacks, local stalls)

---

5. 🚌 Transportation Tips  
   - How to travel **within the location** (e.g., bus, rental bikes, taxis)  
   - Tips for **arriving and departing** (e.g., nearest station, booking suggestions)

---

6. 🎭 Cultural Highlights & Experiences  
   - Suggest **local events, performances, or traditions**  
   - Optional: Include interactive options like **cooking classes** or **market visits**

---

7. 👥 Age Group-Specific Suggestions  
   - Tips for safety, comfort, and enjoyment specific to **${ageGroup}** travelers  
   - Recommend suitable activities, nightlife, or relaxing options

---

Make sure the itinerary is practical, easy to follow, and informative.  
Use only bullet points or numbered lists — avoid long paragraphs.  
Do **not** limit the length — make it complete and detailed.
`;


    let generatedPlan;
    try {
      const geminiResponse = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY,
        {
          contents: [{
            role: "user",
            parts: [{ text: prompt }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      generatedPlan = geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        || "Sorry, we couldn't generate a travel plan at this time.";
    } catch (apiError) {
      console.error("Gemini API error:", apiError);
      generatedPlan = "Our travel planning service is temporarily unavailable. Please try again later.";
    }

    const travelPlan = {
      id: uuidv4(),
      location,
      budget,
      duration,
      ageGroup,
      transport,
      generatedPlan,
      createdAt: new Date().toISOString(),
      ipAddress: event.requestContext?.identity?.sourceIp || 'unknown'
    };

    try {
      await dynamoDB.put({
        TableName: 'TravelPlans',
        Item: travelPlan
      }).promise();
    } catch (dbError) {
      console.error("DynamoDB error:", dbError);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          ...travelPlan,
          generatedPlan
        }
      })
    };

  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "An unexpected error occurred. Please try again later.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
