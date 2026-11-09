import { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';

interface OutputBoxProps {
  OutputPlaceholder: string;
  OutputValue: string;
  base?: number;
}

const OutputBox = ({ OutputPlaceholder, OutputValue, base }: OutputBoxProps) => {
  const [copied, setCopied] = useState(false);

  const isError = OutputValue === 'Error';
  const hasValue = OutputValue && OutputValue.length > 0 && !isError;

  const handleCopy = async () => {
    if (!hasValue) return;
    try {
      await navigator.clipboard.writeText(OutputValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = OutputValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getLengthLabel = () => {
    if (!hasValue) return null;
    const len = OutputValue.replace('.', '').length;
    if (base === 2) {
      return `${len} bit${len === 1 ? '' : 's'}`;
    }
    return `${len} digit${len === 1 ? '' : 's'}`;
  };

  return (
    <div
      className={`relative w-full min-h-[58px] flex items-center justify-between gap-3 font-mono py-3 px-4 rounded-xl border transition-all duration-200 ${
        isError
          ? 'border-rose-400 dark:border-rose-500/60 bg-rose-50/40 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300'
          : hasValue
          ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-xs'
          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-600'
      }`}
    >
      <div className="flex-1 overflow-x-auto overflow-y-hidden max-w-full">
        {isError ? (
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-base font-sans font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Invalid input for selected base</span>
          </div>
        ) : (
          <div
            className={`text-2xl sm:text-3xl font-medium tracking-wide break-all select-all ${
              !hasValue ? 'font-sans text-xl sm:text-2xl font-normal' : ''
            }`}
          >
            {hasValue ? OutputValue : OutputPlaceholder}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {hasValue && (
          <>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 select-none">
              {getLengthLabel()}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all duration-200 cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OutputBox;
