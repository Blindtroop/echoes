import React from "react";
import { FiSend } from "react-icons/fi"; // Send icon

const EchoForm = () => {
  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <form className="flex flex-col items-center w-full max-w-2xl space-y-4">
        {/* Input */}
        <textarea
          rows="4"
          placeholder="What's on your mind?"
          className="w-full rounded-2xl bg-black border border-white text-white placeholder-gray-400 italic p-4 focus:outline-none focus:ring-2 focus:ring-white text-lg"
        />

        {/* Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-2xl bg-black border border-white text-white px-6 py-3 text-lg font-medium hover:bg-white hover:text-black transition-all"
        >
          <FiSend className="text-xl" />
          Send Your Echo
        </button>
      </form>
    </div>
  );
};

export default EchoForm;
