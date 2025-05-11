import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import InputComponent from "../../components/InputComponent";
import Button_Component from "../../components/ButtonsComponent";
import { SpiningLoader, StopInteractionComponent } from "../../components/loadingComponent";
import { Link, useNavigate } from "react-router";
import showPassword_Button from '../../assets/icons/Show white.svg'
import { EmailError, NameError, PasswordError } from "../../utility/RegistrationValidator";
import google_logo from '../../assets/images/google icon.png'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify'

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";


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
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider();


export default function SignUpPage() {
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState(null);

    const [userData, setUserData] = useState({
        name:'',
        password:'',
        email:''
    });

    const [showPassword, setShowPssword] = useState(false);

    const [nameError, setNameError] = useState([]);
    const [emailError, setEmailError] = useState([]);
    const [passwordError, setPasswordError] = useState([]);

    const navigate = useNavigate();

    //Utility: registration input checker function 
    const validateNameError = NameError(userData.name);
    const validateEmailError = EmailError(userData.email);
    const validatePasswordError = PasswordError(userData.password);

    let validity = userData.name === '' || userData.email.length < 1 || !/@(gmail\.com|yahoomail\.com)$/.test(userData.email) ||
                   userData.password === '' || !userData.password.match(/[0-9]/) || !userData.password.match(/[A-Z]/) || userData.password.length < 
                   !userData.password.match(/[a-z]/)
    const validateUser_name = userData.name === '';

    function handleChange(e) {
        const {name, value} = e.target;
        setUserData(prev=> ({...prev, [name]: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    //signup with email and password
    const handleCreateAccount = ()=>{
        if (validity) {
            setNameError(validateNameError)
            setEmailError(validateEmailError)
            setPasswordError(validatePasswordError)

        } else if (!validity) {
            setNameError([])
            setEmailError([])
            setPasswordError([])
            setIsloading(true)

            createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredential)=>{
                const user = userCredential.user
                localStorage.setItem('Study-verse-signup', JSON.stringify(user))
                console.log(user)
                setIsloading(false)

                const docRef = doc(db, 'users', user.uid)
                setDoc(docRef, userData)
                .then(()=>{
                    toast.success('account successfully created')
                    setTimeout(()=>{
                        navigate('/login')
                    }, 3000)
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                setIsloading(false)
                setError(err.code)
                toast.error(err.code === "auth/email-already-in-use" ? 'email already in use' : 'unable to create user')
            })
        }
    };



    //signup with google
    const handleCreateAccount_Google = ()=>{
    
            setNameError([])
            setIsloading(true)

            signInWithPopup(auth, provider)
            .then((result) => {
                setIsloading(false)
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;

              const user_info = {
                name:user.displayName,
                email:user.email
              }

              localStorage.setItem('Study-verse-signup', JSON.stringify(user))
              const docRef = doc(db, 'users', user.uid)
                    setDoc(docRef, user_info)
                    .then(()=>{
                        toast.success('signup successful')
                        setTimeout(() => {
                            navigate('/homepage')
                        }, 4000);
                    })
                    .catch((err)=>{
                        console.log(err)
                        toast.error(err)
                    })
                
            })
            .catch((error) => {
                setIsloading(false);

                const errorCode = error.code;
                const errorMessage = error.message;
                
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                setError(error.code)
                console.log(error.code)
                toast.error(error.code === "auth/email-already-in-use" ? 'email already in use' : 'unable to create user')
              // ...
            })
            .finally(()=> setIsloading(false))
    }

    return (
        <div className="login-signup-page">

            <ToastContainer/>

            {isloading && <StopInteractionComponent>
                <SpiningLoader/>
            </StopInteractionComponent>}

            <FormComponent onSubmit={(e)=> handleSubmit(e) } className='registration-form'>

                <InputComponent
                 className='reg-input'
                 value={userData.name}
                 onChange={e=> handleChange(e)}
                 placeholder='input username'
                 name='name'
                 type='text'
                />
                {nameError.length > 0 && 
                 <span className="absolute top-32 bg-black text-red-500">
                    {nameError}
                 </span>}

                <InputComponent
                 className='reg-input'
                 value={userData.email}
                 onChange={e=> handleChange(e)}
                 placeholder='input email'
                 name='email'
                 type='email'
                />
                {emailError.length > 0 &&
                 <span className="absolute top-48 bg-black text-red-500">
                    {emailError}
                 </span>}


                <InputComponent
                 className='reg-input pr-7'
                 value={userData.password}
                 onChange={e=> handleChange(e)}
                 placeholder='input password'
                 name='password'
                 type={showPassword ? 'text' : 'password'}
                />
                {passwordError.length > 0 && 
                 <span className="absolute top-65 text-red-500 bg-black">
                    {passwordError}
                 </span>}


                <img src={showPassword_Button}
                 onClick={()=> setShowPssword(!showPassword)}
                 className="absolute top-58 right-6 w-7 bg-black md:right-37 lg:right-63 xl:right-124"
                />

                <Button_Component onclick={handleCreateAccount}
                 className='w-full bg-green-600 rounded-lg p-3 font-bold'>
                    Continue
                </Button_Component>

                    <h1 className="text-center">or</h1>

                <Button_Component onclick={handleCreateAccount_Google}
                 className='w-full bg-white text-black rounded-lg p-3 font-bold flex justify-center'>
                    <img src={google_logo} className="w-7" />
                    SignUp with Google
                </Button_Component>

                <p className="text-center">
                    Already have an account?  

                    <Link to='/login' className="text-green-400">
                        Login
                    </Link>

                </p>

            </FormComponent>

        </div>
    )
}