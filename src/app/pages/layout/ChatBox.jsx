import { useParams } from "react-router";

import profileImage from "../../../assets/images/profile image.jpg";
import Button_Component from "../../../components/ButtonsComponent";
import send from "../../../assets/icons/Send it.svg";
import back from "../../../assets/icons/Arrow back black.svg";
import { useState } from "react";

export default function ChatBox({ selectedUser, mobileChatBox, onBack }) {
  const { id } = useParams();
  const [isloading, setIsloading] = useState(false);

  return (
    <div
      className={`${
        !mobileChatBox && "hidden"
      } fixed top-0 left-0 h-screen bg-white w-screen p-1 md:px-15 lg:static lg:w-[70%] lg:p-3 lg:float-right lg:border-l lg:h-full`}
    >
      {selectedUser?.username === undefined ? (
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

          <footer className='fixed bottom-0 flex space-x-3 bg-gray-300 p-2 w-screen -ml-2 md:w-[87%] lg:-ml-3 lg:w-[56%] xl:w-[46%]'>
            <textarea
              className='resize-none border border-gray-400 h-11 p-2 rounded-lg w-[97%] lg:w-[89%]'
              placeholder='send a message'
            />
            <Button_Component
              onclick={(e) => handle_Submit_prompt(e)}
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
