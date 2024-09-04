import Link from 'next/link';

export function ArrowLink({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="active:bg-gray-400">
      &#9658; {text}
    </Link>
  );
}
