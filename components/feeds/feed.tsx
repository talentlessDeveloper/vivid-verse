import { Feed } from '@/constant/validation/types';
import { auth } from '@/firebase/config';
import { convertDate } from '@/utils/convertDate';
import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BsBookmark, BsBookmarkFill, BsBookmarksFill } from 'react-icons/bs';
import SignInModal from '../comments/signInModal';
import { bookmarksFn } from '@/firebase/bookmark';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { feedCol } from '@/firebase/typedCollections';
import { toast } from 'react-toastify';

type FeedProp = {
  feed: Feed;
  // bookmarksFn: (documentId: string, userId: string) => Promise<void>;
  feeds: Feed[];
  setFeeds: Dispatch<SetStateAction<Feed[]>>;
};

const SingleFeed = ({ feed, setFeeds, feeds }: FeedProp) => {
  const [modal, setModal] = useState(false);
  const { currentUser } = auth;
  const handleBookMark = async () => {
    if (!currentUser) {
      setModal(true);
      return;
    }
    await bookmarksFn(feed.id, currentUser.uid, feeds, setFeeds);
  };

  const closeModal = () => setModal(false);
  const deleteFeed = async () => {
    console.log('delete');
    try {
      await deleteDoc(doc(feedCol, feed.id));
      toast.success('Feed Deleted SuccessFully');
      const newFeeds = feeds.filter((newFeed) => newFeed.id !== feed.id);
      setFeeds(newFeeds);
    } catch (error) {
      toast.error("Couldn't delete Feed");
    }
  };
  console.log(serverTimestamp());
  return (
    <>
      <div>
        <div className="shadow-md text-lg font-mono py-3 px-2 mt-2 space-y-2">
          <div>
            <Link
              href={`feed/${encodeURIComponent(feed.id)}`}
              // href={{
              //   pathname: '/feed/[id]',
              //   query: { slug: feed.id },
              // }}
            >
              <div className="w-full">
                {feed.imageUrl ? (
                  <Image
                    src={feed.imageUrl}
                    alt=""
                    className="w-full h-40 lg:h-[400px]  object-cover"
                    width="0"
                    height="0"
                    unoptimized
                  />
                ) : null}
              </div>
            </Link>
            <div className="flex-grow">
              <div className="flex gap-x-2 py-3">
                {feed.tags.map((tag, i) => (
                  <p
                    key={`p-${tag}-${i}`}
                    className="text-base text-blue-600 mt-2"
                  >
                    #{tag}
                  </p>
                ))}
              </div>
              <h2 className="font-semibold md:text-2xl mb-6">{feed.title}</h2>
              <div className="flex justify-between">
                <div className="flex gap-x-3">
                  <p className="text-sm lg:text-base">{feed.author.name}</p>
                  <p className="text-sm lg:text-base">
                    {convertDate(feed?.createdAt!)}
                  </p>
                </div>
                <div className="flex gap-x-3 pr-2 lg:pr-10">
                  {feed.author.id === currentUser?.uid ? (
                    <>
                      <Link href={`edit/${encodeURIComponent(feed.id)}`}>
                        <AiOutlineEdit />
                      </Link>
                      <button onClick={deleteFeed}>
                        <AiOutlineDelete />
                      </button>
                    </>
                  ) : null}
                  <button onClick={handleBookMark}>
                    <BsBookmark
                      className={
                        feed.bookMarkedBy?.includes(currentUser?.uid!)
                          ? 'fill-yellow-400'
                          : ''
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal ? <SignInModal onClose={closeModal} /> : null}
    </>
  );
};

export default SingleFeed;
