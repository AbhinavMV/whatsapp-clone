import firebase from "firebase";
import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react";
import { auth, db } from "../firebase";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";

function ChatScreen({ messages, chat }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const recipientEmail = getRecipientEmail(chat.users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{ ...message.data(), timestamp: message.data().timestamp?.toDate().getTime() }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={{ ...message }} />
      ));
    }
  };

  const scrollToBottom = () =>
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const sendMessage = (e) => {
    e.preventDefault();
    if (input === "") return;
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex sticky top-0 z-10 items-center p-2 h-12 border-b-1 bg-gray-50">
        {/* avatar */}
        <img
          className="rounded-full mr-5 h-10 w-10 cursor-pointer"
          src={recipient ? recipient.photoURL : "/default.png"}
          alt="header"
        />
        <div className="w-full">
          <h4 className="font-bold">{recipientEmail}</h4>
          {recipientSnapshot ? (
            <p className="text-xs">
              Last seen:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            "Loading Last Active.."
          )}
        </div>
        <div className="flex">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          {/* dots vertical */}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className="flex flex-col overflow-y-scroll scrollbar-hide"
        style={{ minHeight: "80vh", backgroundColor: "#e5ded8" }}
      >
        {showMessages()}
        <div className="mb-2" id="endOfMessages" ref={endOfMessagesRef} />
      </div>
      <form className="flex items-center w-full p-2 mt-2 bg-white" onSubmit={sendMessage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <input
          type="text"
          className="bg-gray-100 w-full h-10 outline-none p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;
