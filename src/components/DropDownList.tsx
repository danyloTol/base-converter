import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropDownOption {
    label: string;
    value: number;
}

interface ListProps {
    listItems: DropDownOption[];
    onSelect: (selectedValue: number) => void;
    defaultIndex?: number;
}

const DropDownList = ({listItems, onSelect, defaultIndex = 0}: ListProps) => {
    const [isListOpened, setIsListOpened] = useState(false);
    const [userChoice, setUserChoice] = useState<DropDownOption>(listItems[defaultIndex]);

    const handleSelect = (item: DropDownOption) => {
        setUserChoice(item);
        setIsListOpened(false);
        onSelect(item.value);
    };

    return (
        <div className='relative flex flex-col w-full items-center'>
            <button 
                className={`flex flex-row bg-[#000000] dark:bg-[#2c2c2c] text-[#ffffff] px-3 py-1 ml-auto rounded-full cursor-pointer
                              duration-300 hover:bg-[#2f2f2f]`} 
                onClick={() => {setIsListOpened(!isListOpened)}}>
                    <ChevronDown className={`duration-300 ${(isListOpened ? 'rotate-180' : 'rotate-0')}`}/>
                    {userChoice.label}
            </button>
            <div 
                className={`absolute top-full mt-2 left-0 w-max flex flex-col bg-white dark:bg-[#3d3d3d] shadow-lg rounded-xl overflow-hidden border border-[#bcbcbc] dark:border-[#898989] z-10 transition-all duration-300 ease-out origin-top
                ${isListOpened ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2.5 invisible'}`}
            >
                {listItems.map((item) => (
                    <button 
                        className='cursor-pointer text-left px-4 py-2 hover:bg-[#dddddd] dark:hover:bg-[#5b5b5b] transition-colors dark:text-[#ffffff]' 
                        onClick={() => handleSelect(item)} 
                        key={item.value}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DropDownList;