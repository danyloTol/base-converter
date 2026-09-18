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
                    border-b-2 border-black w-full text-3xl
                    placeholder-[#7d7d7d]
                    focus:outline-none "
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    );
}

export default InputBox;