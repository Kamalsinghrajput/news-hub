import { useSignUpEmailPassword } from "@nhost/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { nhost } from "../../../lib/nhost";

function SignUp({ setIsSignUp }) {
  const { signUpEmailPassword, isLoading, isSuccess, error } =
    useSignUpEmailPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { error, user } = await signUpEmailPassword(email, password);
    console.log(user);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification email sent! Please verify your email.");
      // await nhost.graphql.request(INSERT_PREFERENCES, {
      //   userId: user.id,
      //   category: [],
      // });

      // setTimeout(() => navigate("/signin"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create an account</h2>
          <p className="mt-2 text-gray-400">Sign up to get started</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {isSuccess && <p>Verification email sent! Check your inbox.</p>}
          {error && <p className="text-red-500">{error.message}</p>}
        </form>

        <div className="text-center text-white mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setIsSignUp((prev) => !prev)}
            className="text-blue-400 hover:text-blue-300"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
