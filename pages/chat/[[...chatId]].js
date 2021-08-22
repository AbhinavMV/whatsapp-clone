import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
function Chat({ messages, chat }) {
  const [user] = useAuthState(auth);
  console.log(chat);
  return (
    <div className="flex">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      {chat?.users ? (
        <ChatScreen chat={chat} messages={messages} />
      ) : (
        <div className="flex flex-col items-center w-screen">
          <h2 className="my-auto font-bold text-3xl">Add/Select a friend</h2>
        </div>
      )}
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.chatId?.[0]);
  const messagesRes = await ref.collection("messages").orderBy("timestamp", "asc").get();
  const messages = messagesRes.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .map((messages) => ({ ...messages, timestamp: messages.timestamp.toDate().getTime() }));
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}
