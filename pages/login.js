import Head from "next/head";
import { useRouter } from "next/router";
import { auth, provider } from "../firebase";

function Login() {
  const router = useRouter();
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
    router.push("/chat", undefined, { shallow: true });
  };

  return (
    <div className="flex h-screen w-full items-center bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col mx-auto bg-white w-min p-8 sm:p-12 md:p-20  rounded shadow-md">
        <img
          className="object-contain mx-auto"
          height="150"
          width="150"
          src="/Logo.png"
          alt="Logo"
        />
        <button
          onClick={signIn}
          className="text-xl border border-green-500 rounded mx-auto whitespace-nowrap w-min mt-5 p-2"
        >
          {"Sign In With Google".toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export default Login;
