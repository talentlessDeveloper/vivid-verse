import VerifiedAuthLayout from '@/components/shared/verifiedAuthLayout';
import Loader from '@/components/svg/loader';
import { CreateFeed, Feed } from '@/constant/validation/types';
import { db } from '@/firebase/config';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import SingleFeed from '@/components/feeds/feed';
import { feedCol } from '@/firebase/typedCollections';
import Link from 'next/link';

const Page: NextPageWithLayout = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeeds = async () => {
      setLoading(true);
      try {
        // const q = query(collection(db, 'cities'), where('capital', '==', true));

        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, ' => ', doc.data());
        // });
        const feedsRef = feedCol;
        const q = query(feedsRef, orderBy('createdAt', 'desc'));
        const feedsCollection = await getDocs(q);
        const feedsData = feedsCollection.docs.map((feed) => {
          return {
            ...feed.data(),
            id: feed.id,
          };
        });

        setFeeds(feedsData);
        setLoading(false);
      } catch (err: any) {
        console.error(err.message);
        alert(err.message);
      }
    };
    getFeeds();
  }, []);

  if (loading)
    return (
      <div className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader size="w-10 h-10" />
      </div>
    );

  return (
    <section>
      <div className="w-10/12 mx-auto">
        {feeds.length <= 0 ? (
          <div className="h-[90dvh] flex justify-center items-center">
            There are 0 feeds for you, you can{' '}
            <Link
              href="/create"
              className="inline-block ml-3 text-slate-50 px-6 py-1 bg-slate-800 hover:bg-slate-900 transition-all text-lg"
            >
              create one
            </Link>
          </div>
        ) : (
          <div>
            {feeds.map((feed) => {
              return (
                <SingleFeed
                  key={feed.id}
                  feed={feed}
                  setFeeds={setFeeds}
                  feeds={feeds}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <VerifiedAuthLayout>{page}</VerifiedAuthLayout>;
};

export default Page;

// export const getServerSideProps = async () => {
//   let feeds;
//   try {
//     const postsRef = collection(db, 'Feeds');
//     const q = query(postsRef, orderBy('createdAt', 'desc'));
//     const postsCollection = await getDocs(q);
//     feeds = await postsCollection.docs.map((post) => {
//       return {
//         ...post.data(),
//         id: post.id,
//       };
//     });
//   } catch (err: any) {
//     console.error(err.message);
//   }
//   return {
//     props: {
//       feeds,
//     },
//   };
// };
