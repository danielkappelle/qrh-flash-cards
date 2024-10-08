import { getAircraftBySlug, getChecklistBySlug } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { RenderChecklist } from '@/ui/render-checklist';
import ScrollAdvisor from '@/ui/scroll-advisor';
import { Title } from '@/ui/title';

export const dynamic = 'force-dynamic';

export default async function Checklist({
  params,
}: {
  params: { acSlug: string; clSlug: string };
}) {
  const aircraft = await getAircraftBySlug(params.acSlug);
  const checklist = await getChecklistBySlug(params.clSlug);

  return (
    <>
      <BackButton url={`/${aircraft.slug}`} name={aircraft.name}></BackButton>
      <Title title={`${checklist.name}`} />
      <RenderChecklist checklist={checklist.content!} />
      <ScrollAdvisor />
    </>
  );
}
