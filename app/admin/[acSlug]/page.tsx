import { getAircraftBySlug, getChecklists } from '@/actions/actions';
import { ArrowLink } from '@/ui/arrow-link';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Title } from '@/ui/title';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminAircraft({
  params,
}: {
  params: { acSlug: string };
}) {
  const aircraft = await getAircraftBySlug(params.acSlug);
  const checklists = await getChecklists(aircraft.id);

  return (
    <>
      <BackButton url="/admin" name="Admin"></BackButton>
      <Title title={`Admin: ${aircraft.name}`} />
      <ul>
        <li className="font-bold">
          <ArrowLink
            href={`/admin/${aircraft.slug}/new-checklist`}
            text="New memory items"
          />
        </li>
        {checklists.map((cl) => (
          <li key={cl.id} className="font-bold">
            <ArrowLink
              href={`/admin/${aircraft.slug}/${cl.slug}`}
              text={cl.name}
            />
          </li>
        ))}
      </ul>
      <EndOfPage />
    </>
  );
}
