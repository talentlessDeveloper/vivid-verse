import AccountLayout from '@/components/shared/accountLayout';
import VerifiedAuthLayout from '@/components/shared/verifiedAuthLayout';
import Loader from '@/components/svg/loader';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { updateProfile } from 'firebase/auth';
import { v4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '@/firebase/config';
import { toast } from 'react-toastify';
import { dataUrlToBlob } from '@/utils/convertUrltoBlob';

const Page = () => {
  const { user, loading, setUser } = useAuth();
  const [upload, setUpload] = useState(false);

  // const user = currentUser;

  const [defaultUser, setDefaultUser] = useState<{
    username: string;
    imageUrl: string;
  }>({
    username: '',
    imageUrl: '',
  });

  const [url, setUrl] = useState<string | ArrayBuffer | null>();
  const [error, setError] = useState({
    username: '',
    url: '',
  });

  const handleFileChange = (file: File) => {
    console.log(123);
    setError({
      ...error,
      url: '',
    });

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      setError({
        ...error,
        url: 'File size exceeds 5MB',
      });

      return;
      // handle the case where the file size is too large (e.g., show an error message)
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUrl(reader.result);
      setDefaultUser({
        ...defaultUser,
        imageUrl: '',
      });
      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  let displayName = user?.displayName;
  let image = user?.photoURL;
  useEffect(() => {
    if (displayName) {
      setDefaultUser({
        username: displayName!,
        imageUrl: image!,
      });
    }
  }, [displayName, image]);

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const avatar =
      'https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=612x612&w=0&k=20&c=nrJ6RZ8Ft4vHECnRjBGBK_9XJ7f_lsi3dJjj_uAlkT8=';
    let imageToUpdate = '';
    if (!defaultUser.username) {
      setError({
        ...error,
        username: 'Username cannot be empty',
      });
      return;
    }

    if (url) {
      setUpload(true);
      const fileName = `${user?.uid}-profile-${v4()}`;
      const imageRef = ref(storage, `profilePhotos/${fileName}`);
      await uploadBytesResumable(imageRef, dataUrlToBlob(url as string));
      const downloadUrl = await getDownloadURL(imageRef);
      setDefaultUser({
        ...defaultUser,
        imageUrl: downloadUrl,
      });
      imageToUpdate = downloadUrl;
    } else {
      imageToUpdate = avatar;
    }

    await updateProfile(user!, {
      displayName: defaultUser.username,
      photoURL: imageToUpdate,
    });

    setUser(user);
    setUpload(false);
    toast.success('profile updated successfully');
  };

  if (loading) {
    return (
      <div className="flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader size="w-10 h-10" />
      </div>
    );
  }

  return (
    <div>
      <form
        className="space-y-6 w-11/12 mx-auto lg:w-9/12 "
        onSubmit={handleUpdateProfile}
      >
        <div>
          <label htmlFor="firstName" className="text-sm font-bold">
            userName
          </label>
          <input
            type="text"
            id="username"
            value={defaultUser.username}
            onChange={(e) =>
              setDefaultUser({
                ...defaultUser,
                username: e.target.value,
              })
            }
            className="w-full block mt-1 px-3 py-3 outline outline-1 outline-gray-600 rounded-md"
          />
          {error.username ? (
            <p className="text-red-500 block mt-1">{error.username}</p>
          ) : null}
        </div>

        <div className="relative">
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files?.[0]);
              const file = e.target.files?.[0];
              if (file) {
                handleFileChange(file);
              }
            }}
            className="absolute opacity-0 h-0 w-0"
            accept="image/*"
            id="fileInput"
          />

          <label className="cursor-pointer py-2  " htmlFor="fileInput">
            <span className="text-sm font-bold">Profile Photo</span>
            <div className="border border-solid border-gray-600 mt-[2px]  flex justify-center items-center rounded-full w-10 h-10 lg:w-20 lg:h-20 ">
              <Image
                width="0"
                height="0"
                unoptimized
                className="w-10 h-10 lg:w-20 lg:h-20 rounded-full object-cover  "
                src={
                  defaultUser.imageUrl ? defaultUser.imageUrl : (url as string)
                }
                alt=""
              />{' '}
            </div>
          </label>

          {error.url && <p className="text-red-500 mt-1">{error.url}</p>}
        </div>

        <button
          className="bg-blue-500 mt-7 flex items-center justify-center text-white px-8 py-1 hover:bg-blue-900 duration-300 transition-colors"
          type="submit"
        >
          {upload ? <Loader size="w-5 h-5" /> : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default Page;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <VerifiedAuthLayout>
      <AccountLayout>{page}</AccountLayout>
    </VerifiedAuthLayout>
  );
};
