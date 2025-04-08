import React, { useState } from "react";
import { FiMessageSquare } from "react-icons/fi"; // Importing an icon for the message symbol

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // To toggle chatbot visibility

  // Persistent welcome message from Dr. Medibot
  const welcomeMessage = {
    text: "Hello! I am Dr. Medibot, your virtual healthcare assistant. How can I assist you today?",
    alignmentClass: "bg-gray-100 justify-start",
  };

  const sendMessage = async () => {
    if (!userInput) return;

    // Append user's message (right side)
    appendMessage(userInput, "bg-blue-100 justify-end");

    // Clear input and show loader
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setLoading(false); // Hide loader
      // Append bot's response (left side)
      appendMessage(data.reply, "bg-gray-100 justify-start");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      appendMessage("Error communicating with the server.", "bg-red-100 justify-start");
    }
  };

  const appendMessage = (text, alignmentClass) => {
    setMessages((prevMessages) => [...prevMessages, { text, alignmentClass }]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating message icon */}
      {!isOpen && (
        <div
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all transform hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <FiMessageSquare size={28} />
        </div>
      )}

      {/* Chatbot Page */}
      <div
        className={`fixed bottom-5 right-5 bg-white shadow-xl rounded-3xl overflow-hidden transition-all transform ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ width: isOpen ? "350px" : "0", height: isOpen ? "500px" : "0", transition: "width 0.4s ease, height 0.4s ease" }}
      >
        {isOpen && (
          <div className="h-full w-full p-4">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>

            <div className="h-full flex flex-col justify-between">
              {/* Message Area */}
              <div className="overflow-y-auto h-[80%] p-6 space-y-3 flex flex-col">
                {/* Persistent Welcome Message */}
                <div className="flex justify-start w-full">
                  <div className="p-4 bg-gray-100 rounded-lg max-w-lg shadow-sm text-sm">
                    {welcomeMessage.text}
                  </div>
                </div>

                {/* Render user and bot messages */}
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.alignmentClass} w-full`}>
                    <div className="p-4 rounded-lg max-w-lg shadow-sm text-sm">
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Loader for bot response */}
                {loading && (
                  <div className="flex justify-center items-center space-x-2 mt-4">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="relative p-4 bg-gray-100 rounded-2xl shadow-inner flex items-center">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent border-0 focus:outline-none text-lg pl-4 py-2"
                  placeholder="Type your message..."
                />
                <button
                  onClick={sendMessage}
                  className="absolute right-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl px-4 py-2 transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChatbot;
