import { useState, useEffect } from 'react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className='flex flex-row items-center'>
      <input 
        type="checkbox" 
        id="theme-toggle" 
        className='peer sr-only' 
        checked={isDark} 
        onChange={() => setIsDark(!isDark)} 
      />
      
      <label 
        htmlFor="theme-toggle" 
        className="
          bg-[#393500] w-14 h-7 rounded-full cursor-pointer relative transition-colors duration-300
          peer-checked:bg-[#03001d]
          before:absolute before:content-[''] before:bg-[#ffd900] before:w-5 before:h-5 before:rounded-full before:m-1
          before:transition-transform before:duration-300
          peer-checked:before:translate-x-7 peer-checked:before:bg-[#b7b7b7]
        "
      ></label>
    </div>
  );
};