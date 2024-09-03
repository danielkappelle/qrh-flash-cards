import { getAircraft } from '@/actions/actions';

export default async function Home() {
  const aircraft = await getAircraft();

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <h1 className="text-2xl mb-3">Select aircraft</h1>
      <ul className="indent-3">
        {aircraft.map((ac) => (
          <li key={ac.id}>{ac.name}</li>
        ))}
      </ul>
    </div>
  );
}
