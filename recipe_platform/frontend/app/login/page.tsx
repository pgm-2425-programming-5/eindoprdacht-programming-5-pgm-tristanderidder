// app/login/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles/login.module.css";

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
      router.push("/recipe");
    }
  };

  const handleLoginWithGitHub = async () => {
    const res = await signIn("github", { redirect: false });
    if (!res?.error) {
      router.push("/recipe");
    }
  };

  const handleLoginWithGoogle = async () => {
    const res = await signIn("google", { redirect: false });
    if (!res?.error) {
      router.push("/recipe");
    }
  };

  return (
    <div className="flex flex-col m-auto w-3/5 p-8 bg-secondary rounded-xl shadow-lg">
      <h1 className="text-3xl text-center text-primary mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            name="email"
            type="email"
            required
            id="email"
            placeholder="E-mail"
            className="mt-1 block w-full p-4 border border-primary bg-tertiary rounded-md focus:outline-none focus:ring focus:ring-accent placeholder-primaryOpacity"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium">
            Password:
          </label>
          <input
            name="password"
            type="password"
            required
            id="password"
            placeholder="Password"
            className="mt-1 block w-full p-4 border border-primary bg-tertiary rounded-md focus:outline-none focus:ring focus:ring-accent placeholder-primaryOpacity"
          />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-tertiary text-primary font-semibold hover:bg-primary hover:text-tertiary focus:outline-none transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
      <hr className="my-6 border-primary" />
      <div className="flex gap-8 justify-center">
        <button
          onClick={handleLoginWithGitHub}
          style={{
            padding: "1rem 1.5rem",
            cursor: "pointer",
          }}
          className="rounded-2xl bg-tertiary text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out"
        >
          Login with GitHub
        </button>
        <button
          onClick={handleLoginWithGitHub}
          style={{
            padding: "1rem 1.5rem",
            cursor: "pointer",
          }}
          className="rounded-2xl bg-tertiary text-primary hover:bg-primary hover:text-tertiary transition duration-300 ease-in-out"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
