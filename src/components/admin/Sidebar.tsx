"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import type { JSX } from 'react';

// Definisikan tipe untuk ikon dan item navigasi
type IconProps = { className?: string };
interface NavItem {
    href: string;
    label: string;
    icon: (props: IconProps) => JSX.Element;
    children?: NavItem[]; // Sub-menu opsional
}

// Komponen Ikon (tidak berubah)
const DashboardIcon = (props: IconProps) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> );
const NewsIcon = (props: IconProps) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3h2m-4 3h2" /></svg> );
const DataIcon = (props: IconProps) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> );
const LogoutIcon = (props: IconProps) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> );
const ChevronDownIcon = (props: IconProps) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg> );


// Ubah struktur data navigasi
const navItems: NavItem[] = [
    { href: '/admin', label: 'Dashboard', icon: DashboardIcon },
    { 
        href: '/admin/berita', 
        label: 'Berita', 
        icon: NewsIcon,
        children: [
            { href: '/admin/berita/tambah', label: 'Tambah Berita', icon: (props) => <span {...props}>+</span> },
            { href: '/admin/berita/list', label: 'List Berita', icon: (props) => <span {...props}>≡</span> },
        ]
    },
    { href: '/admin/data-desa', label: 'Data Desa', icon: DataIcon },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    // State untuk mengontrol dropdown yang terbuka
    const [openDropdown, setOpenDropdown] = useState<string | null>(
        navItems.find(item => item.children && pathname.startsWith(item.href))?.href || null
    );

    const handleDropdownToggle = (href: string) => {
        setOpenDropdown(openDropdown === href ? null : href);
    };

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
                {navItems.map((item) => (
                    <div key={item.href}>
                        {item.children ? (
                            // Jika ada sub-menu, buat tombol dropdown
                            <>
                                <button
                                    onClick={() => handleDropdownToggle(item.href)}
                                    className={`w-full flex items-center justify-between px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                                        pathname.startsWith(item.href) 
                                        ? 'bg-gray-900 text-white' 
                                        : 'hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <item.icon className="h-5 w-5 mr-3" />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${openDropdown === item.href ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === item.href && (
                                    <div className="pl-8 py-2">
                                        {item.children.map(child => {
                                            const isChildActive = pathname === child.href;
                                            return (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className={`flex items-center px-4 py-2 my-1 rounded-lg text-sm transition-colors ${
                                                        isChildActive 
                                                        ? 'bg-green-600 text-white' 
                                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                                    }`}
                                                >
                                                    <child.icon className="h-4 w-4 mr-3 font-bold" />
                                                    <span>{child.label}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            // Jika tidak ada sub-menu, buat link biasa
                            <Link
                                href={item.href}
                                className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                                    pathname === item.href 
                                    ? 'bg-green-600 text-white' 
                                    : 'hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <item.icon className="h-5 w-5 mr-3" />
                                <span>{item.label}</span>
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
            <div className="px-4 py-4 border-t border-gray-700">
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
                    <LogoutIcon className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
