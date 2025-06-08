import { useParams } from "react-router";

import profileImage from "../../../assets/images/profile image.jpg";
import Button_Component from "../../../components/ButtonsComponent";
import send from "../../../assets/icons/Send it.svg";
import back from "../../../assets/icons/Arrow back black.svg";
import { useContext, useEffect, useState } from "react";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
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

  const generateChatId =
    isLoggedIn > selectedUser.username
      ? isLoggedIn + selectedUser.username
      : selectedUser.username + isLoggedIn;

  async function sendMessage(e) {
    if (Message.trim() === "") return;
    try {
      const MessageRef = collection(db, "chats", generateChatId, "messages");
      await addDoc(MessageRef, {
        text: Message,
        timestamp: serverTimestamp(),
        from: isLoggedIn,
      });
      setMessage("");
    } catch (error) {
      setMessage("");
      toast.error("unable to send message");
      console.log(error);
    }
  }

  useEffect(() => {
    async function getChatMessages(user1, user2) {
      const chatID = generateChatID(user1, user2);
      const messagesRef = collection(db, "chats", chatID, "messages");

      const snapshot = await getDocs(messagesRef);
      const message = snapshot.docs.map((doc) => doc.data());
      setChat(message);
    }
  });

  return (
    <div
      className={`${
        !mobileChatBox && "hidden"
      } fixed top-0 left-0 h-screen bg-white w-screen p-1 md:px-15 lg:static lg:w-[70%] lg:p-3 lg:float-right lg:border-l lg:h-full`}
    >
      <ToastContainer />

      {selectedUser.username == undefined ? (
        <h1 className='font-bold text-2xl lg:mt-30 lg:ml-30'>
          select buddy and start chat
        </h1>
      ) : (
        <>
          <header className='w-full p-2 space-x-4'>
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

          {JSON.stringify(chat)}

          <footer className='fixed bottom-0 flex space-x-3 bg-gray-300 p-2 w-screen -ml-2 md:w-[87%] lg:-ml-3 lg:w-[56%] xl:w-[46%]'>
            <textarea
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
              className='resize-none border border-gray-400 h-11 p-2 rounded-lg w-[97%] lg:w-[89%]'
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
