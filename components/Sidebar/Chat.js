import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.replace(`${id}`);
  };

  return (
    <div onClick={enterChat} className="flex m-2 p-2 items-center break-all hover:bg-gray-200">
      {recipient ? (
        <img className="rounded-full mr-5 h-8 w-8" src={recipient?.photoURL} alt="logo" />
      ) : (
        <img className="rounded-full mr-5 h-8 w-8" src="/default.png" alt="logo" />
      )}
      <p className="text-sm font-semibold">{recipientEmail}</p>
    </div>
  );
}

export default Chat;
