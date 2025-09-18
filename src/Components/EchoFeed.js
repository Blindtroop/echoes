// src/Components/EchoFeed.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

const EchoFeed = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, text: "This is the first echo in the void..." },
    { id: 2, text: "Another whisper drifts through the darkness." },
    { id: 3, text: "Echoes remind us we are not alone." },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newPost = {
      id: Date.now(),
      text: input,
    };
    setPosts([newPost, ...posts]); // put new post at top
    setInput(""); // clear input
  };

  return (
    <div className="flex flex-col items-center w-full px-4 mt-6">
      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col items-center space-y-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
         className="w-full h-170 px-6 py-4 rounded-xl bg-black border border-white text-white text-lg italic placeholder-gray-400"
          rows={3}
        />
        <button
          type="submit"
          className="flex items-center space-x-2 px-6 py-3 rounded-2xl border border-white bg-black text-white hover:bg-gray-900 transition"
        >
          <FiSend className="w-5 h-5" />
          <span>Send Your Echo</span>
        </button>
      </form>

      {/* Posts */}
      <div className="w-full max-w-xl mt-8 space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} // alternate slide left/right
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="p-4 rounded-2xl border border-white bg-black text-white shadow-md"
          >
            {post.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EchoFeed;
