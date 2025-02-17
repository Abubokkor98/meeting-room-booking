import Sidebar from "@/app/components/sidebar/Sidebar";

export const metadata = {
  title: "All Rooms",
  description: "view and book rooms",
};

export default function UserLayout({ children }) {
  return (
    <div className="flex xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-wrap p-2 justify-center w-full">{children}</div>
    </div>
  );
}
