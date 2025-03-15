import React, { useEffect, useState } from "react";
import NewsCard from "../news/NewsCard";
import { API_BASE_URL } from "../../constants/constants";
import Loader from "../utils/loader/Loader";

const SavedArticles = ({ userId }) => {
  const [articles, setArticles] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-saved-articles?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch saved articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedArticles();
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {articles.length > 0 ? (
        articles.map((article) => (
          <NewsCard key={article.id} {...article} userId={userId} />
        ))
      ) : (
        <p>No saved articles found.</p>
      )}
    </div>
  );
};

export default SavedArticles;
