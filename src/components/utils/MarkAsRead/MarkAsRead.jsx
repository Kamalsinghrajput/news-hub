import React, { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../../constants/constants";

export const MarkAsRead = ({ userId, articleId }) => {
  const [isRead, setIsRead] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfRead = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/article-is-read?userId=${userId}&articleId=${articleId}`
      );
      const data = await response.json();
      setIsRead(data.exists);
    } catch (error) {
      console.error("Error checking read status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfRead();
  }, [userId, articleId]);

  const toggleReadStatus = async () => {
    try {
      setIsLoading(true);
      const endpoint = isRead ? "/unmark-article-read" : "/mark-article-read";
      const method = isRead ? "DELETE" : "POST";
      console.log(method);
      await fetch(
        `${API_BASE_URL}${endpoint}?userId=${userId}&articleId=${articleId}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsRead((prev) => !prev);
    } catch (error) {
      console.error(
        `Error ${isRead ? "unmarking" : "marking"} article as read:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

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
            {isRead ? "Read (Click to Unmark)" : "Mark as read"}
          </span>
        </>
      )}
    </button>
  );
};
