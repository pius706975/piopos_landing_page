'use client';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface TinyMCEEditorProps {
    value: string;
    onChange: (value: string) => void;
    apiKey?: string | undefined;
    height?: number;
}

const API_KEY = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

const TinyMCEEditor = ({
    value,
    onChange,
    apiKey = API_KEY,
    height = 500,
}: TinyMCEEditorProps) => {
    const editorRef = useRef<any>(null);

    return (
        <Editor
            apiKey={apiKey}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            value={value}
            onEditorChange={onChange}
            init={{
                height: height,
                menubar: false,
                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                ],
                toolbar:
                    'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
        />
    );
};

export default TinyMCEEditor;
