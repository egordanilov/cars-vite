import type {IArticleFromSubmit} from "../model/Article";

export const publishArticle = (data: IArticleFromSubmit)=> {
    // Retrieve the existing array from localStorage
    let storedData = localStorage.getItem('myDataArray');
    let dataArray = storedData ? JSON.parse(storedData) : [];

    // Add the new object to the array
    dataArray.push(data);

    // Store the updated array back in localStorage
    localStorage.setItem('myDataArray', JSON.stringify(dataArray));
}