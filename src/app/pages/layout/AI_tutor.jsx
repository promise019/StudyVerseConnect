import { useContext, useEffect, useState } from "react"
import InputComponent, { TextAreaComponent } from "../../../components/InputComponent"
import Button_Component from "../../../components/ButtonsComponent"
import { AuthContext } from "../../Context/AuthContext";
import send from '../../../assets/icons/Send it.svg'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify'


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore, addDoc, deleteDoc, doc, collection, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { SpiningLoader } from "../../../components/loadingComponent";



const firebaseConfig = {
    apiKey: "AIzaSyDxXqsxgKBrpGvdOmatNhGVPNfXyedv9JQ",
    authDomain: "studyverse-connect-842bd.firebaseapp.com",
    projectId: "studyverse-connect-842bd",
    storageBucket: "studyverse-connect-842bd.firebasestorage.app",
    messagingSenderId: "848736395772",
    appId: "1:848736395772:web:0523e70c56db9ad86ad279",
    measurementId: "G-12QVQKJMM8"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export default function AI_Tutor() {
    const [User_prompt, setUser_promps] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [chat, setChat] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [chatloading, setChatloading] = useState(false)
    const [result, setResult] = useState()

    const {isLoggedIn} = useContext(AuthContext)

    //fetch ai response
    function FetchResponse(params) {
        fetch("https://api.cohere.ai/generate", {
                    method: "POST",
                    headers: {
                      "Authorization": "Bearer mY6cuqiKoBXfyooQ0uCVP3NepBMBDYl9OLeJ1JQM",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      model: "command",
                      prompt: User_prompt,
                      max_tokens: 100
                    })
                  })
                .then(response=> response.json())
                .then(data=>{
                    const msg = data.text
                    postMessages(msg, 'bot')
                    setResult(data)
                })
                .catch(err=> {
                    console.log(err)
                })
                .finally(()=> setIsloading(false))      
    }

    //send message to firestore
    async function postMessages(message, from) {
        try {
            const messagesRef = collection(db, 'users', isLoggedIn, 'chats');
            await addDoc(messagesRef, {
                text: message,
                timestamp: serverTimestamp(),
                from: from
            });
            // toast.success('checked')
        } catch (error) {
            console.log(error);
            toast.error(error);
        } finally {
            setIsloading(false);
        }

    }


    useEffect(()=>{
        setChatloading(true)
            FetchResponse()        
    },[User_prompt])

    //call data from firestore and display 
    useEffect(() => {
        if (!isLoggedIn) return;

        setChatloading(true)

        const messagesRef = collection(db, 'users', isLoggedIn, 'chats');
        const q = query(messagesRef, orderBy('timestamp'));
        setChatloading(true)
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setChatloading(false)
            setChat(messages);
        });
    
        return () => unsubscribe();
    }, [isLoggedIn]);


    //submit prompt
    function handle_Submit_prompt(e){
        e.preventDefault()

        

        if (searchValue.trim() === ''){
            return
        } else {
            setIsloading(true)
            setUser_promps(searchValue)
            setSearchValue('')
            const prompt = searchValue.trim()
            
            postMessages(prompt, 'user')
        }
    }

    async function deleteMessage(messageId) {
        try {
            await deleteDoc(doc(db, 'users', isLoggedIn, 'chats', messageId));
            toast.success('Message deleted');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete message');
        }
    }

    return (
        <div className="overflow-y-clip">
            <ToastContainer/>

            <div className="chat-messages pb-20 space-y-6 flex flex-col items-start">
                {chat.map(msg => (
                   <div
                   key={msg.id}
                   className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                 >
                   <div
                     className={`message p-4 rounded-lg w-fit max-w-[80%] ${
                       msg.from === 'user' ? 'bg-green-500 text-white' : 'bg-white text-black'
                     }`}
                   >
                     <p>{msg.text}</p>
                     <button onClick={() => deleteMessage(msg.id)} className="text-xs text-red-500">delete</button>
                   </div>
                 </div>
                ))}

                {chatloading &&<div className="flex justify-center w-full">
                    <SpiningLoader/>
                </div>}
                {chatloading}
            </div>

             
            
            <form className="w-screen px-2 py-2 flex justify-between fixed bottom-0 left-0 bg-gray-200 md:px-30 xl:px-58">
                <TextAreaComponent
                 value={searchValue}
                 onChange={(e)=> setSearchValue(e.target.value)}
                 placeholder='send a message'
                 className='p-2 rounded-xl border w-[87%] resize-none h-11'
                />

                <Button_Component
                 onclick={(e)=>handle_Submit_prompt(e)}
                 className='p-2 rounded-full bg-green-500 text-white font-bold text-center flex justify-center'
                >
                    {isloading ? '...' : <img src={send} className="w-8"/>}
                </Button_Component>
            </form>
        </div>
    )
}