import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ILogin, ISignUp } from './types';

interface FileWithSize {
  size: number;
  // other properties, if applicable
}

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

const updateProfileSchema = yup.object({
  firstName: yup.string().required('First Name cannot be empty'),
  lastName: yup.string().required('Last Name cannot be empty'),
});

export const updateProfileResolver = yupResolver(updateProfileSchema);
