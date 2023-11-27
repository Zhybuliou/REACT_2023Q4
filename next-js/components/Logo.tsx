import Link from 'next/link';
export default function Logo() {
  return (
    <div className="logo">
      <Link className="logo-link text-style" href="/page/1">
        Star Wars
      </Link>
    </div>
  );
}
