import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import InputComponent from "../../components/InputComponent";
import Button_Component from "../../components/ButtonsComponent";
import { Link, useNavigate } from "react-router";
import showPassword_Button from '../../assets/icons/Show white.svg'
import google_logo from '../../assets/images/google icon.png'
import { SpiningLoader, StopInteractionComponent } from "../../components/loadingComponent";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
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
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();



export default function LoginPage() {
    const [userData, setUserData] = useState({
        email:'',
        password:''
    })

    const [isloading, setIsloading] = useState(false)

    const [showPassword, setShowPssword] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserData(prev=> ({...prev, [name]:value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleSignIn() {
        if(userData.email === '' || userData.password === ''){
            toast.error('email and password required')
        } else {
            setIsloading(true);

            signInWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredential)=>{
                setIsloading(false)
                const user = userCredential.user
                toast.success('login successful')
                localStorage.setItem('Study-verse-login', user.uid)
                navigate('/homepage')
            })
            .catch((error)=>{
                setIsloading(false)
                const error_code = error.code
                if (error_code ==="auth/invalid-credential") {
                    toast.error("incorrect email or password")
                } else if (error_code ==="auth/user-not-found") {
                    toast.error("user does not exist")
                } else {
                    toast.error('error')
                }
            })
        }
    }

    function handleSignIn_google() {
        setIsloading(true);

        signInWithPopup(auth, provider)
        .then((result)=>{
            setIsloading(false)
            
        })
        .catch(error=>{
            setIsloading(false)
            toast.error(error)
        })
    }

    return (
        <div className="login-signup-page">

            {isloading && <StopInteractionComponent>
                <SpiningLoader/>
            </StopInteractionComponent>}

            <ToastContainer/>
            
            <FormComponent onSubmit={(e)=> handleSubmit(e)} className='registration-form'>

                <InputComponent
                 className='reg-input'
                 value={userData.email}
                 onChange={e=> handleChange(e)}
                 placeholder='input email'
                 name='email'
                 type='email'
                />

                <InputComponent
                 className='reg-input'
                 value={userData.password}
                 onChange={e=> handleChange(e)}
                 placeholder='input password'
                 name='password'
                 type={showPassword ? 'text' : 'password'}
                />

                <img src={showPassword_Button} onClick={()=> setShowPssword(!showPassword)}
                 className="absolute top-41.5 right-6 w-7 bg-black md:right-37 lg:right-63 xl:right-124"
                />

                <Button_Component className='w-full bg-green-600 rounded-lg p-3 font-bold'
                 onclick={handleSignIn}
                >
                    Continue
                </Button_Component>

                    <h1 className="text-center">or</h1>

                <Button_Component className='w-full bg-white text-black rounded-lg p-3 font-bold flex justify-center'
                 onclick={handleSignIn_google}
                >
                <img src={google_logo} className="w-7 inline-block " />
                    Login with Google
                </Button_Component>

                <p className="text-center">
                    don't have an account?  

                    <Link to='/signup' className="text-green-400">
                        SignUp
                    </Link>

                </p>

            </FormComponent>

        </div>
    )
}