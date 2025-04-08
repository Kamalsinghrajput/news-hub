import { useState } from "react";
import {
  BookmarkPlus,
  Share2,
  TrendingUp,
  TrendingDown,
  Meh,
} from "lucide-react";
import { MarkAsRead } from "../utils/MarkAsRead/MarkAsRead";
import { MarkAsSaved } from "../utils/MarkAsSaved/MarkAsSaved";
import ShareButton from "../utils/ShareButton/ShareButton";

const NewsCard = ({ title, image, summary, sentiment, url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "Positive":
        return <TrendingUp className="text-green-500" size={18} />;
      case "Negative":
        return <TrendingDown className="text-red-500" size={18} />;
      case "Neutral":
        return <Meh className="text-gray-500" size={18} />;
      default:
        return null;
    }
  };

  const modalOpenSettings = () => {
    setIsModalOpen(true);

    document.querySelector("body").style.overflowY = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);

    document.querySelector("body").style.overflowY = "auto";
  };

  return (
    <>
      <article
        id={url}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:scale-[1.02] transition-transform duration-200"
      >
        <div className="flex">
          <div className="w-72">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1 px-3 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-full">
                {getSentimentIcon(sentiment)}
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {sentiment?.charAt(0).toUpperCase() + sentiment?.slice(1)}
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
              {title}
            </h2>
            <button
              onClick={modalOpenSettings}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Show Summary
            </button>
            <div className="flex items-center space-x-4 mt-4">
              <MarkAsRead articleUrl={url} />
              <MarkAsSaved articleUrl={url} />
              <ShareButton url={url} />
            </div>
          </div>
        </div>
      </article>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-[999] m-0">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{summary}</p>
            <button
              onClick={closeModal}
              className="cursor-pointer mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;
