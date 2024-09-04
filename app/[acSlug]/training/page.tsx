import { getAircraftBySlug, getChecklists } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Training } from '@/ui/training';

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
      <BackButton url={`/${aircraft.slug}`} name={aircraft.name}></BackButton>
      <Training checklists={checklists} />
      <EndOfPage />
    </>
  );
}
