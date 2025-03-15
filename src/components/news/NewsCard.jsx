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

const NewsCard = ({ title, image, description, userId, sentiment, url }) => {
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

  return (
    <article
      id={url}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:scale-[1.02] transition-transform duration-200"
    >
      <div className="flex">
        <div className="w-72 ">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className=" inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
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
          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center space-x-4">
            <MarkAsRead articleId={url} userId={userId} />
            <MarkAsSaved articleId={url} userId={userId} />
            <ShareButton url={url} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
