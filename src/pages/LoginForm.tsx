import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const { login } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      const loginData = await res.json();
      const { token, role } = loginData;
      login(token, role);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setErrorMessage((error as Error).message);
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md dark:bg-gray-900 dark:shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white  ">
          Login
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? "Logging..." : "Login"}
        </button>
        {errorMessage && <p className="text-red-500 pt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
