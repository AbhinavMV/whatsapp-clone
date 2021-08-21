import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const sender = user === userLoggedIn.email;
  return (
    <div className="flex flex-col">
      <p
        className={`flex flex-col w-auto p-4 rounded-md m-1 min-w-min relative text-right ${
          sender ? "ml-auto bg-green-200" : "text-left bg-gray-50 mr-auto"
        }`}
      >
        {message.message}
        <span
          className="text-gray-400 p-1 absolute bottom-0 right-0 text-right"
          style={{ fontSize: 8 }}
        >
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </span>
      </p>
    </div>
  );
}

export default Message;
