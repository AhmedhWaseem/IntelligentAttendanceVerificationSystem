import Link from 'next/link';

const IndexPage = () => {
  return (
    
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
      
      {/* Image inserted here */}
      <img src="/images/face-recognition.png" alt="Smart Attendy Logo" className="mb-4 w-1/4 h-auto" />
      <br></br>
      <Link href="/">
        <h1 className="text-4xl font-bold mb-8 cursor-pointer">Welcome to Smart Attendy</h1>
      </Link>
      <div className="flex space-x-4">
        <Link href="/register">
          <span className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full cursor-pointer">
            Register
          </span>
        </Link>
        <Link href="/verify">
          <span className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full cursor-pointer">
            Verify
          </span>
        </Link>
        <Link href="/dashboard">
          <span className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-full cursor-pointer">
            Admin Dashboard
          </span>
        </Link>
      </div>
 
    </div>
  );
};

export default IndexPage;
