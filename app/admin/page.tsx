import { getAircraft } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Title } from '@/ui/title';
import Link from 'next/link';

export default async function Admin() {
  const aircraft = await getAircraft();

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <BackButton url="/" name="Home"></BackButton>
      <Title title="Admin page" />
      <ul className="">
        <li className="font-bold">
          <Link href="admin/new-aircraft">&#9654; New aircraft</Link>
        </li>
        {aircraft.map((ac) => (
          <li key={ac.id} className="font-bold">
            &#9654; {ac.name}
          </li>
        ))}
      </ul>
      <EndOfPage />
    </div>
  );
}
