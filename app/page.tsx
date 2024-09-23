import { getAircraft } from '@/actions/actions';
import { ArrowLink } from '@/ui/arrow-link';
import { EndOfPage } from '@/ui/end-of-page';
import { Note } from '@/ui/note';
import { Title } from '@/ui/title';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const aircraft = await getAircraft();

  return (
    <>
      <Title title="Memory Items Trainer" />
      <p>Select aircraft:</p>
      <ul>
        {aircraft.map((ac) => (
          <li key={ac.id} className="font-bold">
            <ArrowLink href={`/${ac.slug}`} text={ac.name} />
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
      <p className="text-center text-xs text-gray-500">
        v{process.env.version}
      </p>
    </>
  );
}
