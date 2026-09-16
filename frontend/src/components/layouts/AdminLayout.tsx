import type { ReactNode } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Fixed Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-white lg:block">
                <Sidebar />
            </aside>

            {/* Main Area */}
            <div className="min-h-screen lg:ml-64">
                {/* Topbar */}
                <header className="h-16 border-b bg-white">
                    <Topbar />
                </header>

                {/* Scrollable page content */}
                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;