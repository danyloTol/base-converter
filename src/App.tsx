import { useState } from 'react';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import DropDownList, { type DropDownOption } from './components/DropDownList';
import Modal from './components/Modal';
import BinaryStream from './components/BinaryStream';
import { ThemeToggle } from './utils/ThemeToggle';
import { ConversionLogic } from './utils/ConversionLogic';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, ArrowUpDown, Copy, Check, ExternalLink, Binary } from 'lucide-react';

const numeralSystems: DropDownOption[] = [
  { label: 'Binary', value: 2 },
  { label: 'Octal', value: 8 },
  { label: 'Decimal', value: 10 },
  { label: 'Hexadecimal', value: 16 },
];

const baseHints: Record<number, { name: string; allowed: string; samples: string[] }> = {
  2: { name: 'Binary', allowed: '0, 1', samples: ['1010', '1100100', '11111111'] },
  8: { name: 'Octal', allowed: '0 - 7', samples: ['12', '144', '377'] },
  10: { name: 'Decimal', allowed: '0 - 9', samples: ['42', '100', '255', '1024'] },
  16: { name: 'Hexadecimal', allowed: '0 - 9, A - F', samples: ['2A', '64', 'FF', '3E8'] },
};

function isValidForBase(val: string, base: number): boolean {
  const clean = val.trim().replace(',', '.');
  if (!clean) return true;
  const parts = clean.split('.');
  if (parts.length > 2) return false;
  const raw = (parts[0] + (parts[1] || '')).toLowerCase();
  if (!raw) return true;
  if (base === 2) return /^[01]+$/.test(raw);
  if (base === 8) return /^[0-7]+$/.test(raw);
  if (base === 10) return /^[0-9]+$/.test(raw);
  if (base === 16) return /^[0-9a-f]+$/.test(raw);
  return false;
}

function App() {
  const [fromBase, setFromBase] = useState<number>(10);
  const [toBase, setToBase] = useState<number>(2);
  const [numberToConvert, setNumberToConvert] = useState<string>('42');
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const currentYear = new Date().getFullYear();
  const isInputValid = isValidForBase(numberToConvert, fromBase);
  const outputResult = isInputValid ? ConversionLogic(numberToConvert, fromBase, toBase) : 'Error';

  const handleSwap = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    if (outputResult && outputResult !== 'Error') {
      setNumberToConvert(outputResult);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('tolochkodanylo.dev@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Top Navigation */}
      <header className="w-full border-b border-zinc-200/10 dark:border-zinc-850 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-500/20">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                  BaseConverter
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
                Numeral System Calculator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsModalOpened(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-xs"
            >
              <Mail className="w-4 h-4 text-zinc-500" />
              <span className="hidden sm:inline">Feedback</span>
            </button>

            <a
              href="https://github.com/danyloTol/base-converter"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-xs"
              title="GitHub Repository"
            >
              <FaGithub className="w-4 h-4" />
            </a>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col gap-8">
        {/* Stream Banner */}
        <BinaryStream />

        {/* Hero Title */}
        <div className="text-center space-y-2 pt-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Convert Between Radix Bases
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Real-time conversion between Binary, Octal, Decimal, and Hexadecimal numbers with floating point support.
          </p>
        </div>

        {/* Converter Workspace */}
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
          {/* Card: FROM */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm shadow-zinc-200/50 dark:shadow-none space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  From
                </span>
                <DropDownList
                  listItems={numeralSystems}
                  selectedValue={fromBase}
                  onSelect={value => setFromBase(value)}
                />
              </div>

              {/* Quick Pills */}
              <div className="flex items-center gap-1.5">
                {numeralSystems.map(system => (
                  <button
                    key={system.value}
                    type="button"
                    onClick={() => setFromBase(system.value)}
                    className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                      fromBase === system.value
                        ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {system.label.slice(0, 3).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Component */}
            <InputBox
              InputPlaceholder={`Enter ${baseHints[fromBase]?.name || ''} value...`}
              value={numberToConvert}
              onChange={setNumberToConvert}
              isInvalid={!isInputValid}
            />

            {/* Helper info & samples */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="text-zinc-500 dark:text-zinc-400">
                {!isInputValid ? (
                  <span className="text-rose-500 dark:text-rose-400 font-medium">
                    Allowed characters for {baseHints[fromBase]?.name}: {baseHints[fromBase]?.allowed}
                  </span>
                ) : (
                  <span>
                    Allowed characters: <span className="font-mono">{baseHints[fromBase]?.allowed}</span>
                  </span>
                )}
              </div>

              {/* Sample test values */}
              <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
                <span>Try:</span>
                {baseHints[fromBase]?.samples.map(sample => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setNumberToConvert(sample)}
                    className="font-mono text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Swap Button Connector */}
          <div className="relative flex items-center justify-center py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <button
              type="button"
              onClick={handleSwap}
              className="relative group flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-750 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 cursor-pointer active:scale-95"
              title="Swap From and To bases"
            >
              <ArrowUpDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-300 group-hover:rotate-180" />
              <span className="text-xs font-semibold">Swap Bases</span>
            </button>
          </div>

          {/* Card: TO */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-sm shadow-zinc-200/50 dark:shadow-none space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  To
                </span>
                <DropDownList
                  listItems={numeralSystems}
                  selectedValue={toBase}
                  onSelect={value => setToBase(value)}
                />
              </div>

              {/* Quick Pills */}
              <div className="flex items-center gap-1.5">
                {numeralSystems.map(system => (
                  <button
                    key={system.value}
                    type="button"
                    onClick={() => setToBase(system.value)}
                    className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all cursor-pointer ${
                      toBase === system.value
                        ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {system.label.slice(0, 3).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Component */}
            <OutputBox
              OutputPlaceholder="Converted result will appear here..."
              OutputValue={outputResult}
              base={toBase}
            />
          </div>

          {/* All Bases Quick Overview Grid */}
          {numberToConvert && isInputValid && outputResult !== 'Error' && (
            <div className="mt-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2.5">
                Quick Radix Overview
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {numeralSystems.map(sys => {
                  const val = ConversionLogic(numberToConvert, fromBase, sys.value);
                  return (
                    <div
                      key={sys.value}
                      className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col gap-0.5"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        {sys.label} ({sys.value})
                      </span>
                      <span className="font-mono text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate select-all">
                        {val && val !== 'Error' ? val : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 py-6 px-4 sm:px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-700 dark:text-zinc-300">BaseConverter</span>
            <span>&bull;</span>
            <span>&copy; {currentYear} Danylo Tolochko. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/danyloTol/base-converter"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/danylo-tolochko-aa43b1417/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <FaLinkedin className="w-4 h-4 text-[#0a66c2]" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={() => setIsModalOpened(true)}
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Feedback</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Feedback Modal */}
      <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)} title="Feedback & Support">
        <div className="flex flex-col gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <p>
            Have suggestions, questions, or encountered an issue with BaseConverter? Reach out directly via email!
          </p>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between gap-2">
            <span className="font-mono text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 select-all">
              tolochkodanylo.dev@gmail.com
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              title="Copy email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpened(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href="mailto:tolochkodanylo.dev@gmail.com?subject=BaseConverter%20Feedback"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs cursor-pointer"
            >
              <span>Send Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
