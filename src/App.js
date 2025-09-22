import Background from "./Components/background";
import EchoForm from "./Components/EchoForm";
import EchoFeed from "./Components/EchoFeed";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function App() {
  const fullText = "Where Whispers Linger";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;

    const speed = isDeleting ? 40 : 100; // deleting faster
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) {
          setPause(true);
          setTimeout(() => {
            setIsDeleting(true);
            setPause(false);
          }, 30000); // pause 30 seconds before deleting
        }
      } else {
        setDisplayedText(fullText.substring(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) setIsDeleting(false); // start typing again
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, pause, fullText]);

  return (
    <div className="relative min-h-screen text-white">
      <Background />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-echoes text-9xl font-bold mt-20">Echoes</h1>

        {/* Typing effect with moving cursor */}
        <p className="mt-4 text-gray-300 text-3xl font-mono flex items-center">
          {displayedText}
          <motion.span
            className="ml-1 font-bold text-white"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            |
          </motion.span>
        </p>

        <EchoForm />
        <EchoFeed />
      </div>
    </div>
  );
}

export default App;
