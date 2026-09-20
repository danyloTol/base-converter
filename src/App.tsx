import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import DropDownList, { type DropDownOption } from './components/DropDownList';
import Modal from './components/Modal';
import { ConversionLogic } from './utils/ConversionLogic';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, FileText, Send } from 'lucide-react';

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
    <>
      <div className='w-5xl mx-auto min-h-screen flex flex-col'>
        <div className='w-full h-[30vh] grid grid-cols-2'>
          {/* Input Box */}
          <div className='flex flex-col h-max mt-10 gap-4 items-center justify-center'>
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
          <div className='flex flex-col h-max mt-10 gap-4 items-center justify-center'>
            <div className='w-[30vw]'>
              <OutputBox OutputPlaceholder='Output' OutputValue={ConversionLogic(numberToConvert, fromBase, toBase)}/>
            </div>
            <div>
              <DropDownList listItems={numeralSystems} onSelect={(value) => setToBase(value)} />
            </div>
          </div>
        </div>
        <footer className='w-full h-[15vh] py-5 px-10 mt-auto border-t-2 border-[#bcbcbc]'>
          <div className=' h-full grid grid-cols-[auto_auto_1fr_auto_auto] gap-10'>
            <h1 className='text-3xl h-full flex items-center'>BASE CONVERTER</h1>
            <div className='w-px h-full bg-[#bcbcbc]'></div>
            <div className='w-full h-full flex flex-col justify-center gap-2'>
              <div className='flex flex-row gap-5'>
                <a href="https://github.com/danyloTol/base-converter" 
                  className='flex flex-row gap-1 items-center duration-300 hover:text-[#414141]'>
                  <FaGithub size={20} />
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/danylo-tolochko-aa43b1417/" 
                  className='flex flex-row gap-1 items-center duration-300 hover:text-[#414141]'>
                  <FaLinkedin size={20} />
                  LinkedIn
                </a>
              </div>
              <div>
                <p>&copy; {currentYear} Danylo Tolochko. All rights reserved.</p>
              </div>
            </div>
            <div className='w-0.5 h-full bg-[#bcbcbc]'></div>
            <div className='h-full flex flex-col gap-2 justify-center'>
              <button 
                className='flex flex-row gap-1 items-center cursor-pointer duration-300 hover:text-[#414141]'
                onClick={() => setIsModalOpened(true)}>
                  <Mail size={20} />
                  Feedback
              </button>
              <a href=""
                className='flex flex-row gap-1 items-center duration-300 hover:text-[#414141]'>
                <FileText size={20} />
                Documentation
              </a>
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
                  className='w-max flex flex-row items-center gap-1 bg-[#000000] text-[#ffffff] px-2 py-1 ml-auto rounded-lg cursor-pointer
                                  duration-300 hover:bg-[#2f2f2f]'>
                  <Send size={20}/> 
                  Write
                </a>
              </div>
            </div>
        </Modal>
      </div>
    </>
  )
}

export default App
