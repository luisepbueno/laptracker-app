export function padZeroesToLeft(str: string | number, size: number): string {
    str = (typeof(str) === 'number') ? str.toString() : str;
    while(str.length < size) {
        str = '0' + str;
    }
    return str;
}
