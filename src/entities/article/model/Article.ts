export interface IArticleFromApi {
    id: number,
    title: string,
    description: string,
    publishedDate: string,
    url: string,
    fullUrl: string,
    titleImageUrl: string,
    categoryType: string
}

export interface IArticleFromSubmit extends IArticleFromApi {
    text: string,
}