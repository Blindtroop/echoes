import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { db } from "../firebase/firebase"; // ✅ make sure path matches
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const EchoForm = () => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await addDoc(collection(db, "echoes"), {
        text: input,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error("Error saving echo:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-10 px-4">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-2xl space-y-4"
      >
        <textarea
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full rounded-2xl bg-black border border-white text-white placeholder-gray-400 italic p-4 focus:outline-none focus:ring-2 focus:ring-white text-lg"
        />
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
