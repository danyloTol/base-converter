export const ConversionLogic = (value: string, fromBase: number, toBase: number): string => {
    if (!value.trim()) return "";

    const decimalValue = parseInt(value, fromBase);

    if (isNaN(decimalValue)) {
        return "Error";
    }

    return decimalValue.toString(toBase).toUpperCase();
}
