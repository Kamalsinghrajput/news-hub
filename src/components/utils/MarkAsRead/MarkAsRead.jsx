import React, { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { apolloClient } from "../../../lib/nhost";
import { useMutation } from "@apollo/client";
import { IS_READ, MARK_AS_READ } from "../../../graphql/queries/queries";
import { useUserId } from "@nhost/react";

export const MarkAsRead = ({ articleUrl }) => {
  const [isRead, setIsRead] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useUserId();
  const [insertIsRead] = useMutation(MARK_AS_READ);

  const toggleReadStatus = async () => {
    try {
      setIsLoading(true);

      const { data } = await insertIsRead({
        variables: {
          userId: "b56bfd3b-a841-438c-93cc-5c8f7162d26c",
          articleUrl: "https://example.com/article-123",
        },
      });
      console.log("Marked as read:", data);
    } catch (error) {
      console.error(
        `Error ${isRead ? "unmarking" : "marking"} article as read:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const checkIsRead = async () => {
    try {
      const { data } = await apolloClient.query({
        query: IS_READ,
        variables: { userId, articleUrl },
      });

      if (data.is_read.length > 0) setIsRead(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIsRead();
  }, []);

  return (
    <button
      onClick={toggleReadStatus}
      className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
        isRead
          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
          : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <CheckCircle size={18} />
          <span className="text-sm font-medium">
            {isRead ? "Read" : "Mark as read"}
          </span>
        </>
      )}
    </button>
  );
};
