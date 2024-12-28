import classnames from "./AddArticle.module.scss";
import {useRef, useState} from "react";
import {getCurrentDateTime} from "@/shared";
// @ts-ignore
import type {IArticleFromSubmit} from "@/entities";


export const AddArticle = ({closeModal}: {closeModal: () => void}) => {
    const [articleTitle, setArticleTitle] = useState<string>("");
    const [articleText, setArticleText] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

    const [successfullySaved, setSuccessfullySaved] = useState<boolean>(false);

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileUploaded = event.target.files?.[0];
        if (fileUploaded) {
            console.log('File uploaded:', fileUploaded.name);
            setSelectedFile(fileUploaded);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(undefined);
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(fileUploaded);
        }

        // Reset the input value so the same file can be selected again
        event.target.value = '';
    };

    const removeImageHandler = () => {
        setSelectedFile(null);
        setPreviewUrl(undefined);
    }

    function saveObject(data: IArticleFromSubmit) {
        // Retrieve the existing array from localStorage
        let storedData = localStorage.getItem('myDataArray');
        let dataArray = storedData ? JSON.parse(storedData) : [];

        // Add the new object to the array
        dataArray.push(data);

        // Store the updated array back in localStorage
        localStorage.setItem('myDataArray', JSON.stringify(dataArray));
    }

    const handleSubmit =  (title: string, text: string, titleImageUrl: string) => {
            const newArticle = {
                title: title,
                text: text,
                titleImageUrl: titleImageUrl,
                id: Math.floor(Math.random() * 1000000),
                description: "г. Петрозаводск, ул. Древлянка, д. 20",
                publishedDate: getCurrentDateTime(),
                url: "novosti-kompanii/20200",
                fullUrl: "https://www.autodoc.ru/novosti-kompanii/20200",
                categoryType: "Новости компании"
            }
            console.log(newArticle);
            saveObject(newArticle);
            setSuccessfullySaved(true);
    }

    const handleCloseOnSuccess = () => {
        setSuccessfullySaved(false);
        setArticleTitle("");
        setArticleText("");
        setSelectedFile(null);
        setPreviewUrl(undefined);
        closeModal();
    }

    return (
        <div className={classnames.article_wrapper}>
            {successfullySaved && (
                <>
                    <h1 className={classnames.heading}>Готово</h1>
                    <div className={classnames.success_image_and_title_wrapper}>
                        <div className={classnames.preview_image_wrapper}>
                            <img className={classnames.preview_image} src={previewUrl} alt="Selected File"
                                 style={{width: '200px', height: '107px'}}/>
                        </div>
                        <div className={classnames.success_article_title}>
                            {articleTitle}
                        </div>
                    </div>
                    <button className={classnames.publish_button} onClick={handleCloseOnSuccess}>Окей</button>
                </>


            )}

            {!successfullySaved && (
                <>
                    <h1 className={classnames.heading}>Добавить новость</h1>
                    <input type="text" name="title" className={classnames.input_title} placeholder="Заголовок"
                           value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)}/>
                    <textarea name="text" className={classnames.input_text_area} placeholder="Текст"
                              onChange={(e) => setArticleText(e.target.value)} value={articleText}/>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        style={{display: 'none'}}
                        name="article_image"
                        onChange={handleChange}
                    />
                    <button className={classnames.upload_button}
                            onClick={handleClick}>{previewUrl ? 'Заменить изображение' : 'Загрузить изображение'}</button>
                    {previewUrl && (
                        <div className={classnames.preview_image_wrapper}>
                            <img className={classnames.preview_image} src={previewUrl} alt="Selected File" />
                            <button className={classnames.remove_image_button}
                                    onClick={removeImageHandler}>&times;</button>
                        </div>
                    )}
                    <button className={classnames.publish_button}
                            disabled={!(articleTitle && articleText && selectedFile && previewUrl)}
                            onClick={(e) => handleSubmit(articleTitle, articleText, previewUrl || "")}>Опубликовать новость
                    </button>
                </>
            )}

        </div>
    )
}