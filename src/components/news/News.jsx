import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/constants.js";
import { usePreferences } from "../../custom-hooks/usePreferences.jsx";
import Loader from "../utils/loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../store/appLoaderSlice.js";

const News = () => {
  const baseUrl = API_BASE_URL;
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appLoader.isLoading);
  const [articles, setArticles] = useState([]);
  const { preferences, loading } = usePreferences() ?? {};

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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchNewsAsPreference = async () => {
    dispatch(showLoader());

    if (!preferences) {
      dispatch(hideLoader());
      return;
    }
    for (const category of preferences) {
      await fetchNews(category);
      await delay(500);
    }

    dispatch(hideLoader());
  };

  useEffect(() => {
    if (preferences?.length > 0) {
      fetchNewsAsPreference();
    }
  }, [preferences]);

  useEffect(() => {
    if (articles.length > 0 && articles.length <= 5) {
      dispatch(hideLoader());
    }
  }, [articles]);

  if (isLoading || loading) return <Loader />;

  return (
    <div className="col-span-9">
      {preferences && preferences?.length > 0 && (
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
          />
        ))}
      </div>
    </div>
  );
};

export default News;
