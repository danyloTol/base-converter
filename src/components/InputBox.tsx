interface InputBoxProps {
    InputPlaceholder: string;
}

const InputBox = ({InputPlaceholder}: InputBoxProps) => {
    return (
        <>
            <input 
                type="text" 
                placeholder={InputPlaceholder}
                className="
                    border-b-2 border-black w-full text-3xl
                    focus:outline-none "
            />
        </>
    );
}

export default InputBox;