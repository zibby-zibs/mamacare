import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

export function useFirebaseMessages(requestId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!requestId) return;

    const chatRef = collection(db, "messages", requestId, "chat");
    const q = query(chatRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      queryClient.setQueryData(["messages", requestId], newMessages);
    });

    return () => unsubscribe();
  }, [requestId, queryClient]);

  return useQuery({
    queryKey: ["messages", requestId],
    queryFn: () => [],
    enabled: !!requestId,
  });
}
