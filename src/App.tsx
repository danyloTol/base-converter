import InputBox from './components/InputBox';

function App() {
  return (
    <>
      <div className='w-screen h-screen'>
        <div className='w-full h-[30vh] grid grid-cols-2'>
          <div className='flex items-center justify-center'>
            <div className='w-[30vw]'>
              <InputBox InputPlaceholder='Input'/>
            </div>
          </div>
          
          <div></div>
        </div>
      </div>
    </>
  )
}

export default App
