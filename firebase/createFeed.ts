import { CreateFeed } from '@/constant/validation/types';
import { auth, db } from './config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { PreviewFeedProps } from '@/components/feeds/previewFeed';

export const createFeed = async (feed: PreviewFeedProps) => {
  let imageUrl;

  if (feed.imageUrl) {
    imageUrl = feed.imageUrl;
  } else {
    imageUrl = feed.image;
  }
  const { currentUser } = auth;
  try {
    const collectionRef = collection(db, 'Feeds');
    const post = {
      title: feed.title,
      content: feed.content,
      author: {
        id: currentUser?.uid,
        name: currentUser?.displayName,
      },
      tags: feed.tags,
      createdAt: serverTimestamp(),
      imageUrl,
    };

    console.log(post);

    await addDoc(collectionRef, post);

    return { error: null };
  } catch (err: any) {
    return { error: err.message || 'An error occurred during feed creation.' };
  }
};
