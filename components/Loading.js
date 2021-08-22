function Loading() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col items-center">
        <img src="./Logo.png" height="200" width="200" className="mb-2" />
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
