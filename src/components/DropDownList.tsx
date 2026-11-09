import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropDownOption {
  label: string;
  value: number;
}

interface ListProps {
  listItems: DropDownOption[];
  selectedValue?: number;
  onSelect: (selectedValue: number) => void;
  defaultIndex?: number;
}

const DropDownList = ({ listItems, selectedValue, onSelect, defaultIndex = 0 }: ListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = 
    selectedValue !== undefined
      ? listItems.find(item => item.value === selectedValue) || listItems[0]
      : listItems[defaultIndex] || listItems[0];

  const handleSelect = (item: DropDownOption) => {
    onSelect(item.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs hover:bg-zinc-50 dark:hover:bg-zinc-750 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex items-center gap-2">
          <span>{currentOption.label}</span>
          <span className="px-1.5 py-0.5 text-[11px] font-mono font-bold rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
            {currentOption.value}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-1 z-30 transition-all duration-150 origin-top-left animate-in fade-in zoom-in-95">
          <div className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Select Radix
          </div>
          {listItems.map(item => {
            const isSelected = item.value === currentOption.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(item)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors cursor-pointer rounded-lg mx-1 ${
                  isSelected
                    ? 'bg-zinc-100 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
                style={{ width: 'calc(100% - 0.5rem)' }}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    Base {item.value}
                  </span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-indigo-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownList;
