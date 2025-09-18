import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

// Helper function for "time ago"
const timeAgo = (timestamp) => {
  const now = new Date();
  const seconds = Math.floor((now - timestamp) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const EchoForm = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, text: "This is a mock echo already here.", createdAt: new Date(Date.now() - 1000 * 60 * 2) }, // 2 mins ago
    { id: 2, text: "Another mock post floating beneath.", createdAt: new Date(Date.now() - 1000 * 60 * 10) }, // 10 mins ago
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newPost = {
      id: Date.now(),
      text: input,
      createdAt: new Date(),
    };

    setPosts([newPost, ...posts]); // new one on top
    setInput(""); // clear input
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

      {/* Posts */}
      <div className="mt-8 w-full max-w-2xl space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // left/right alternate
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-2xl bg-black border border-white text-white p-4 relative"
          >
            <p>{post.text}</p>
            <span className="absolute bottom-2 right-4 text-xs text-gray-400 italic">
              {timeAgo(post.createdAt)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EchoForm;
