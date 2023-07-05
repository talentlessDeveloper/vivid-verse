import SingleFeed from '@/components/feeds/feed';
import VerifiedAuthLayout from '@/components/shared/verifiedAuthLayout';
import Loader from '@/components/svg/loader';
import { Feed } from '@/constant/validation/types';
import { auth } from '@/firebase/config';
import { feedCol } from '@/firebase/typedCollections';
import { getDocs, query, where } from 'firebase/firestore';
import React, { ReactElement, useEffect, useState } from 'react';

const Page = () => {
  const [bookMarkedFeeds, setBookMarkedFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBookMarkedFeed = async () => {
      try {
        setLoading(true);
        const { currentUser } = auth;
        const q = query(
          feedCol,
          where('bookMarkedBy', 'array-contains', currentUser?.uid)
        );
        const feeds = await getDocs(q);
        const data = await feeds.docs.map((feed) => {
          return {
            ...feed.data(),
            id: feed.id,
          };
        });
        console.log(data);
        setLoading(false);
        setBookMarkedFeeds(data);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getBookMarkedFeed();
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
        {!bookMarkedFeeds.length ? (
          <div>You have {bookMarkedFeeds.length} Posts</div>
        ) : (
          <div>
            {bookMarkedFeeds.map((feed) => {
              return (
                <SingleFeed
                  key={feed.id}
                  feed={feed}
                  feeds={bookMarkedFeeds}
                  setFeeds={setBookMarkedFeeds}
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
