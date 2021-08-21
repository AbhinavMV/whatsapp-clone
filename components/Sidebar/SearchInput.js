function SearchInput() {
  return (
    <div className="flex p-2 border m-2 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input type="text" className="w-full outline-none" />
    </div>
  );
}

export default SearchInput;
