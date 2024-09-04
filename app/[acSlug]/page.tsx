import { getAircraftBySlug, getChecklists } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Title } from '@/ui/title';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Aircraft({
  params,
}: {
  params: { acSlug: string };
}) {
  const aircraft = await getAircraftBySlug(params.acSlug);
  const checklists = await getChecklists(aircraft.id);

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <BackButton url="/" name="Home"></BackButton>
      <Title title={`${aircraft.name}`} />
      <ul>
        <li className="font-bold">
          <Link href={`${aircraft.slug}/training`}>&#9654; Start training</Link>
        </li>
      </ul>
      <br />
      List of memory items
      <ul>
        {checklists.map((cl) => (
          <li key={cl.id} className="font-bold">
            <Link href={`/${params.acSlug}/${cl.slug}`}>&#9654; {cl.name}</Link>
          </li>
        ))}
      </ul>
      <EndOfPage />
    </div>
  );
}
