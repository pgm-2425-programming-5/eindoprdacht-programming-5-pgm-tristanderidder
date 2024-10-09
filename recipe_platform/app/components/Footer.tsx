"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <>
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
    </>
  );
}
