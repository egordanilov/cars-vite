export const fetchArticle = (fullFetchUrl: string) => {
    fetch(fullFetchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // or response.text() if you expect a plain text response
        })

};