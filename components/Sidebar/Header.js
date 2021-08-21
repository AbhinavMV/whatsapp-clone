import { auth } from "../../firebase";
function Header({ image }) {
  return (
    <div className="flex justify-between sticky top-0 z-10 items-center p-2 h-12 border-b-1 bg-gray-50">
      {/* avatar */}
      <img
        onClick={() => auth.signOut()}
        className="rounded-full mr-5 h-10 w-10 cursor-pointer"
        src={image ? image : "/default.png"}
        alt="header"
      />
      <div className="flex">
        {/* message */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clipRule="evenodd"
          />
        </svg>
        {/* dots vertical */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-500"
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
      </div>
    </div>
  );
}
export default Header;
