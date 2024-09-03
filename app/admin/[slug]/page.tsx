import { getAircraftBySlug, getChecklists } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Title } from '@/ui/title';
import Link from 'next/link';

export default async function AdminAircraft({
  params,
}: {
  params: { slug: string };
}) {
  const aircraft = await getAircraftBySlug(params.slug);
  const checklists = await getChecklists(aircraft.id);

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <BackButton url="/admin" name="Admin"></BackButton>
      <Title title={`Admin: ${aircraft.name}`} />
      <ul>
        <li className="font-bold">
          <Link href={`/admin/${aircraft.slug}/new-checklist`}>
            &#9654; New memory items
          </Link>
        </li>
        {checklists.map((cl) => (
          <li key={cl.id} className="font-bold">
            &#9654; {cl.name}
          </li>
        ))}
      </ul>
      <EndOfPage />
    </div>
  );
}
