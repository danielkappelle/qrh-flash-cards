import { getAircraft } from '@/actions/actions';
import { Title } from '@/ui/title';

export default async function Home() {
  const aircraft = await getAircraft();

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <Title title="Memory Items Trainer" />
      <p>Select aircraft:</p>
      <ul>
        {aircraft.map((ac) => (
          <li key={ac.id} className="font-bold">
            &#9654; {ac.name}
          </li>
        ))}
      </ul>

      <div className="border border-black mt-3 p-1 text-sm">
        <h2 className="font-bold">Note</h2>
        <p>
          This trainer can help to practice memory items using (digital) flash
          cards. Select the aircraft of choice to start training. Note that the
          memory items are based on the KLMFA QRH.
        </p>
      </div>
      <div className="border border-black mt-3 p-1 text-sm">
        <h2 className="font-bold">Caution</h2>
        <p>
          No guarantuees are made that the memory items are correct and
          up-to-date. Please check to make sure.
        </p>
      </div>
      <div className="border border-black mt-3 p-1 text-sm">
        <h2 className="font-bold">Credits</h2>
        <p>Created by Daniel Kappelle in 2024.</p>
      </div>
    </div>
  );
}
