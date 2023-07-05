import { CreateFeed } from '@/constant/validation/types';
import React, { useEffect, useState } from 'react';
import CreateHeader from '../header/createHeader';
import PreviewFeed from './previewFeed';

import Loader from '../svg/loader';
import { useRouter } from 'next/router';
import { feedCol } from '@/firebase/typedCollections';
import { getDoc, doc } from 'firebase/firestore';
import EditFeedForm from './editFeedForm';

const EditFeed = () => {
  const [preview, setPreview] = useState(false);
  const [feed, setFeed] = useState<CreateFeed>({
    title: '',
    image: null,
    imageUrl: '',
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getPost = async () => {
      if (!id) {
        try {
          const feedRef = feedCol;
          const docId = id as string;
          const feedSnapShot = await getDoc(doc(feedRef, docId));
          if (feedSnapShot.exists()) {
            const feedData = feedSnapShot.data();
            setFeed(feedData);
            setContent(feedData.content);

            setLoading(false);
          }
        } catch (e: any) {
          setLoading(false);
          console.log(e.message);
        }
      }
    };
    getPost();
  }, [id]);

  if (loading || !id)
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader size="w-10 h-10" />
      </div>
    );

  return (
    <>
      <CreateHeader setPreview={setPreview} />
      <section>
        <div className="w-10/12 max-w-4xl mx-auto pb-24">
          {!feed ? (
            <h2 className="text-4xl">Wrong Link</h2>
          ) : (
            <>
              {preview ? (
                <PreviewFeed content={content} {...feed} />
              ) : (
                <EditFeedForm
                  setContent={setContent}
                  content={content}
                  feed={feed}
                  setFeed={setFeed}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default EditFeed;
