import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-700">
          Desa Tlogowatu
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">Beranda</Link>
          <Link href="/data-desa" className="text-gray-600 hover:text-green-600 transition-colors">Data Desa</Link>
          <Link href="/berita" className="text-gray-600 hover:text-green-600 transition-colors">Berita</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;