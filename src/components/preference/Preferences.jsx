import {
  Settings,
  Laptop,
  Briefcase,
  Trophy,
  Heart,
  Film,
  Globe,
  Flag,
  Biohazard,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from "../../constants/constants";

const availableCategories = [
  "General",
  "Technology",
  "Business",
  "Sports",
  "Science",
  "Entertainment",
  "World",
  "Nation",
  "Health",
];

const categoryIcons = {
  General: Settings,
  Technology: Laptop,
  Business: Briefcase,
  Sports: Trophy,
  Science: Biohazard,
  Entertainment: Film,
  World: Globe,
  Nation: Flag,
  Health: Heart,
};

const Preferences = ({
  userId,
  userPreferences,
  setUserPreferences,
  appLoading,
}) => {
  const [selectedPreferences, setSelectedPreferences] = useState(
    userPreferences || []
  );

  const togglePreference = (category) => {
    setSelectedPreferences((prev) =>
      prev.includes(category)
        ? prev.filter((p) => p !== category)
        : [...prev, category]
    );
  };

  const savePreferences = async () => {
    try {
      setUserPreferences(selectedPreferences);
      await fetch(`${API_BASE_URL}/store-user-preferences?userId=${userId}`, {
        method: "POST",
        body: JSON.stringify(selectedPreferences),
      });
      window.location.reload("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Select Your Preferences
        </h1>

        <div className="flex items-center justify-center flex-wrap max-w-[671px] gap-4 border-1 border-white p-4 rounded-[8px]">
          {availableCategories.map((category) => {
            const Icon = categoryIcons[category];
            const isSelected = selectedPreferences.includes(category);

            return (
              <button
                key={category}
                onClick={() => togglePreference(category)}
                className={` cursor-pointer
                  w-[200px] h-[80px] rounded-lg p-4 flex flex-col items-center justify-center gap-2
                  transition-all duration-200 hover:scale-105
                  ${
                    isSelected
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                  }
                `}
              >
                <Icon
                  size={24}
                  className={isSelected ? "text-white" : "text-blue-500"}
                />
                <span className="text-sm font-medium">{category}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-gray-600">
          Selected preferences:{" "}
          {selectedPreferences.length > 0
            ? selectedPreferences.join(", ")
            : "None"}
        </div>
        <div className="flex items-center justify-center mt-8 ">
          <button
            className="bg-white rounded-[8px] p-3 cursor-pointer"
            onClick={savePreferences}
          >
            {appLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Save Preferences"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
