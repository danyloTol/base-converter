import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import DropDownList, { type DropDownOption } from './components/DropDownList';
import Modal from './components/Modal';
import BinaryStream from './components/BinaryStream';
import { ThemeToggle } from './utils/ThemeToggle';
import { ConversionLogic } from './utils/ConversionLogic';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, FileText, Send, ChevronDown } from 'lucide-react';

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
  const [isModalOpened, setIsModalOpened] = useState(false);

  const currentYear = new Date().getFullYear();
  
  return (
    <div className='w-full min-h-screen dark:bg-[#3a3a3a] dark:text-[#ffffff]'>
      <div className='w-full max-w-[640px] mx-auto px-5 min-h-screen flex flex-col'>
        <div className='pb-10'>
          <BinaryStream />
        </div>
        <div className='w-full grid grid-rows-[auto_auto_auto] gap-5'>
          {/* Input Box */}
          <div className='grid gap-3 px-10 py-5 border-2 border-[#bcbcbc] rounded-2xl'>
            <div className='w-full'>
              <InputBox InputPlaceholder='Input' 
                value={numberToConvert} 
                onChange={(newValue) => setNumberToConvert(newValue)}/>
            </div>
            <div className='w-full'>
              <DropDownList listItems={numeralSystems} onSelect={(value) => setFromBase(value)} />
            </div>
          </div>

          <div className='dark:text-[#ffffff] col-span-full flex justify-center'>
            <ChevronDown size={50}></ChevronDown>
          </div>
          
          {/* Output Box */}
          <div className='grid gap-3 px-10 py-5 border-2 border-[#bcbcbc] rounded-2xl'>
            <div className='w-full'>
              <OutputBox OutputPlaceholder='Decimal' OutputValue={ConversionLogic(numberToConvert, fromBase, 10)}/>
            </div>
          </div>
          <div className='grid gap-3 px-10 py-5 border-2 border-[#bcbcbc] rounded-2xl'>
            <div className='w-full'>
              <OutputBox OutputPlaceholder='Binary' OutputValue={ConversionLogic(numberToConvert, fromBase, 2)}/>
            </div>
          </div>
          <div className='grid gap-3 px-10 py-5 border-2 border-[#bcbcbc] rounded-2xl'>
            <div className='w-full'>
              <OutputBox OutputPlaceholder='Octal' OutputValue={ConversionLogic(numberToConvert, fromBase, 8)}/>
            </div>
          </div>
          <div className='grid gap-3 px-10 py-5 border-2 border-[#bcbcbc] rounded-2xl'>
            <div className='w-full'>
              <OutputBox OutputPlaceholder='Hexadecimal' OutputValue={ConversionLogic(numberToConvert, fromBase, 16)}/>
            </div>
          </div>
        </div>
        <footer className='w-full py-5 mt-auto border-t-2 border-[#bcbcbc]'>
          <div className=' h-full grid gap-3'>
            <h1 className='text-5xl h-full flex items-center'>BASE CONVERTER</h1>
            <div>
                <p className='text-2xl'>&copy; {currentYear} Danylo Tolochko. All rights reserved.</p>
              </div>
            <div className='w-full h-full flex flex-col justify-center gap-2'>
              <div className='flex flex-row gap-5'>
                <a href="https://github.com/danyloTol/base-converter" 
                  className='flex flex-row text-2xl gap-1 items-center duration-300 hover:text-[#414141] dark:hover:text-[#acacac]'>
                  <FaGithub size={45} />
                </a>
                <a href="https://www.linkedin.com/in/danylo-tolochko-aa43b1417/" 
                  className='flex flex-row text-2xl gap-1 items-center duration-300 hover:text-[#414141] dark:hover:text-[#acacac]'>
                  <FaLinkedin size={45} />
                </a>
                <a href=""
                  className='flex flex-row text-2xl gap-1 items-center duration-300 hover:text-[#414141] dark:hover:text-[#acacac]'>
                  <FileText size={45} />
                </a>
              </div>
            </div>
            <div className='h-full flex flex-col gap-2 justify-center'>
              <button 
                className='flex flex-row text-2xl gap-1 items-center cursor-pointer duration-300 hover:text-[#414141] dark:hover:text-[#acacac]'
                onClick={() => setIsModalOpened(true)}>
                  <Mail size={40} />
                  Feedback
              </button>
              <ThemeToggle />
            </div>
          </div>
        </footer>
        <Modal 
          isOpen={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          title='Feedback'>
            <div className='w-full flex flex-col gap-4'>
              <p>tolochkodanylo.dev@gmail.com</p>
              <div className=''>
                <a 
                  href='mailto:tolochkodanylo.dev@gmail.com?subject=Feedback'
                  className='w-max flex flex-row items-center gap-2 bg-[#000000] dark:bg-[#2c2c2c] text-[#ffffff] text-xl px-2 py-1 ml-auto rounded-lg cursor-pointer
                                  duration-300 hover:bg-[#2f2f2f] dark:hover:bg-[#313131]'>
                  <Send size={25}/> 
                  Write
                </a>
              </div>
            </div>
        </Modal>
      </div>
    </div>
  )
}

export default App
