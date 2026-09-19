export const ConversionLogic = (value: string, fromBase: number, toBase: number): string => {
    const cleanValue = value.trim();
    if (!cleanValue) return "";

    try {
        let bigIntValue: bigint;

        if (fromBase === 10) {
            bigIntValue = BigInt(cleanValue);
        } else if (fromBase === 2) {
            bigIntValue = BigInt("0b" + cleanValue);
        } else if (fromBase === 8) {
            bigIntValue = BigInt("0o" + cleanValue);
        } else if (fromBase === 16) {
            bigIntValue = BigInt("0x" + cleanValue);
        } else {
            return "Помилка: система не підтримується";
        }

        return bigIntValue.toString(toBase).toUpperCase();

    } catch (error) {
        return "Error";
    }
}
