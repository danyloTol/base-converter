import { useState, useEffect } from 'react';

const BinaryStream = () => {
  const [stream, setStream] = useState(
    '1010011001011101010110100101010010100101001010010100101010100100101010010100101001100101001010101010'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStream(prev => {
        const randomBit = Math.random() > 0.5 ? '1' : '0';
        return prev.slice(1) + randomBit;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/60 dark:bg-zinc-900/50 py-1.5 px-3 backdrop-blur-xs flex items-center shadow-xs">
      {/* Live Indicator */}
      <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-zinc-300 dark:border-zinc-800 select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          RAW BIT STREAM
        </span>
      </div>

      {/* Ticker Stream with fading mask on right and left */}
      <div className="relative w-full overflow-hidden ml-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="font-mono text-xs tracking-[0.25em] text-zinc-600 dark:text-zinc-400 whitespace-nowrap select-none font-medium">
          {stream}
        </div>
      </div>
    </div>
  );
};

export default BinaryStream;
