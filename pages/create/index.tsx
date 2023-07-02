import CreateFeed from '@/components/feeds/createFeed';
import ProtectedRoute from '@/components/shared/protectedRoute';

const Page = () => {
  return (
    <ProtectedRoute>
      <CreateFeed />
    </ProtectedRoute>
  );
};

export default Page;

// const handleUrl = useCallback(
//   (e: ChangeEvent<HTMLInputElement>) => {
//     setError({
//       ...error,
//       image: '',
//     });
//     setFeed((prev) => ({
//       ...prev,
//       url: e.target.value,
//       image: null,
//     }));
//   },
//   [error]
// );

// const handleFile = useCallback(
//   (file: File) => {
//     setError({
//       ...error,
//       image: '',
//     });
//     const reader = new FileReader();
//     reader.onload = () => {
//       const url = reader.result;
//       setFeed((prev) => ({
//         ...prev,
//         image: url as null,
//         url: '',
//       }));
//     };
//     reader.readAsDataURL(file);
//   },
//   [error]
// );

// const handleSubmit = useCallback(
//   (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setError({
//       image: '',
//       content: '',
//       title: '',
//     });

//     const { url, image, title } = feed;
//     console.log(image);
//     if (!url && !image) {
//       setError((prev) => ({
//         ...prev,
//         image: 'Please ensure you select an image or choose a url',
//       }));
//       return;
//     }

//     if (!content) {
//       setError((prev) => ({
//         ...prev,
//         content: 'Please ensure content is not empty',
//       }));
//       return;
//     }
//     if (!title) {
//       setError((prev) => ({
//         ...prev,
//         content: 'Please ensure title is not empty',
//       }));
//       return;
//     }
//     const feedData = {
//       ...feed,
//       content,
//     };
//     console.log(feedData);
//   },
//   [content, feed]
// );
