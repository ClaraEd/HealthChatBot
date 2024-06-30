// src/Chatbot.js
import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const responses = {
    hello: "Hi there! How can I assist you today?",
    stress:
      "I'm sorry to hear you're feeling stressed. Would you like some tips on managing stress?",
    sad: "It's okay to feel sad sometimes. I'm here to listen. Do you want to talk more about what's making you feel this way?",
    anxious:
      "Anxiety can be tough to deal with. Would you like some advice on how to handle anxiety?",
    help: "I'm here to help. What do you need assistance with?",
    thank:
      "You're welcome! I'm glad I could help. Is there anything else you need?",
    default: "Thank you for sharing. How can I assist you further?",
  };

  const getBotResponse = (input) => {
    const lowerCaseInput = input.toLowerCase();
    let response = "";
    for (let key in responses) {
      if (lowerCaseInput.includes(key)) {
        response += responses[key] + " ";
      }
    }
    return response.trim() || responses["default"];
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: botResponse,
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h2>Thera Ai</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
