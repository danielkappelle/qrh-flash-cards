import { getAircraftBySlug, getChecklistBySlug } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { NewChecklistForm } from '@/ui/new-checklist-form';
import { Title } from '@/ui/title';

export const dynamic = 'force-dynamic';

export default async function EditChecklistPage({
  params,
}: {
  params: { acSlug: string; clSlug: string };
}) {
  const aircraft = await getAircraftBySlug(params.acSlug);
  const checklist = await getChecklistBySlug(params.clSlug);

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <BackButton name={params.acSlug} url={`/admin/${params.acSlug}`} />
      <Title title="Edit memory items" />
      <NewChecklistForm acSlug={params.acSlug} checklist={checklist} />
      <EndOfPage />
    </div>
  );
}
