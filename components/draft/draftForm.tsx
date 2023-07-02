import React, { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { PreviewFeedProps } from '../feeds/previewFeed';
import { toast } from 'react-toastify';
import { createDraft } from '@/firebase/createDraft';
import { useRouter } from 'next/router';
import { auth, storage } from '@/firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { createFeed } from '@/firebase/createFeed';
import TagInput from '../feeds/tagInputField';
import TinyEditor from '../feeds/editor';
import Loader from '../svg/loader';
import { CreateFeed } from '@/constant/validation/types';
import { updateDraft } from '@/firebase/updateDraft';
import { deleteDocApi } from '@/utils/deleteDocApi';
import { deleteDoc } from 'firebase/firestore';
import { deleteDraft } from '@/firebase/deleteDraft';

type DraftProps = PreviewFeedProps & { setFeed: Dispatch<any> };

const DraftForm = ({ content, setFeed, ...feed }: any) => {
  const [draftContent, setContent] = useState(content);
  const [error, setError] = useState({
    image: '',
    content: '',
    title: '',
    tags: '',
  });
  const [loading, setLoading] = useState({
    feed: false,
    draft: false,
  });

  const router = useRouter();

  const handleFile = async (file: File) => {
    const { currentUser } = auth;
    setError({
      ...error,
      image: '',
    });
    // const reader = new FileReader();
    const fileName = `${currentUser?.uid}-${file.name}-${uuidv4()}`;
    const imageRef = ref(storage, `coverImages/${fileName}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    setFeed((prev: any) => ({
      ...prev,
      image: url,
      url: '',
    }));
    // reader.onload = () => {
    //   const url = reader.result;
    // };
    // reader.readAsDataURL(file);
  };

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setError({
      ...error,
      image: '',
    });
    setFeed((prev: any) => ({
      ...prev,
      url: e.target.value,
      image: null,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError({
      image: '',
      content: '',
      title: '',
      tags: '',
    });

    const { imageUrl, image, title, tags } = feed;

    if (!imageUrl && !image) {
      setError((prev) => ({
        ...prev,
        image: 'Please ensure you select an image or choose a imageUrl',
      }));
      return;
    }

    if (!content) {
      setError((prev) => ({
        ...prev,
        content: 'Please ensure content is not empty',
      }));
      return;
    }
    if (!title) {
      setError((prev) => ({
        ...prev,
        content: 'Please ensure title is not empty',
      }));
      return;
    }

    if (!tags.length) {
      setError((prev) => ({
        ...prev,
        tags: 'Tags Field cannot be empty',
      }));
      return;
    }
    setLoading({
      ...loading,
      feed: true,
    });

    const feedData = {
      ...feed,
      content,
    };

    const { error } = await createFeed(feedData);
    await deleteDraft(feed.id);
    if (error) {
      toast.error(error);
      setLoading({
        ...loading,
        feed: false,
      });
      return;
    }
    toast.success('Feed created successfully');
    setLoading({
      ...loading,
      feed: false,
    });
    router.push('/feeds');
  };

  const handleDraft = async () => {
    setLoading({
      ...loading,
      draft: true,
    });
    const feedData = {
      ...feed,
      content,
    };
    const { error } = await updateDraft(feedData, feed.id);
    if (error) {
      toast.error(error);
      setLoading({
        ...loading,
        draft: false,
      });
      return;
    }
    toast.success('Saved successfully');
    setLoading({
      ...loading,
      draft: false,
    });
    // router.push('/feeds');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full rounded-md min-h-[480px] shadow-sm border border-solid border-slate-300 bg-white py-8 px-4">
        <div className="relative">
          <input
            type="file"
            className="absolute opacity-0 h-0 w-0"
            id="fileInput"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFile(file);
              }
            }}
          />
          <label
            className="cursor-pointer mr-8 bg-gray-600 hover:bg-slate-900 text-white py-2 px-4 rounded"
            htmlFor="fileInput"
          >
            Upload File
          </label>
          {feed.image ? (
            <span className="text-green-500">Image Uploaded</span>
          ) : null}
          {error.image && (
            <span className="text-red-500 block mt-1">{error.image}</span>
          )}
        </div>
        <div className="mt-6">
          <label htmlFor="unsplash" className="block text-slate-900 mb-1">
            Image From Unsplash
          </label>
          <div className="flex gap-x-3">
            <input
              type="text"
              id="unsplash"
              className="text-slate-900 w-11/12 bg-transparent border border-solid border-gray-700 px-3 py-4 rounded-md "
              value={feed.imageUrl}
              onChange={handleUrl}
            />
            {/* {error.url && (
                    <span className="text-red-500 block">
                      {error.url}
                    </span>
                  )} */}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Add Title Here"
            className="text-2xl md:text-4xl text-slate-900 w-11/12 bg-transparent border border-solid border-gray-700 px-3 py-4 rounded-md "
            value={feed.title}
            onChange={(e) => {
              setError({
                ...error,
                title: '',
              });
              setFeed({
                ...feed,
                title: e.target.value,
              });
            }}
          />
          {error.title && (
            <span className="text-red-500 block">{error.title}</span>
          )}
        </div>
        <TagInput
          tags={feed.tags}
          setFeed={setFeed}
          error={error.tags}
          setError={setError}
        />
        <div className="mt-8">
          <label htmlFor="content" className="sr-only">
            Content
          </label>
          {/* <textarea
                    id="content"
                    placeholder="Add Content Here"
                    className="focus:outline-none focus:ring-0 text-lg text-slate-900 w-11/12 bg-transparent min-h-[150px] "
                    value={feed.content}
                    onChange={(e) => {
                      setError({
                        ...error,
                        content: '',
                      });
                      setFeed({
                        ...feed,
                        content: e.target.value,
                      });
                    }}
                  /> */}

          <TinyEditor content={draftContent} setContent={setContent} />

          {error.content && (
            <span className="text-red-500 block">{error.content}</span>
          )}
        </div>
      </div>
      <div className="mt-8 flex gap-x-3">
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-4 rounded py-2 "
        >
          {loading.feed ? (
            <div>
              <Loader size="w-5 h-5" />
            </div>
          ) : (
            'Publish'
          )}
        </button>
        <button
          type="button"
          className="cursor-pointer bg-gray-600 hover:bg-slate-900 text-white py-2 px-4 rounded "
          onClick={handleDraft}
        >
          {loading.draft ? (
            <div>
              <Loader size="w-5 h-5" />
            </div>
          ) : (
            'Save'
          )}
        </button>
      </div>
    </form>
  );
};

export default DraftForm;
