import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <div className="text-8xl font-black text-gray-100 mb-4">404</div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
