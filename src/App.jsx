import Navbar from "./components/navbar/Navbar";
import News from "./components/news/News";
import { useEffect, useState } from "react";
import Loader from "./components/utils/loader/Loader";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // ✅ Create an AbortController
    const signal = controller.signal;

    fetchNews(signal);

    return () => {
      controller.abort(); // ✅ Cleanup: Abort fetch when category changes or component unmounts
    };
  }, []);

  const baseUrl = import.meta.env.VITE_APP_NEWS_URL;

  const fetchNews = async (signal) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}?q=rates`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setArticles(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={"min-h-screen transition-colors duration-200"}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className=" gap-8">
          <News articles={articles} />
        </div>
      </main>
    </div>
  );
}

export default App;
