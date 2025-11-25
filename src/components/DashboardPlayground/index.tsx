'use client'

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPlayground() {
  const router = useRouter();

  const handleNavigateToAllTools = () => {
    router.push('/all-tools');
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center">
        AI Without Limits –<span className="block lg:inline"></span>
        <span className="block lg:block">
          {/* Displays as block on all, but allows lg to remain block for forced line break */}
          Every Tool You Need, in One Place
        </span>
      </h1>
      <p className="text-center text-gray-500 max-w-xl mx-auto ">
        From content creation to innovation, get the AI tools you need to work smarter. Boost
        efficiency, unlock creativity, and streamline your tasks effortlessly.
      </p>
      <div className="flex items-center justify-center">
        <Button variant='dark' className='py-3 px-6 h-10' onClick={handleNavigateToAllTools}>Get Started</Button>
      </div>
    </div>
  );
}
