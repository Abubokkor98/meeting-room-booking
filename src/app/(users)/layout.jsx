import Sidebar from "../_components/sidebar/Sidebar";

export const metadata = {
  title: "All Rooms",
  description: "View and book rooms",
};

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-4">
        {children}
      </div>
    </div>
  );
}
