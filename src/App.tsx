import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import DropDownList, { type DropDownOption } from './components/DropDownList';
import { ConversionLogic } from './utils/ConversionLogic';
import { useState } from 'react';

const numeralSystems: DropDownOption[] = [
  { label: 'Binary', value: 2 },
  { label: 'Octal', value: 8 },
  { label: 'Decimal', value: 10 },
  { label: 'Hexadecimal', value: 16 },
];

function App() {
  
  const [fromBase, setFromBase] = useState<number>(2);
  const [toBase, setToBase] = useState<number>(2);
  const [numberToConvert, setNumberToConvert] = useState<string>("");
  
  return (
    <>
      <div className='w-screen h-screen'>
        <div className='w-full h-[30vh] grid grid-cols-2'>
          {/* Input Box */}
          <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='w-[30vw]'>
              <InputBox InputPlaceholder='Input' 
                value={numberToConvert} 
                onChange={(newValue) => setNumberToConvert(newValue)}/>
            </div>
            <div>
              <DropDownList listItems={numeralSystems} onSelect={(value) => setFromBase(value)} />
            </div>
          </div>
          
          {/* Output Box */}
          <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='w-[30vw]'>
              <OutputBox OutputPlaceholder='Output' OutputValue={ConversionLogic(numberToConvert, fromBase, toBase)}/>
            </div>
            <div>
              <DropDownList listItems={numeralSystems} onSelect={(value) => setToBase(value)} />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col items-center'>
        </div>
      </div>
    </>
  )
}

export default App
