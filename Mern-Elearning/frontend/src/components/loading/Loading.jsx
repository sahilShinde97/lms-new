import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full bg-transparent">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 border-solid shadow-lg"></div>
    </div>
  );
};

export default Loading;