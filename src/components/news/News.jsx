import NewsCard from "./NewsCard";
import { useEffect } from "react";
import Loader from "../utils/loader/Loader.jsx";
import { API_BASE_URL } from "../../constants/constants.js";

const News = ({
  preferences,
  userId,
  setArticles,
  articles,
  setAppLoading,
  appLoading,
}) => {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (articles.length > 0) return;

    fetchNewsAsPreference(signal);
  }, [preferences]);

  useEffect(() => {
    if (articles.length > 0 && articles.length <= 5) {
      setAppLoading(false);
    }
  }, [articles]);

  const baseUrl = API_BASE_URL;

  const fetchNews = async (category, signal) => {
    try {
      const response = await fetch(
        `${baseUrl}/get-news?category=${category.toLowerCase()}`,
        {
          signal,
        }
      );

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
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchNewsAsPreference = async () => {
    setAppLoading(true);
    let loaderTurnedOff = false;

    if (!preferences) {
      setAppLoading(false);
      return;
    }
    for (const category of preferences) {
      await fetchNews(category);
      if (!loaderTurnedOff) {
        setAppLoading(false);
        loaderTurnedOff = true;
      }
      await delay(500); // Wait 500ms before next request
    }

    setAppLoading(false);
  };

  if (appLoading) return <Loader />;

  return (
    <div className="col-span-9">
      {preferences && (
        <div className="text-white">
          <h1 className="text-2xl font-bold my-4">
            As per your selected preferences...
          </h1>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            {preferences.map((item, key) => {
              return (
                <div
                  className="flex items-center rounded-[8px] px-4 py-2 bg-white text-black"
                  key={key}
                >
                  {`${item.charAt(0).toUpperCase()}${item.slice(1)}`}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="space-y-6">
        {articles?.map((article) => (
          <NewsCard
            {...article}
            sentiment={article.sentiment}
            key={article.url}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};

export default News;
