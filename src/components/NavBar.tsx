import Link from 'next/link';

const NavBar = () => (
  <nav className="bg-gray-800 p-4 mb-6">
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white cursor-pointer">Smart Attendy</span>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <span className="text-white hover:text-gray-300 cursor-pointer">Home</span>
          </Link>
          <Link href="/dashboard">
            <span className="text-white hover:text-gray-300 cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/register">
            <span className="text-white hover:text-gray-300 cursor-pointer">Register</span>
          </Link>
          <Link href="/verify">
            <span className="text-white hover:text-gray-300 cursor-pointer">Verify</span>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);


export default NavBar;