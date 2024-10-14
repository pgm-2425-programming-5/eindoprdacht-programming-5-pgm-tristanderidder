// app/login/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/home");
    }
  };

  const handleLoginWithGitHub = async () => {
    const res = await signIn("github", { redirect: false });
    if (!res?.error) {
      router.push("/home");
    }
  };

  const handleLoginWithGoogle = async () => {
    const res = await signIn("google", { redirect: false });
    if (!res?.error) {
      router.push("/home");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl shadow-lg">
      <h1 className="text-3xl font-serif font-bold text-center text-gray-900 mb-6">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800"
          >
            Email:
          </label>
          <input
            name="email"
            type="email"
            required
            id="email"
            className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800"
          >
            Password:
          </label>
          <input
            name="password"
            type="password"
            required
            id="password"
            className="mt-1 block w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
      <hr className="my-6 border-gray-300" />
      <button
        onClick={handleLoginWithGitHub}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login with GitHub
      </button>
      <button
        onClick={handleLoginWithGoogle}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
