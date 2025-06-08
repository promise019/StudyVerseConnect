import { useContext, useEffect, useState } from "react";

import profileImage from "../../../assets/images/profile image.jpg";
import { AuthContext } from "../../Context/AuthContext";

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
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
import { Link } from "react-router";
import ChatBox from "./ChatBox";

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

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState({});

  const [mobileChatBox, setMobileChatBox] = useState(false);

  async function getFriendlist() {
    setIsloading(true);
    try {
      const friendList_ref = collection(
        db,
        "users",
        isLoggedIn,
        "friend lists"
      );
      const snapShot = await getDocs(friendList_ref);
      const result = snapShot.docs.map((docs) => docs.data());
      setIsloading(false);
      setFriends(result);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getFriendlist();
  }, []);

  return (
    <div className='lg:h-[80vh]'>
      {friends.length == 0 ? (
        <h1 className='text-center font-bold'>
          Find buddies to make Friendlists
        </h1>
      ) : (
        <>
          {" "}
          <div className='lg:w-[30%] lg:float-left lg:inline-block overflow-y-auto'>
            {friends.map((_friends) => (
              //   <Link to={`friend_lists/${_friends.userId}`}>
              <div
                key={_friends.userId}
                onClick={() => {
                  setSelectedUser({
                    id: _friends.userId,
                    username: _friends.name,
                    Image: profileImage,
                  });

                  setMobileChatBox(true);
                }}
                className='flex space-x-3 p-2 border-b border-gray-200'
              >
                <img
                  src={profileImage}
                  alt='user image'
                  className='w-10 inline-block rounded-full'
                />
                <div className=''>
                  <h1 className='font-bold '>{_friends.name}</h1>
                  <h1 className='truncate'>current message</h1>
                </div>
              </div>
              //   </Link>
            ))}
          </div>
          <ChatBox
            selectedUser={selectedUser}
            onBack={() => setMobileChatBox(!mobileChatBox)}
            mobileChatBox={mobileChatBox}
          />
        </>
      )}
    </div>
  );
}
