import Link from 'next/link';

export function BackButton({ name, url }: { name: string; url: string }) {
  return (
    <p className="text-sm mb-3">
      <Link href={url} className="active:bg-gray-400">
        &#9668; {name}
      </Link>
    </p>
  );
}
