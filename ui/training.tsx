'use client';
import { AircraftSelect, ChecklistSelect } from '@/db/schema';
import { useEffect, useRef, useState } from 'react';
import { RenderChecklist } from './render-checklist';
import { Title } from './title';
import { usePathname, useRouter } from 'next/navigation';
import { BackButton } from './back-button';
import ScrollAdvisor from './scroll-advisor';

// From: https://bost.ocks.org/mike/shuffle/
function shuffleArray<T>(arr: T[]) {
  let m = arr.length;
  let i: number;
  let t: T;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

export function Training({
  checklists,
  aircraft,
}: {
  checklists: ChecklistSelect[];
  aircraft: AircraftSelect;
}) {
  const shuffledChecklists = shuffleArray(checklists);

  return <TrainingInner checklists={shuffledChecklists} aircraft={aircraft} />;
}

function TrainingInner({
  checklists,
  aircraft,
}: {
  checklists: ChecklistSelect[];
  aircraft: AircraftSelect;
}) {
  const [idxState, setIdxState] = useState(0);
  const [showState, setShowState] = useState(false);
  const router = useRouter();
  const N = checklists.length;

  const next = () => {
    setShowState(false);
    if (idxState === N - 1) {
      router.push(`/${aircraft.slug}`);
    } else {
      setIdxState(idxState + 1);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <BackButton url={`/${aircraft.slug}`} name={aircraft.name}></BackButton>
        <span className="text-sm">
          {idxState + 1} / {N}
        </span>
      </div>
      <Title title={checklists[idxState].name} />
      <div className={showState ? '' : 'hidden'}>
        <RenderChecklist checklist={checklists[idxState].content!} />
      </div>
      <div className="flex justify-center my-10">
        <button
          type="submit"
          className={`text-center border-2 border-black p-2 cursor-pointer ${
            showState ? 'hidden' : ''
          }`}
          onClick={() => setShowState(true)}
        >
          Show
        </button>
        <button
          type="submit"
          className={`text-center border-2 border-black p-2 cursor-pointer ${
            showState ? '' : 'hidden'
          }`}
          onClick={next}
        >
          {idxState === N - 1 ? 'Done' : 'Next'}
        </button>
      </div>
      {showState && <ScrollAdvisor />}
    </>
  );
}
