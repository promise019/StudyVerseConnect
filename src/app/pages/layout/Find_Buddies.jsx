import Button_Component from "../../../components/ButtonsComponent";
import InputComponent from "../../../components/InputComponent";
import search from '../../../assets/icons/Search white.svg'
import { useEffect, useState } from "react";

export default function Find_buddies() {
    const [findBuddies, setFindBuddies] = useState('')
    const [searchBuddies, setSearchBuddies] = useState('')
    const [result, setResult] = useState([])

    useEffect(()=>{
        
    },[searchBuddies])

    function handleFind_Buddies(e) {
        e.preventDefault()

        setSearchBuddies(findBuddies)
    }

    return (
        <div className="space-y-8 lg:flex lg:space-x-15 ">
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
                 value={findBuddies}
                 onChange={(e)=> setFindBuddies(e.target.value)}
                 placeholder='e.g Advanced calculus, history'
                 className='p-2 border rounded-lg mb-4'
                />

                <label htmlFor="">Learning Style</label>
                <select name="" className='p-2 border rounded-lg mb-6'>
                    
                    <option value="">Select your learning style</option>
                    <option value="Text">Text</option>
                    <option value="voice">Voice</option>
                    <option value="Video">Video</option>
                </select>

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

                    'jjjjjjdjdjj'
                }

            </section>
        </div>
    )
}