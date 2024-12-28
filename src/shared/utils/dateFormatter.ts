export const dateFormatter = (dateString: string) => {
    // Parse the input date string
    const date = new Date(dateString);

    // Extract day, month and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Format the date as DD.MM.YYYY
    return `${day}.${month}.${year}`;
}