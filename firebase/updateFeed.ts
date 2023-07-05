import { CreateFeed } from '@/constant/validation/types';
import { auth, db } from './config';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { feedCol } from './typedCollections';

export const updateFeed = async (feed: any, feedId: string) => {
  let imageUrl;

  if (feed.imageUrl) {
    imageUrl = feed.imageUrl;
  } else {
    imageUrl = feed.image;
  }

  try {
    const feedRef = doc(feedCol, feedId);
    const feedData = {
      ...feed,
      title: feed.title,
      content: feed.content,
      tags: feed.tags,
      updatedAt: serverTimestamp(),
      imageUrl,
    };

    console.log(feed);

    await updateDoc(feedRef, feedData);

    return { error: null };
  } catch (err: any) {
    return { error: err.message || 'An error occurred during feed creation.' };
  }
};
