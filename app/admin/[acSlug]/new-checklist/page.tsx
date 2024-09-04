import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { NewChecklistForm } from '@/ui/new-checklist-form';
import { Title } from '@/ui/title';

export default function NewChecklistPage({
  params,
}: {
  params: { acSlug: string };
}) {
  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <BackButton name={params.acSlug} url={`/admin/${params.acSlug}`} />
      <Title title="New memory items" />
      <NewChecklistForm acSlug={params.acSlug} />
      <EndOfPage />
    </div>
  );
}
