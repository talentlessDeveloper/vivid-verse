import { doc, getDoc, serverTimestamp, FieldValue } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Loader from '@/components/svg/loader';

import { useRouter } from 'next/router';

import FeedPage from '@/components/feeds/feedPage';
import { Feed, IComment, Reaction } from '@/constant/validation/types';
import { feedCol } from '@/firebase/typedCollections';

const Page = () => {
  const [feed, setFeed] = useState<Feed>({} as Feed);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<IComment[]>([]);

  // {
  //   title: "",
  //   tags: [],
  //   content: "",
  //   author: {
  //     name: "",
  //     id: ""
  //   },
  //   imageUrl: "",
  //   reactions: {
  //     eyes: 0,
  //     heart: 0,
  //     hooray: 0,
  //     thumbsUp: 0,
  //     rocket: 0,
  //   },
  //   createdAt: FieldValue.serverTimestamp()
  // }

  const [emojis, setEmojis] = useState<Reaction>({
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  });

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    const getPost = async () => {
      if (id) {
        try {
          const feedRef = feedCol;
          const docId = id as string;
          const feedSnapShot = await getDoc(doc(feedRef, docId));
          if (feedSnapShot.exists()) {
            const feedData = feedSnapShot.data();
            setFeed(feedData);
            if (feedData.comments) {
              setComments(feedData.comments);
            }

            if (feedData.reactions) {
              setEmojis(feedData.reactions);
            }
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
      {!feed || !id ? (
        <h2 className="text-4xl">Wrong Link</h2>
      ) : (
        <FeedPage
          feed={feed}
          comments={comments}
          emojis={emojis}
          id={id as string}
          setComments={setComments}
          setEmojis={setEmojis}
        />
      )}
    </>
  );
};

export default Page;
