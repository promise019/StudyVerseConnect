import { useContext, useEffect, useState } from 'react'
import StudyVerse_logo1 from '../../assets/images/StudyVerse1.svg'
import photo from '../../assets/images/photo.jpeg'
import photo1 from '../../assets/images/photo1.jpeg'
import photo2 from '../../assets/images/photo2.jpeg'
import photo3 from '../../assets/images/photo3.jpeg'
import { useNavigate } from 'react-router'
import { AuthContext } from '../Context/AuthContext'


const images = [
    photo,
    photo1,
    photo2,
    photo3
]

export default function LandingPage() {
    const [currentImage, setCurrentImg] = useState(0);
    const {signUpData, isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{

        const interval = setInterval(()=>{
            setCurrentImg(prev => prev < images.length - 1 ? prev + 1 : 0 )
        }, 3000)

        return ()=>{
            clearInterval(interval)
        }
    }, [])

    const checkUserLoginOrSignUp = ()=>{
        if (signUpData && !isLoggedIn) {
            navigate('/login')
        } else if (!signUpData && !isLoggedIn) {
            navigate('/signup')
        } else if (signUpData && isLoggedIn) {
            navigate('/login')
        }
    }

    return(
        <div className='text-center bg-gradient-to-r from-blue-600 via-green-400 to-indigo-500 h-screen px-3 py-9'>
            <h1 className='font-bold text-5xl mt-[7%] xl:mt-0'>
                StudyVerse Connect
            </h1>

            <div className='flex my-9 shadow-xl shadow-amber-100 
                            md:w-[70%] md:ml-[15%] 
                            lg:w-[63%] lg:ml-[18%]
                            xl:w-[40%] xl:ml-[30%]'
            >

                <img src={images[currentImage]}
                 className="rounded-lg"
                />

            </div>

            <p className='font-bold italic mb-10 md:w-[70%] md:ml-[15%] lg:w-[63%] lg:ml-[18.3%] xl:w-[40%] xl:ml-[30%] xl:mb-4'>
                Unlock Your Learning Potential.
                Find compatible study partners and instant help from your AI buddy
            </p>

            <button className='bg-blue-800 text-white font-bold p-3 rounded-lg w-full md:w-[70%] lg:w-[63%] lg:-ml-[1.3%] xl:w-[40%] xl:ml-[0%]'
             onClick={()=> checkUserLoginOrSignUp()}
            >
                Get Started
            </button>
        </div>
    )
}