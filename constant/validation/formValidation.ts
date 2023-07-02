import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ILogin, ISignUp } from './types';

export const loginDefaultValue: ILogin = {
  email: '',
  password: '',
};

const loginSchema = yup.object({
  email: yup.string().email().required('Email is Required'),
  password: yup.string().min(6).max(12).required('Password is Required'),
});

export const loginResolver = yupResolver(loginSchema);

export const registerDefaultValues: ISignUp = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  username: '',
};

const registerSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  username: yup.string().required('username is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(6).max(12).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Please Confirm Your Password'),
});

export const registerResolver = yupResolver(registerSchema);

// export const feedDefaultValues: IcreateFeeds = {
//   content: '',
//   title: '',
//   image: null,
//   url: null,
// };

// export const feedsResolver = yupResolver(feedSchema);

// export const feedsResolver: Resolver<IcreateFeeds> = async (values) => {
//   if (values.image === null && values.url === null) {
//     throw new Error('Please select either an image or enter a URL');
//   }

//   return values;
// };

// const feedsSchema = yup.object({
//   content: yup.string().required('Content is required'),
//   title: yup.string().required('Title is required'),
//   image: yup
//     .mixed()
//     .nullable()
//     .test(
//       'exclusive-fields',
//       'Please select either an image or enter a URL',
//       function (value) {
//         const urlValue = this.parent.url;
//         return (
//           (value !== null && urlValue === null) ||
//           (value === null && urlValue !== null)
//         );
//       }
//     ),
//   url: yup.string().url('Invalid URL format').nullable(),
// });
