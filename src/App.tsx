import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';
import DropDownList from './components/DropDownList';

function App() {
  const baseList = ['Binary', 'Octal', 'Decimal', 'Hexadecimal']

  return (
    <>
      <div className='w-screen h-screen'>
        <div className='w-full h-[30vh] grid grid-cols-2'>
          {/* Input Box */}
          <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='w-[30vw]'>
              <InputBox InputPlaceholder='Input'/>
            </div>
            <div>
              <DropDownList listItems={baseList} />
            </div>
          </div>
          
          {/* Output Box */}
          <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='w-[30vw]'>
              <OutputBox OutputPlaceholder='Output' OutputValue=''/>
            </div>
            <div>
              <DropDownList listItems={baseList} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
