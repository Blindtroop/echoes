import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const EchoFeed = () => {
  const [echoes, setEchoes] = useState([]);

  useEffect(() => {
    // 🔥 query using "timestamp" since that's what EchoForm saves
    const q = query(collection(db, "echoes"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEchoes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-10 space-y-4 w-full max-w-2xl px-4">
      {echoes.length === 0 && (
        <p className="text-gray-400 text-center">No echoes yet...</p>
      )}
      {echoes.map((echo) => (
        <motion.div
          key={echo.id}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-black border border-white text-white p-4 shadow-lg"
        >
          <p className="text-lg">{echo.text}</p>
          <p className="text-sm text-gray-400 text-right">
            {echo.timestamp?.toDate
              ? formatDistanceToNow(echo.timestamp.toDate(), { addSuffix: true })
              : "just now"}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default EchoFeed;
