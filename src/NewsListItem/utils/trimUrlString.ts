export function trimString(input: string) {
    // Use split to transform the string into an array using "/" as delimiter, and get the last element
    const parts = input.split('/');
    return parts[parts.length - 1];
}