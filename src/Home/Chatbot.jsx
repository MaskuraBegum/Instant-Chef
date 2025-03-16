import { useState } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet';

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("https://instant-chef-api-1.onrender.com/api/chat", { message });

      // Add messages to the chat history
      setResponses([...responses, { role: "user", content: message }, { role: "bot", content: res.data.reply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponses([...responses, { role: "bot", content: "Error: Unable to fetch response." }]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-2xl shadow-lg">
       <Helmet>
        <title>Instant Chef || Home</title>
        </Helmet>
      <h2 className="text-xl font-bold text-orange-600 mb-2 text-center">🍳 AI Chef Chatbot</h2>

      <div className="h-96 overflow-y-auto bg-white p-4 rounded-lg shadow-inner space-y-3">
        {responses.map((msg, index) => (
          <div key={index} className={`p-3 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto text-right w-fit" : "bg-gray-200 text-gray-800 self-start w-fit"}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
            <p dangerouslySetInnerHTML={{ __html: formatResponse(msg.content) }} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me a cooking question..."
          className="flex-grow px-4 py-2 border rounded-lg focus:ring focus:ring-orange-400"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition disabled:bg-gray-300"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">Ask me if you need help with any recipes instruction, or ingredients' alternative, or if want to try a new recipe</p>
    </div>
  );
};

// Format AI responses (bold & new lines)
const formatResponse = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
};

export default Chatbot;
