'use client';
import { useCallback, useEffect, useState } from 'react';

export default function ScrollAdvisor() {
  const [showScroll, setShowScroll] = useState(false);

  const onScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 50) {
      setShowScroll(false);
    } else {
      setShowScroll(true);
    }
  }, []);

  useEffect(() => {
    const scrollBox = document.getElementById('scrollBox');
    //add eventlistener to window
    scrollBox!.addEventListener('scroll', onScroll, { passive: true });
    const scrollable = scrollBox!.scrollHeight > scrollBox!.clientHeight;
    setShowScroll(scrollable);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      scrollBox!.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {showScroll && (
        <div className="width-full bg-gray-300 font-bold text-center absolute bottom-0 left-0 right-0">
          ▼ Scroll down ▼
        </div>
      )}
    </>
  );
}
