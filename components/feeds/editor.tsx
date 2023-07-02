import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateFeed } from '@/constant/validation/types';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['code-block', 'emoji'],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

type EditorProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

import 'react-quill/dist/quill.snow.css';

export default function TinyEditor({ content, setContent }: EditorProps) {
  // const [content, setContent] = useState('');

  return (
    <>
      <QuillNoSSRWrapper
        value={content}
        modules={modules}
        onChange={setContent}
        theme="snow"
        className="min-h-[300px]"
      />
    </>
  );
}
