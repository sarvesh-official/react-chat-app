import { useState, useEffect } from "react";
import io from "socket.io-client";
import logo from "./assets/image.png";

const socket = io("https://react-chat-app-n10q.onrender.com");

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("chat message", { user: username, text: messageInput });
      setMessageInput("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleUsernameSubmit = () => {
    if (username.trim() !== "") {
      setIsUsernameSet(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {!isUsernameSet ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <img src={logo} alt="TempChat Logo" className="mx-auto mb-4 w-24 h-24" />
            <h1 className="text-2xl font-bold mb-4">Welcome to TempChat</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="border rounded p-2 mb-4 w-full"
            />
            <button
              onClick={handleUsernameSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Join Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <header className="bg-blue-500 text-white p-4 flex items-center">
            <img src={logo} alt="TempChat Logo" className="w-8 h-8 mr-2" />
            <h1 className="text-xl font-bold">TempChat</h1>
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <strong>{message.user}: </strong>
                {message.text}
              </div>
            ))}
          </main>
          <footer className="bg-gray-200 p-4 flex items-center">
            <form onSubmit={handleFormSubmit} className="flex w-full">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded p-2 mr-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Send
              </button>
            </form>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;