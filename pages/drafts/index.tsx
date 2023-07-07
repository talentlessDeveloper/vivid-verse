import DraftForm from '@/components/draft/draftForm';
import PreviewFeed from '@/components/feeds/previewFeed';
import CreateHeader from '@/components/header/createHeader';
import ProtectedRoute from '@/components/shared/protectedRoute';
import Loader from '@/components/svg/loader';
import { auth, db } from '@/firebase/config';
import { convertDate } from '@/utils/convertDate';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Page = () => {
  const [drafts, setDrafts] = useState<any>([]);
  const [feed, setFeed] = useState<any>({});
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getDrafts = async () => {
      setLoading(true);
      //   if(idx === 0){

      //   }
      try {
        const { currentUser } = auth;
        const draftsRef = collection(db, 'Drafts');
        const q = query(
          draftsRef,
          where('author.id', '==', `${currentUser?.uid}`)
        );
        const draftsCollection = await getDocs(q);
        const draftsData = await draftsCollection.docs.map((draft) => {
          return {
            ...draft.data(),
            id: draft.id,
          };
        });
        console.log(draftsData);

        setDrafts(draftsData);
        setFeed(draftsData[idx]);
        setLoading(false);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    getDrafts();
  }, [idx]);

  if (loading)
    return (
      <div className="flex  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader size="w-10 h-10" />
      </div>
    );

  return (
    <ProtectedRoute>
      {drafts.length <= 0 ? (
        <div className="flex flex-col gap-4 h-screen justify-center items-center">
          <p className="text-2xl lg:text-4xl">You have 0 drafts</p>
          <button
            className="px-4 py-2 text-lg text-slate-50 bg-slate-800 hover:bg-slate-950 transition-colors duration-300 "
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      ) : (
        <section>
          <CreateHeader setPreview={setPreview} />

          <div className="w-11/12 mx-auto flex flex-col md:flex-row items-start gap-4 justify-between py-4">
            <div className="w-1/5 lg:w-2/5">
              <div>
                {drafts.map((draft: any, i: number) => {
                  return (
                    <button key={draft.id} onClick={() => setIdx(i)}>
                      <div className="text-lg font-mono py-3 px-2 mt-2 space-y-2">
                        <h2 className="text-xs">{draft.title}</h2>
                        <div className="flex justify-between">
                          <p className="text-sm">
                            {convertDate(draft.createdAt)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-4/5 lg:w-3/5">
              <div>
                {preview ? (
                  <PreviewFeed content={feed.content} {...feed} />
                ) : (
                  <DraftForm
                    content={feed.content}
                    setFeed={setFeed}
                    {...feed}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </ProtectedRoute>
  );
};

export default Page;
