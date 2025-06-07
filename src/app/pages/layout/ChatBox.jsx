import { useParams } from "react-router";

import profileImage from "../../../assets/images/profile image.jpg";
import Button_Component from "../../../components/ButtonsComponent";
import send from "../../../assets/icons/Send it.svg";
import { useState } from "react";

export default function ChatBox({ selectedUser, onBack }) {
  const { id } = useParams();
  const [isloading, setIsloading] = useState(false);

  return (
    <div className='lg:w-[70%] p-3 lg:float-right lg:border-l lg:h-full'>
      {selectedUser?.username === undefined ? (
        <h1 className='font-bold text-2xl mt-30'>
          select buddy and start chat
        </h1>
      ) : (
        <>
          <header className='w-full p-2 space-x-4'>
            <img
              src={profileImage}
              alt='user image'
              className='w-10 rounded-full inline-block'
            />

            <h1 className='inline-block'>{selectedUser.username}</h1>
          </header>

          <footer className='fixed bottom-0 flex space-x-3 bg-gray-300 p-2 -ml-3 lg:w-[56%] xl:w-[46%]'>
            <textarea
              className='resize-none border border-gray-400 h-11 p-2 rounded-lg lg:w-[89%]'
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
