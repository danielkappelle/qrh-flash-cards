import { getAircraft } from '@/actions/actions';
import { ChecklistLine } from '@/ui/checklist-line';
import { EndOfPage } from '@/ui/end-of-page';
import { Note } from '@/ui/note';
import { Title } from '@/ui/title';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const aircraft = await getAircraft();

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <Title title="Memory Items Trainer" />
      <p>Select aircraft:</p>
      <ul>
        {aircraft.map((ac) => (
          <li key={ac.id} className="font-bold">
            <Link href={`/${ac.slug}`}>&#9654; {ac.name}</Link>
          </li>
        ))}
      </ul>
      <Note
        type="Note"
        content="This trainer can help to practice memory items using (digital) flash
          cards. Select the aircraft of choice to start training. Note that the
          memory items are based on the KLMFA QRH."
      />
      <Note
        type="Caution"
        content="No guarantuees are made that the memory items are correct and
          up-to-date. Please check to make sure."
      />
      <Note type="Credits" content="Created by Daniel Kappelle in 2024." />
      <EndOfPage />
    </div>
  );
}
