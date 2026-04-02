import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardShell({ children }) {
  return (
    <div className="min-h-screen bg-navy-950">
      <Sidebar />
      <div className="ml-16">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
