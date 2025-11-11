import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { formatDistanceToNow } from "date-fns";
import { FiCornerUpLeft } from "react-icons/fi";
import EchoForm from "./EchoForm";

const EchoItem = ({ echo, getReplies, replyingTo, setReplyingTo, depth = 0 }) => {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const replies = getReplies(echo.id);
  const handlers = useSwipeable({
    onSwipedRight: () => setReplyingTo(echo),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  const isReplyingToThis = replyingTo?.id === echo.id;

  // limit to 3 visible replies
  const visibleReplies = showAllReplies ? replies : replies.slice(0, 3);

  return (
    <motion.div
      {...handlers}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl bg-black border border-white text-white p-4 shadow-lg relative ${
        depth > 0 ? "ml-6" : ""
      }`}
    >
      {/* Reply reference (if exists) */}
      {echo.replyTo && (
        <div className="border-l-4 border-blue-400 pl-3 mb-2 text-sm text-gray-400 italic">
          <p>Replying to: {echo.replyTo.text}</p>
        </div>
      )}

      {/* Main message */}
      <p className="text-lg">{echo.text}</p>

      {/* Timestamp */}
      <p className="text-sm text-gray-400 text-right mt-2">
        {echo.timestamp?.toDate
          ? formatDistanceToNow(echo.timestamp.toDate(), { addSuffix: true })
          : "just now"}
      </p>

      {/* Reply button */}
      <button
        onClick={() => setReplyingTo(echo)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        title="Reply"
      >
        <FiCornerUpLeft />
      </button>

      {/* Inline reply form */}
      {isReplyingToThis && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <EchoForm replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
        </div>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {visibleReplies.map((reply) => (
            <EchoItem
              key={reply.id}
              echo={reply}
              getReplies={getReplies}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              depth={depth + 1} // indent replies
            />
          ))}

          {/* “View more replies” button */}
          {replies.length > 3 && (
            <button
              onClick={() => setShowAllReplies((prev) => !prev)}
              className="text-sm text-blue-400 hover:underline ml-6"
            >
              {showAllReplies
                ? "Hide replies"
                : `View ${replies.length - 3} more repl${
                    replies.length - 3 === 1 ? "y" : "ies"
                  }`}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default EchoItem;
