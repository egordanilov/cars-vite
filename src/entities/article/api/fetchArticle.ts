export interface IArticleData {
    title: string;
    publishedDate: string;
    titleImageUrl: string;
    text: string;
}

export const fetchArticle = async (fetchUrl: string): Promise<IArticleData> => {
    const response = await fetch(fetchUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const fetchedData = await response.json();

    // Validate the fetched data structure
    if (fetchedData && fetchedData.title && fetchedData.text) {
        return fetchedData;
    } else {
        throw new Error("Invalid data format from API");
    }
};