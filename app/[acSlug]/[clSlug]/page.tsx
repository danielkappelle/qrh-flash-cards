import { getAircraftBySlug, getChecklistBySlug } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { RenderChecklist } from '@/ui/render-checklist';
import { Title } from '@/ui/title';

export default async function Checklist({
  params,
}: {
  params: { acSlug: string; clSlug: string };
}) {
  const aircraft = await getAircraftBySlug(params.acSlug);
  const checklist = await getChecklistBySlug(params.clSlug);

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <BackButton url={`/${aircraft.slug}`} name={aircraft.name}></BackButton>
      <Title title={`${checklist.name}`} />
      <RenderChecklist checklist={checklist.content!} />
    </div>
  );
}
