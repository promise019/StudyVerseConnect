import Button_Component from "../../../components/ButtonsComponent";
import InputComponent from "../../../components/InputComponent";
import search from '../../../assets/icons/Search white.svg'
import { useContext, useEffect, useRef, useState } from "react";
import DropDown from "../../../components/DropDownComponent";
import { DropDownContext } from "../../Context/DropDownContext";
import arrowDown from '../../../assets/icons/Arrow down.svg'
import close from '../../../assets/icons/Close.svg'


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore, addDoc, doc, collection, collectionGroup } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { AuthContext } from "../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDxXqsxgKBrpGvdOmatNhGVPNfXyedv9JQ",
    authDomain: "studyverse-connect-842bd.firebaseapp.com",
    projectId: "studyverse-connect-842bd",
    storageBucket: "studyverse-connect-842bd.firebasestorage.app",
    messagingSenderId: "848736395772",
    appId: "1:848736395772:web:0523e70c56db9ad86ad279",
    measurementId: "G-12QVQKJMM8"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export default function Find_buddies() {
    const [subjectFocus, setSubjectFocus] = useState('')
    const [result, setResult] = useState()

    const {preferredStyle, showDropDown, setShowDropDown} = useContext(DropDownContext)
    const {isLoggedIn} = useContext(AuthContext)


    async function findBuddies(subjectFocus, currentUserId) {
        try {
            // Query all "preferred subject" subcollections across users
            const q = query(
                collectionGroup(db, 'preferred subject'),
                where('subject', '==', subjectFocus)
            );

            const querySnapshot = await getDocs(q);

            const matches = [];

            querySnapshot.forEach((docSnap) => {
                // Get the full path: e.g., "users/abc123/preferred subject/xyz"
                const path = docSnap.ref.path;
                const segments = path.split('/');
                const userId = segments[1]; // "abc123"

                // Avoid including the current user
                if (userId !== currentUserId) {
                    matches.push({ userId, ...docSnap.data() });
                }
            });

            setResult(matches);
        } catch (err) {
            console.error("Error finding buddies:", err);
            toast.error('Error finding study buddies');
        }
    }

    function handleFind_Buddies(e) {
        e.preventDefault()

        if (subjectFocus.trim() === '') {
            return 
        } else {
            let docRef = collection(db, 'users', isLoggedIn, 'preferred subject')
            addDoc(docRef, {subject:subjectFocus, preferredStyle:preferredStyle})
            .then(()=>{
                 toast.success('subject added to profile')
                findBuddies(subjectFocus, isLoggedIn)})
            .catch(()=> toast.success('error addin subject to profile'))
        }
    }

    return (
        <div className="space-y-8 lg:flex lg:space-x-15 ">
            <ToastContainer/>
            <form className="grid space-y-1 px-5 py-7 rounded-xl shadow bg-white">
                <h1 className="font-bold text-2xl text-center mb-6">
                    Create your study profile
                </h1>

                <p className="text-gray-700 md:text-center">
                  Find partners and enable the AI buddy by sharing your detail
                </p>

                <label htmlFor="">
                    Subject Focus
                </label>

                <InputComponent
                 value={subjectFocus}
                 onChange={(e)=> setSubjectFocus(e.target.value)}
                 placeholder='e.g Advanced calculus, history'
                 className='p-2 border rounded-lg mb-4'
                />

                <label htmlFor="">Learning Style</label>
                
                <div onClick={()=> setShowDropDown(!showDropDown)}
                 className="flex justify-between border rounded-lg p-2 mb-3">

                <input value={preferredStyle}
                 className="w-full text-left"
                 type="button"
                 readOnly
                />

                <img src={showDropDown? close : arrowDown}
                 onClick={()=> setShowDropDown(!showDropDown)}
                 className="w-3" />
                </div>

                {showDropDown && <DropDown options={['text', 'video', 'voice']}/>}

                <Button_Component 
                 onclick={(e)=> handleFind_Buddies(e)}
                 className='bg-gradient-to-r from-blue-300 to-green-400 flex justify-center text-white p-2 font-bold space-x-3 rounded-lg' 
                >
                    <img src={search} className="w-5" />

                    Find Matches And Activate AI
                </Button_Component>
            </form>

            <section className="space-y-3 px-5 py-3 rounded-xl shadow bg-white xl:w-[70%] lg:py-5">
                <h1 className="font-bold text-2xl text-center lg:mt-0">
                    Study Buddy Matches
                </h1>

                {result.length === 0 ?
                    <>
                        <p className="text-gray-700 md:text-center">
                          Fill in your profile details to see potential study partners 
                        </p>

                        <div className="bg-gray-100 rounded-xl py-6 px-2">
                            <h1 className="font-bold text-2xl text-center">
                                Ready To Find Study Buddies?
                            </h1>
                            <p className="text-gray-700 text-center">
                                Fill in your profile details to see potential study partners 
                            </p>
                        </div>
                    </>

                    :

                    JSON.stringify(result)
                }

            </section>
        </div>
    )
}