import { CreateFeed } from '@/constant/validation/types';
import React, { useState } from 'react';
import CreateHeader from '../header/createHeader';
import PreviewFeed from './previewFeed';
import CreateFeedForm from './createFeedForm';

const CreateFeed = () => {
  const [preview, setPreview] = useState(false);
  const [feed, setFeed] = useState<CreateFeed>({
    title: '',
    image: null,
    imageUrl: '',
    tags: [],
  });
  const [content, setContent] = useState('');
  return (
    <>
      <CreateHeader setPreview={setPreview} />
      <section>
        <div className="w-10/12 max-w-4xl mx-auto pb-24">
          {preview ? (
            <PreviewFeed content={content} {...feed} />
          ) : (
            <CreateFeedForm
              setContent={setContent}
              content={content}
              feed={feed}
              setFeed={setFeed}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default CreateFeed;
