import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const EchoForm = ({ replyingTo, setReplyingTo }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (replyingTo && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [replyingTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await addDoc(collection(db, "echoes"), {
        text: input,
        timestamp: serverTimestamp(),
        replyTo: replyingTo
          ? {
              id: replyingTo.id,
              text: replyingTo.text.length > 100
                ? replyingTo.text.slice(0, 100) + "..."
                : replyingTo.text,
            }
          : null,
      });
      setInput("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error saving echo:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 mt-8">
      {/* Animated reply preview box */}
      <AnimatePresence>
        {replyingTo && (
          <motion.div
            key="reply-box"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-2xl bg-gray-900 border-l-4 border-blue-400 text-gray-200 rounded-t-2xl p-3 flex justify-between items-start shadow-md"
          >
            <div className="max-w-[90%] overflow-hidden">
              <p className="text-sm italic text-gray-400">Replying to:</p>
              <p className="text-md font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                {replyingTo.text}
              </p>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-white hover:text-red-400 transition"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main input form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-2xl space-y-4"
      >
        <textarea
          ref={textareaRef}
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            replyingTo
              ? "Reply to this echo..."
              : "What's on your mind?"
          }
          className="w-full rounded-2xl bg-black border border-white text-white placeholder-gray-400 italic p-4 focus:outline-none focus:ring-2 focus:ring-white text-lg resize-none"
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
