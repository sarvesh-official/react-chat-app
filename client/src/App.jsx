import { useState,useEffect } from "react"
import io from "socket.io-client"

const socket = io("https://react-chat-app-n10q.onrender.com")

function App() {

  const [messages,setMessages] = useState([]);
  const [messageInput,setMessageInput] = useState("");

  useEffect(() =>{
    socket.on("chat message" , (msg) =>{
      setMessages([...messages,msg])
    })

    return ()=> {
      socket.off("chat message")
    }
  },[messages])

  const sendMessage = () =>{

    if(messageInput.trim() != ""){
      socket.emit("chat message",messageInput);
      setMessageInput("");
    }
  } 
 return(
  <div>
    <h1>Simple Chat App</h1>

    <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="message :)" />

    <button onClick={sendMessage}>Send</button>

    <section>
      {messages.map((message,index) => {
        return <div key={index}>
          {message}
        </div>
      })}
    </section>
  </div>
  )
}

export default App
