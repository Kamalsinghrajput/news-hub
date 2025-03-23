import { useSignOut } from "@nhost/react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const { signOut } = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-500">Email Not Verified</h1>
        <p className="mt-4">
          Please check your inbox and verify your email before proceeding.
        </p>

        <button
          onClick={handleSignOut}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
