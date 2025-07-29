import Sidebar from "../components/AdminSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex bg-[#0f172a]">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
