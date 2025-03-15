import React, { useEffect, useState } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../../constants/constants";

export const MarkAsSaved = ({ userId, articleId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfSaved = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/article-is-saved?userId=${userId}&articleId=${articleId}`
      );
      const data = await response.json();

      //TODO: clean mess up from n8n
      const isSaved = data?.["true"]?.[0].exists || data[0].exists;
      setIsSaved(isSaved);
    } catch (error) {
      console.error("Error checking saved status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfSaved();
  }, [userId, articleId]);

  const toggleSaveStatus = async () => {
    try {
      setIsLoading(true);
      const endpoint = isSaved
        ? "/unmark-article-saved"
        : "/mark-article-saved";
      const method = isSaved ? "DELETE" : "POST";

      await fetch(
        `${API_BASE_URL}${endpoint}?userId=${userId}&articleId=${articleId}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsSaved((prev) => !prev);
    } catch (error) {
      console.error(
        `Error ${isSaved ? "unmarking" : "marking"} article as saved:`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleSaveStatus}
      className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
        isSaved
          ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
          : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Bookmark size={18} />
          <span className="text-sm font-medium">
            {isSaved ? "Saved" : "Save Article"}
          </span>
        </>
      )}
    </button>
  );
};
