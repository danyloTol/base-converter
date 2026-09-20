interface InputBoxProps {
    InputPlaceholder: string;
    value: string;
    onChange: (value: string) => void;
}

const InputBox = ({InputPlaceholder, value, onChange}: InputBoxProps) => {
    return (
        <>
            <input 
                type="text" 
                placeholder={InputPlaceholder}
                className="
                    border-2 border-[#7d7d7d] w-full text-2xl rounded-xl p-1 duration-300 dark:text-[#ffffff]
                    placeholder-[#7d7d7d]
                    focus:outline-none focus:border-[#000000] dark:focus:border-[#ffffff]"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    );
}

export default InputBox;