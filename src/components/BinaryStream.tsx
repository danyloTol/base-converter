import { useState, useEffect } from 'react';

const BinaryStream = () => {
    const [stream, setStream] = useState('100101001010101010100101001010101010100101001010101010');

    useEffect(() => {
        const interval = setInterval(() => {
            setStream(prev => {
                const randomBit = Math.random() > 0.5 ? '1' : '0';
                return prev.slice(1) + randomBit;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex flex-col items-center overflow-hidden whitespace-nowrap font-mono text-[#00b503] text-lg bg-[#000000] dark:bg-[#2c2c2c] py-1">
            {stream}
        </div>
    );
};

export default BinaryStream