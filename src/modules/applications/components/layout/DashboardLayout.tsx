import Header from "./Header";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-1 overflow-hidden'>
        <Header />
        <main className='p-6 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
