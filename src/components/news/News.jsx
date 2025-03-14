import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import Loader from "../utils/loader/Loader.jsx";
import { API_BASE_URL } from "../../constants/constants.js";

const News = ({ setIsLoading, preferences }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (preferences.length > 0) {
      fetchNewsAsPreference(signal);
    } else {
      fetchNews("general", signal);
    }

    return () => {
      controller.abort();
    };
  }, [preferences]);

  const baseUrl = API_BASE_URL;

  const fetchNews = async (category, signal) => {
    if (articles.length > 0) {
      setIsLoading(false);
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/get-news-from-db?category=${category}`, {
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...data]);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(`Error fetching news for category ${category}:`, error);
      }
    }
  };

  // Helper function to add delay
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchNewsAsPreference = async (signal) => {
    for (const category of preferences) {
      await fetchNews(category, signal);
      // await delay(500); // Wait 500ms before next request
    }
  };

  return (
    <div className="col-span-9">
      <div className="space-y-6">
        {articles?.map((article, index) => (
          <NewsCard {...article} sentiment={article.text} key={index} />
        ))}
      </div>
    </div>
  );
};

export default News;
