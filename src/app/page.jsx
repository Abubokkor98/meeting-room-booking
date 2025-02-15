import Image from "next/image";
import backgroundimage from "../../public/meeting-room.jpg";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex relative flex-col justify-center items-center h-screen">
      <Image
        className="blur-sm"
        alt="backgroundimage"
        src={backgroundimage}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className=" p-2 flex flex-col justify-center items-center z-10 bg-purple-100 lg:w-2/5 h-1/4 rounded-md">
        <div className="flex pb-5 mb-5 text-5xl text-purple-800">
          <SparklesIcon className="w-12 h-12" />
          <p>LitLoop</p>
        </div>
        <div>
          <Link
            href="/rooms"
            className="bg-purple-700 text-white hover:bg-purple-900 p-3 rounded-sm text-lg text mr-2"
          >
            View Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
