import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';

function App() {
  return (
    <>
      <div className='w-screen h-screen'>
        <div className='w-full h-[30vh] grid grid-cols-2'>
          {/* Input Box */}
          <div className='flex items-center justify-center'>
            <div className='w-[30vw]'>
              <InputBox InputPlaceholder='Input'/>
            </div>
          </div>
          
          {/* Output Box */}
          <div className='flex items-center justify-center'>
            <div className='w-[30vw]'>
              <OutputBox OutputPlaceholder='Output' OutputValue=''/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
