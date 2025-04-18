// AssistantChat.tsx
import React, { useState } from "react";
import { askGemini } from "../lib/gemini"; // Assuming you have gemini.ts set up correctly
import { Input } from "./ui/input";

const AssistantChat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; message: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Avoid empty messages

    setIsLoading(true);

    // Update chat history with user message
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", message: userInput },
    ]);

    try {
      // Get the assistant's response using the askGemini function
      const response = await askGemini(userInput);

      // Update chat history with assistant's response
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "assistant", message: response },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "assistant", message: "Sorry, I couldn't understand that." },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput(""); // Clear input field after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-message ${chat.role === "user" ? "user" : "assistant"}`}
          >
            <strong>{chat.role === "user" ? "You" : "Assistant"}:</strong>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AssistantChat;
