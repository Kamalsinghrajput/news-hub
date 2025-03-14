import {
  BookmarkPlus,
  Share2,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
const NewsCard = ({ title, id, image, description, isRead, isSaved }) => {
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="text-green-500" size={18} />;
      case "negative":
        return <TrendingDown className="text-red-500" size={18} />;
      default:
        return <Minus className="text-gray-500" size={18} />;
    }
  };

  return (
    <article
      key={id}
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
              {getSentimentIcon("positive")}
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {"positive".charAt(0).toUpperCase() + "positive".slice(1)}
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
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isRead
                  ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <CheckCircle size={18} />
              <span className="text-sm font-medium">
                {isRead ? "Read" : "Mark as read"}
              </span>
            </button>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                isSaved
                  ? "bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"
                  : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <BookmarkPlus size={18} />
              <span className="text-sm font-medium">
                {isSaved ? "Saved" : "Save"}
              </span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              <Share2 size={18} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
