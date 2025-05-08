# 🌍 Trip Planner – Cloud Computing Mini Project

Trip Planner is a smart travel itinerary generator built on AWS that crafts personalized travel plans based on user preferences like location, number of days, age group, mode of transport, and budget. This project leverages cloud-native services and AI to offer a seamless trip planning experience.

---

## ✨ Features

- 🧠 **AI-Powered Itinerary Generation** using Gemini APIs.
- 🛠️ **Serverless Backend** powered by AWS Lambda and Node.js.
- 💾 **Data Persistence** via DynamoDB for storing user inputs and generated itineraries.
- 🔐 **UUID-based Identification** to keep it lightweight and simple (no user authentication).
- 🌐 **React Frontend** deployed using Render for a responsive and user-friendly interface.

---

## 🧠 How It Works

1. **User Input**:  
   The user provides:
   - Location
   - Number of Days
   - Age Group
   - Mode of Transport
   - Budget

2. **AI Integration**:  
   The backend passes these inputs to the **Gemini API**, which generates a personalized trip itinerary. Additionally, it is used for refining responses based on context and preferences.

3. **Backend Logic**:  
   - A Node.js function is deployed via **AWS Lambda**.
   - It handles input processing and triggers Gemini API.
   - The results and inputs are stored in **AWS DynamoDB**.
   - Each entry is uniquely identified using **UUID** for simplicity.

4. **Frontend**:  
   - Built using **React**.
   - Deployed via **Render**.
   - Offers a smooth and intuitive interface for users to enter their preferences and view itineraries.

---

## 🧰 Tech Stack

- **Frontend**: React, Render Deployment  
- **Backend**: Node.js, AWS Lambda  
- **Database**: AWS DynamoDB  
- **APIs Used**:  Gemini API (for itinerary generation and response enhancement)  
- **Other Tools**: UUID (for session/entry tracking)

---

## 🚀 Outcome

A fully functional trip planner that showcases the power of cloud computing and AI integration in building responsive, serverless applications.

---

## 🧑‍💻 Team

> This project was developed as part of our Cloud Computing mini project to explore real-world applications of AWS, AI APIs, and full-stack development.

