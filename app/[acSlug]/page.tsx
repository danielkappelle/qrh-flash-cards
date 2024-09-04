import { getAircraftBySlug, getChecklists } from '@/actions/actions';
import { ArrowLink } from '@/ui/arrow-link';
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
    <>
      <BackButton url="/" name="Home"></BackButton>
      <Title title={`${aircraft.name}`} />
      <ul>
        <li className="font-bold">
          <ArrowLink href={`${aircraft.slug}/training`} text="Start training" />
        </li>
      </ul>
      <br />
      List of memory items
      <ul>
        {checklists.map((cl) => (
          <li key={cl.id} className="font-bold">
            <ArrowLink href={`/${params.acSlug}/${cl.slug}`} text={cl.name} />
          </li>
        ))}
      </ul>
      <EndOfPage />
    </>
  );
}
