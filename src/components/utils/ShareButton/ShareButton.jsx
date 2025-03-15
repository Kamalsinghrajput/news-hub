import { Share2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShareButton = ({ url }) => {
  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <button
      className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      onClick={handleShareClick}
    >
      <Share2 size={18} />
      <span className="text-sm font-medium">Share</span>
    </button>
  );
};

export default ShareButton;
