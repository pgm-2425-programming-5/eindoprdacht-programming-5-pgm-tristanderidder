"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold  text-center mb-4">
        Flavorelle
      </h1>
      <div className="flex justify-center space-x-6">
        <Link href={"/"}>Notifications</Link>
        <Link
          href="/recipes"
          className="hover:text-blue-400 transition duration-300">
          Chat
        </Link>
        <Link
          href="/addRecipes"
          className="hover:text-blue-400 transition duration-300">
          Add Recipe
        </Link>
        <Link
          href="/addRecipes"
          className="hover:text-blue-400 transition duration-300">
          Profile
        </Link>
      </div>
    </nav>
  );
}