import { getAircraftBySlug, getChecklists } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Title } from '@/ui/title';
import { Training } from '@/ui/training';
import Link from 'next/link';

export default async function Aircraft({
  params,
}: {
  params: { acSlug: string };
}) {
  const aircraft = await getAircraftBySlug(params.acSlug);
  const checklists = await getChecklists(aircraft.id);

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <BackButton url={`/${aircraft.slug}`} name={aircraft.name}></BackButton>
      <Training checklists={checklists} />
      <EndOfPage />
    </div>
  );
}
