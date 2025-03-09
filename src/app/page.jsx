import Image from "next/image";
import backGroundImage from "../../public/meeting-room.jpg";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          alt="Meeting Room"
          src={backGroundImage}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> 
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center p-8 bg-white/20 backdrop-blur-sm shadow-xl rounded-lg lg:w-2/5 w-4/5">
        {/* Title */}
        <div className="flex items-center justify-center gap-3 text-white text-4xl font-semibold">
          <SparklesIcon className="w-10 h-10 text-yellow-400 animate-pulse" />
          <p>Meeting Room Booking</p>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Link
            href="/rooms"
            className="px-6 py-3 bg-teal-500 text-white text-lg font-medium rounded-md shadow-md hover:bg-teal-400 transition duration-300"
          >
            View Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
