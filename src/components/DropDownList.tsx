import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ListProps {
    listItems: string[];
}

const DropDownList = ({listItems}: ListProps) => {
    const [isListOpened, setIsListOpened] = useState(false);
    const [userChoice,  setUserChoice] = useState<string>(listItems[0])

    return (
        <>
            <div className='flex flex-col w-full items-center'>
                <button 
                    className={`flex flex-row cursor-pointer duration-300 `} onClick={() => {setIsListOpened(!isListOpened)}}>
                        <ChevronDown className={`duration-300 ${(isListOpened ? 'rotate-180' : 'rotate-0')}`}/>
                        {userChoice}
                </button>
                {isListOpened && listItems.map((item, index) => (
                    <button className='cursor-pointer text-left' onClick={() => {
                        setUserChoice(item)
                        setIsListOpened(false)
                    }} key={index}>
                        {item}
                    </button>
                ))}
            </div>
        </>
    );
}

export default DropDownList;