import Button_Component from "../../../components/ButtonsComponent";
import InputComponent from "../../../components/InputComponent";
import search from '../../../assets/icons/Search white.svg'
import { useContext, useEffect, useRef, useState } from "react";
import DropDown from "../../../components/DropDownComponent";
import { DropDownContext } from "../../Context/DropDownContext";
import arrowDown from '../../../assets/icons/Arrow down.svg'
import close from '../../../assets/icons/Close.svg'
import profileImage from '../../../assets/images/profile image.jpg'

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, collection, query, where, getDocs  } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
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
    const [result, setResult] = useState([])

    const {preferredStyle, showDropDown, setShowDropDown} = useContext(DropDownContext)
    const {isLoggedIn} = useContext(AuthContext)


    async function findBuddies(subjectFocus, currentUserId) {
        try {
            const q = query(
                collection(db, 'users',),
                where('subject', '==', subjectFocus.toUpperCase())
            );
    
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs
            .filter(docSnap => docSnap.id !== currentUserId)
                .map(docSnap => {
                    const data = docSnap.data();
                    return {
                        userId: docSnap.id,
                        name: data.name || "Unknown",
                        email:data.email,
                        subject: data.subject,
                        preferredStyle: data.preferredStyle || "Not specified"
                    };
            });

            setResult(results);

        } catch (err) {
            console.error("Error finding buddies:", err);
            toast.error('couldnt find study buddies');
        }
    }
    

    async function handleFind_Buddies(e) {
        e.preventDefault();
      
        if (subjectFocus.trim() === '') return;
      
        const docRef = doc(db, 'users', isLoggedIn);
      
        try {
          await setDoc(docRef, {
            subject: subjectFocus.toUpperCase(),
            preferredStyle: preferredStyle
          }, {merge:true});
      
          toast.success('Subject added to profile');
          await findBuddies(subjectFocus, isLoggedIn);
        } catch (err) {
          toast.error('Error adding subject to profile');
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

                {result?.length === 0 ?
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

                    result.map(users=>
                        <div key={users.userId} className="space-x-2">
                            <img src={profileImage} alt="user photo"
                             className="w-12 border inline-block border-gray-200 rounded-full float-left"
                            />

                            <div className="inline-block">
                                <h1 className="font-bold truncate">
                                    {users.name}
                                </h1>

                                <h2>{users.email}</h2>
                            </div>

                            <button className="bg-blue-600 font-bold text-white p-2 rounded-lg float-right">
                                connect
                            </button>
                        </div>
                    )
                }

            </section>
        </div>
    )
}