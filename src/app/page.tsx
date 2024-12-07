import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>こんな感じで書いていけばいいはず</h1>
        <div>
          <Link href="/me">マイページ</Link>
        </div>
        <div>
          <Link href="/quizzes">クイズページへ</Link>
        </div>
        <div>
          <Link href="/quizzes/1">クイズ1へ</Link>
        </div>
        <div>
          <Link href="/quizzes/2">
            クイズ2へ(この数字は適当にしているだけで、どんな数字でもマッチングする)
          </Link>
        </div>
        <div>
          <Link href="/login">ログインページへ</Link>
        </div>
        <div>
          <Link href="/logout">ログアウトページへ</Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        フッター
      </footer>
    </div>
  );
}
