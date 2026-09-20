interface OutputBoxProps {
    OutputPlaceholder: string;
    OutputValue: string;
}

const OutputBox = ({OutputPlaceholder, OutputValue}: OutputBoxProps) => {
    return (
        <>
            <div className={`w-full border-2 ${!OutputValue ? "border-[#7d7d7d]" : "border-[#000000] dark:border-[#ffffff]"} text-2xl rounded-xl p-1 duration-300`}>
                <h1 className={`${OutputValue.length != 0 ? 'text-[#000000] dark:text-[#ffffff]' : 'text-[#7d7d7d]'} break-all`}>
                    {OutputValue.length != 0 ? OutputValue : OutputPlaceholder}
                </h1>
            </div>
        </>
    )
}

export default OutputBox;