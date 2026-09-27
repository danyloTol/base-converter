export const ConversionLogic = (value: string, fromBase: number, toBase: number): string => {
    const cleanValue = value.trim().replace(",", ".");
    if (!cleanValue) return "";

    const parts = cleanValue.split(".");
    if (parts.length > 2) return "Error";

    const intPart = parts[0];
    const fracPart = parts[1] || "";

    let convertedInt = "";

    try {
        let bigIntValue: bigint;

        const safeIntPart = intPart === "" ? "0" : intPart;

        if (fromBase === 10) {
            bigIntValue = BigInt(safeIntPart);
        } else if (fromBase === 2) {
            bigIntValue = BigInt("0b" + safeIntPart);
        } else if (fromBase === 8) {
            bigIntValue = BigInt("0o" + safeIntPart);
        } else if (fromBase === 16) {
            bigIntValue = BigInt("0x" + safeIntPart);
        } else {
            return "Error";
        }

        convertedInt = bigIntValue.toString(toBase).toUpperCase();

    } catch (error) {
        return "Error";
    }

    if (!fracPart) return convertedInt;

    let decimalFraction = 0;

    for (let i = 0; i < fracPart.length; i++) {
        const digit = parseInt(fracPart[i], fromBase);
        
        if (isNaN(digit)) return "Error";

        decimalFraction += digit * Math.pow(fromBase, -(i + 1));
    }

    let convertedFrac = "";
    let limit = 10;

    while (decimalFraction > 0 && limit > 0) {
        decimalFraction *= toBase;
        
        const digit = Math.floor(decimalFraction);
        convertedFrac += digit.toString(toBase).toUpperCase();
        
        decimalFraction -= digit;
        limit--;
    }
    return convertedFrac ? `${convertedInt}.${convertedFrac}` : convertedInt;
}
