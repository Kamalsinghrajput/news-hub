import NewsCard from "./NewsCard";
import {useEffect, useState} from "react";
import Loader from "../utils/loader/Loader.jsx";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    fetchNews(signal);
    
    return () => {
      controller.abort();
    };
  }, []);
  
  const baseUrl = import.meta.env.VITE_APP_NEWS_URL;
  
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}?q=rates`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <Loader/>;
  return (
    <div className="col-span-9">
      <div className="space-y-6">
        {articles?.map((article, index) => {
          return <NewsCard {...article} key={index}/>;
        })}
      </div>
    </div>
  );
};

export default News;
