interface OutputBoxProps {
    OutputPlaceholder: string;
    OutputValue: string;
}

const OutputBox = ({OutputPlaceholder, OutputValue}: OutputBoxProps) => {
    return (
        <>
            <div className="w-full border-b-2 border-black text-3xl">
                <h1 className={`${OutputValue.length != 0 ? 'text-black' : 'text-[#7d7d7d]'}`}>
                    {OutputValue.length != 0 ? OutputValue : OutputPlaceholder}
                </h1>
            </div>
        </>
    )
}

export default OutputBox;