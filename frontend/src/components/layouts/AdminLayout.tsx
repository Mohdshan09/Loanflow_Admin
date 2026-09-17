import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

/**
 * AdminLayout renders ONCE as a router layout route.
 * Sidebar and Topbar are persistent — only the <Outlet> content swaps
 * when navigating between /dashboard, /products, /users.
 */
const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Fixed sidebar — always mounted, never re-renders on route change */}
      <Sidebar />

      {/* Right column: topbar + scrollable page content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        {/* Scrollable main area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
