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
    const [userChoice, setUserChoice] = useState<DropDownOption>(listItems[0]);

    const handleSelect = (item: DropDownOption) => {
        setUserChoice(item);
        setIsListOpened(false);
        onSelect(item.value);
    };

    return (
        <>
            <div className='flex flex-col w-full items-center'>
                <button 
                    className={`flex flex-row cursor-pointer duration-300 `} onClick={() => {setIsListOpened(!isListOpened)}}>
                        <ChevronDown className={`duration-300 ${(isListOpened ? 'rotate-180' : 'rotate-0')}`}/>
                        {userChoice.label}
                </button>
                {isListOpened && listItems.map((item, index) => (
                    <button className='cursor-pointer text-left' onClick={() => {handleSelect(item)}} key={index}>
                        {item.label}
                    </button>
                ))}
            </div>
        </>
    );
}

export default DropDownList;