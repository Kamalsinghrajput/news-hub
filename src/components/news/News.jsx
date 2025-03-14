import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import Loader from "../utils/loader/Loader.jsx";
import { API_BASE_URL } from "../../constants/constants.js";

const News = ({ preferences }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }

    try {
      const response = await fetch(`${baseUrl}/get-news?category=${category}`, {
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...data]);
    } catch (error) {
      console.error(`Error fetching news for category ${category}:`, error);
    }
  };

  // Helper function to add delay
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchNewsAsPreference = async (signal) => {
    console.log(preferences);
    setLoading(true);

    for (const category of preferences) {
      await fetchNews(category, signal);
      // await delay(500); // Wait 500ms before next request
    }

    setLoading(false);
  };

  if (loading) return <Loader />;

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
