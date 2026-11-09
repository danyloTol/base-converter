import { X } from 'lucide-react';

interface InputBoxProps {
  InputPlaceholder: string;
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
}

const InputBox = ({ InputPlaceholder, value, onChange, isInvalid = false }: InputBoxProps) => {
  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        placeholder={InputPlaceholder}
        spellCheck={false}
        autoComplete="off"
        className={`w-full font-mono text-2xl sm:text-3xl font-medium py-3 px-4 pr-12 rounded-xl transition-all duration-200 border outline-none ${
          isInvalid
            ? 'border-rose-400 dark:border-rose-500/70 bg-rose-50/30 dark:bg-rose-950/10 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500'
            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-600 focus:bg-white dark:focus:bg-zinc-900 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-3 focus:ring-indigo-500/15'
        }`}
        value={value}
        onChange={e => onChange(e.target.value)}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Clear input"
          aria-label="Clear input"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default InputBox;
