'use client';
import { ChecklistSelect } from '@/db/schema';
import { useState } from 'react';
import { RenderChecklist } from './render-checklist';
import { Title } from './title';

function getRandom(N: number) {
  return Math.floor(Math.random() * N);
}

export function Training({ checklists }: { checklists: ChecklistSelect[] }) {
  const N = checklists.length;
  const [idxState, setIdxState] = useState(getRandom(N));
  const [showState, setShowState] = useState(false);

  const next = () => {
    setShowState(false);
    setIdxState(getRandom(N));
  };

  return (
    <>
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
          Next
        </button>
      </div>
    </>
  );
}
