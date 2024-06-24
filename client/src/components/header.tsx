"use client";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import ButtonLogout from "./button-logout";

export default function Header() {
  return (
    <div className="flex justify-around items-center h-[50px] max-w-screen bg-black dark:bg-gray-800">
      <ul className="flex justify-center items-center gap-5 text-white dark:text-gray-300">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
