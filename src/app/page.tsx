import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] items-center justify-items-center p-8 sm:p-20 bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to the App</h1>
        <p className="text-gray-600 mt-2">Choose a page to get started</p>
      </header>

      <main className="flex flex-col items-center sm:items-start gap-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/search"
            className="block px-6 py-3 bg-blue-500 text-white text-center rounded shadow hover:bg-blue-600 transition"
          >
            検索
          </Link>
          <Link
            href="/me"
            className="block px-6 py-3 bg-green-500 text-white text-center rounded shadow hover:bg-green-600 transition"
          >
            マイページ
          </Link>
          <Link
            href="/quizsearch"
            className="block px-6 py-3 bg-purple-500 text-white text-center rounded shadow hover:bg-purple-600 transition"
          >
            クイズページへ
          </Link>
          <Link
            href="/login"
            className="block px-6 py-3 bg-orange-500 text-white text-center rounded shadow hover:bg-orange-600 transition"
          >
            ログインページへ
          </Link>
        </div>
      </main>

      <footer className="text-gray-500 text-sm mt-8">
        &copy; 2024 Your App Name. All rights reserved.
      </footer>
    </div>
  );
}
