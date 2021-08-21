import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth, db } from "../../firebase";
import Chat from "./Chat";

import Header from "./Header";
import SearchInput from "./SearchInput";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Please enter an email address for the user you wish to chat with");
    if (!input) return;
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      db.collection("chats").add({ users: [user.email, input] });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail))
      ?.exists;

  return (
    <div className="flex flex-col border-r-2 h-screen">
      <Header image={user?.photoURL} />
      <SearchInput />
      <button className="w-full border-b-2 h-10 mb-2 p-2 mx-auto" onClick={createChat}>
        {"Start a new chat".toUpperCase()}
      </button>
      <div className="overflow-y-scroll scrollbar-hide">
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
