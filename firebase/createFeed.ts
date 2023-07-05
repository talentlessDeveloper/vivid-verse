import { PreviewFeedProps } from '@/components/feeds/previewFeed';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from './config';
import { feedCol } from './typedCollections';

export const createFeed = async (feed: PreviewFeedProps) => {
  let imageUrl;

  if (feed.imageUrl) {
    imageUrl = feed.imageUrl;
  } else {
    imageUrl = feed.image;
  }
  const { currentUser } = auth;
  try {
    const collectionRef = feedCol;
    const feedData = {
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

    console.log(feedData);

    await addDoc(collectionRef, feedData);

    return { error: null };
  } catch (err: any) {
    return { error: err.message || 'An error occurred during feed creation.' };
  }
};
