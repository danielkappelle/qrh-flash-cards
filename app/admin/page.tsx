import { getAircraft } from '@/actions/actions';
import { ArrowLink } from '@/ui/arrow-link';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { LogoutButton } from '@/ui/logout-button';
import { Title } from '@/ui/title';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  const aircraft = await getAircraft();

  return (
    <>
      <BackButton url="/" name="Home"></BackButton>
      <Title title="Admin page" />
      <ul className="">
        <li className="font-bold">
          <ArrowLink href="admin/new-aircraft" text="New aircraft" />
        </li>
        {aircraft.map((ac) => (
          <li key={ac.id} className="font-bold">
            <ArrowLink href={`/admin/${ac.slug}`} text={ac.name} />
          </li>
        ))}
      </ul>
      <br />
      <ul>
        <li className="font-bold">
          <LogoutButton />
        </li>
      </ul>
      <EndOfPage />
    </>
  );
}
