"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Definisikan tipe untuk ikon
type IconProps = { className?: string };

// Definisikan ikon sebagai komponen
const DashboardIcon = (props: IconProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
);
const NewsIcon = (props: IconProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3h2m-4 3h2m-4 3h2" /></svg>
);
const DataIcon = (props: IconProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const LogoutIcon = (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: DashboardIcon },
    { href: '/admin/berita', label: 'Kelola Berita', icon: NewsIcon },
    { href: '/admin/data-desa', label: 'Kelola Data Desa', icon: DataIcon },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        router.push('/login');
    };

    return (
        <aside className="w-64 flex-shrink-0 bg-gray-800 text-gray-200 flex flex-col">
            <div className="h-16 flex items-center justify-center text-white text-xl font-bold border-b border-gray-700">
                Admin Panel
            </div>
            <nav className="flex-grow px-4 py-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                                isActive 
                                ? 'bg-green-600 text-white' 
                                : 'hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="px-4 py-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                >
                    <LogoutIcon className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}