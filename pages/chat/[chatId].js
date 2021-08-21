import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
function Chat({ messages, chat }) {
  const [user] = useAuthState(auth);
  return (
    <div className="flex">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatScreen chat={chat} messages={messages} />
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.chatId);
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