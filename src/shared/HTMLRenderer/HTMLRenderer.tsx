import DOMPurify from 'dompurify';

// Define a type for the props
type HTMLRendererProps = {
    rawHTML: string;
};

// Define the component
export const HTMLRenderer: React.FC<HTMLRendererProps> = ({ rawHTML }) => {
    // Sanitize the raw HTML
    const sanitizedHTML = DOMPurify.sanitize(rawHTML, {FORBID_TAGS: ['a', 'img']});

    // Render the sanitized HTML
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};
