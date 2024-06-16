//frontend/src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('sms');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = messageType === 'sms' ? 'send-sms' : 'send-whatsapp';

    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to: phoneNumber, message: message })
    });
    const result = await response.text();
    setResponseMessage(result);
  };

  return (
    <div className="App">
      <h1>Send SMS</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="to">Phone Number:</label>
        <input 
          type="text" 
          id="to" 
          name="to" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          required 
        />
        <label htmlFor="message">Message:</label>
        <input 
          type="text" 
          id="message" 
          name="message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
        />
        <label htmlFor="messageType">Message Type:</label>
        <select id="messageType" name="messageType" value={messageType} onChange={(e) => setMessageType(e.target.value)}>
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <button type="submit">Send</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
