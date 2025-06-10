import { useParams } from "react-router";

import profileImage from "../../../assets/images/profile image.jpg";
import Button_Component from "../../../components/ButtonsComponent";
import send from "../../../assets/icons/Send it.svg";
import back from "../../../assets/icons/Arrow back black.svg";
import { useContext, useEffect, useRef, useState } from "react";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { AuthContext } from "../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDxXqsxgKBrpGvdOmatNhGVPNfXyedv9JQ",
  authDomain: "studyverse-connect-842bd.firebaseapp.com",
  projectId: "studyverse-connect-842bd",
  storageBucket: "studyverse-connect-842bd.firebasestorage.app",
  messagingSenderId: "848736395772",
  appId: "1:848736395772:web:0523e70c56db9ad86ad279",
  measurementId: "G-12QVQKJMM8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function ChatBox({ selectedUser, mobileChatBox, onBack }) {
  const { id } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [Message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const generateChatId =
    isLoggedIn.localeCompare(selectedUser.id) > 0
      ? isLoggedIn + "_" + selectedUser.id
      : selectedUser.id + "_" + isLoggedIn;

  async function sendMessage(e) {
    if (Message.trim() === "") return;
    console.log(generateChatId);
    setIsloading(true);
    setMessage("");
    try {
      const MessageRef = collection(db, "chats", generateChatId, "messages");
      await addDoc(MessageRef, {
        text: Message,
        timestamp: serverTimestamp(),
        from: isLoggedIn,
      });
      setIsloading(false);
    } catch (error) {
      setMessage("");
      setIsloading(false);
      toast.error("unable to send message");
      console.log(error);
    }
  }

  useEffect(() => {
    if (!generateChatId) return;

    const messagesRef = collection(db, "chats", generateChatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChat(messages);
    });

    return () => unsubscribe();
  }, [generateChatId]);

  async function deleteMessage(messageId) {
    console.log(messageId);
    try {
      await deleteDoc(doc(db, "chats", generateChatId, "messages", messageId));
      toast.success("Message deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  }

  return (
    <div
      className={`${
        !mobileChatBox && "hidden"
      } overflow-y-clip fixed top-0 left-0 h-screen bg-gray-100 w-screen p-1 md:px-15 lg:static lg:w-[70%] lg:p-3 lg:float-right lg:border-l lg:h-full`}
    >
      <ToastContainer />

      {selectedUser.username == undefined ? (
        <h1 className='font-bold text-2xl lg:mt-30 lg:ml-30'>
          select buddy and start chat
        </h1>
      ) : (
        <>
          <header className='w-full p-2 space-x-4 sticky bg-white border-b'>
            <img
              src={back}
              className='w-6 float-left mt-3 lg:hidden'
              onClick={onBack}
            />
            <img
              src={profileImage}
              alt='user image'
              className='w-10 rounded-full inline-block'
            />

            <h1 className='inline-block'>{selectedUser.username}</h1>
          </header>

          <div className='overflow-y-auto space-y-2 h-[83vh] overflow-x-hidden md:h-[87vh] lg:h-[68vh] p-2'>
            {chat.map((msg) => (
              <div
                ref={scrollRef}
                key={msg.id}
                className={`flex ${
                  msg.from === isLoggedIn ? "justify-end" : "justify-start"
                } w-full`}
              >
                <div
                  className={`message p-4 rounded-lg break-words max-w-[80%] ${
                    msg.from === isLoggedIn
                      ? "bg-green-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <p>{msg.text}</p>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className='text-xs text-red-500'
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <footer className='fixed bottom-0 flex space-x-3 bg-gray-300 pl-2.5 py-2 w-screen -ml-2 md:w-[87%] lg:-ml-3 lg:w-[56%] xl:w-[45.5%]'>
            <textarea
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              className='w-[87%] h-12 p-2 rounded-lg border border-gray-500 resize-none focus:outline-none'
              placeholder='send a message'
            />
            <Button_Component
              onclick={(e) => sendMessage(e)}
              className='p-2 rounded-full bg-green-500 text-white font-bold text-center flex justify-center'
            >
              {isloading ? "..." : <img src={send} className='w-8' />}
            </Button_Component>
          </footer>
        </>
      )}
    </div>
  );
}
