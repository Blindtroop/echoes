import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import EchoItem from "./EchoItem";

const EchoFeed = () => {
  const [echoes, setEchoes] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "echoes"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEchoes(data);
    });
    return () => unsubscribe();
  }, []);

  // Group replies by their parent ID
  const rootEchoes = echoes.filter((e) => !e.replyTo);
  const getReplies = (id) => echoes.filter((e) => e.replyTo?.id === id);

  return (
    <div className="flex flex-col items-center w-full px-4 mt-10">
      <div className="w-full max-w-2xl space-y-4 mb-10">
        {rootEchoes.length === 0 && (
          <p className="text-gray-400 text-center">No echoes yet...</p>
        )}

        {rootEchoes.map((echo) => (
          <EchoItem
            key={echo.id}
            echo={echo}
            getReplies={getReplies}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />
        ))}
      </div>
    </div>
  );
};

export default EchoFeed;
