import Link from 'next/link';

export function BackButton({ name, url }: { name: string; url: string }) {
  return (
    <p className="text-sm mb-3">
      <Link href={url}>&#9664; {name}</Link>
    </p>
  );
}
