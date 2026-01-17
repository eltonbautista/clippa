import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <nav className="space-y-2">
        <Link href="/uploads" className="block">
          Uploads
        </Link>
        <Link href="/uploads/new" className="block">
          New Upload
        </Link>
        <Link href="/settings" className="block">
          Settings
        </Link>
      </nav>
    </aside>
  );
}