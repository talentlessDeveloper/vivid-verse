import { deleteDoc } from 'firebase/firestore';

export const deleteDocApi = async (docRef: any) => {
  await deleteDoc(docRef);
};
