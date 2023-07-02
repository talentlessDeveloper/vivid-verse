import { useForm } from 'react-hook-form';

import { ISignUp } from '@/constant/validation/types';
import ControlledTextInput from '../shared/textInput/ControlledInput';
import {
  registerDefaultValues,
  registerResolver,
} from '@/constant/validation/formValidation';
import SignInWithGoogleButton from './signInWithGoogle';
import { signIn } from '@/firebase/auth/signIn';
import { signUp } from '@/firebase/auth/signUp';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loader from '../svg/loader';

function RegisterCard() {
  const { control, handleSubmit } = useForm({
    defaultValues: registerDefaultValues,
    resolver: registerResolver,
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onRegister = async (values: ISignUp) => {
    setLoading(true);
    const { error } = await signUp(values);
    if (error) {
      console.log(error);
      toast.error(error);
      setLoading(false);
      return;
    }
    setLoading(false);
    toast.success('Sign Up Successful');
    router.push('/feeds');
  };
  return (
    <section className="font-dm">
      <h2 className="text-center my-10 text-3xl font-bold">Register Here</h2>
      <form className="space-y-6">
        <div className="flex gap-x-3 justify-between">
          <div className="w-1/2">
            <ControlledTextInput<ISignUp>
              label="FirstName"
              placeholder="Enter  firstName"
              name="firstName"
              type="text"
              control={control}
            />
          </div>
          <div className="w-1/2">
            {' '}
            <ControlledTextInput<ISignUp>
              label="LastName"
              placeholder="Enter  lastName"
              name="lastName"
              type="text"
              control={control}
            />
          </div>
        </div>
        <ControlledTextInput<ISignUp>
          name="username"
          type="text"
          placeholder="Enter Username"
          label="Username"
          control={control}
        />
        <ControlledTextInput<ISignUp>
          name="email"
          type="email"
          placeholder="Enter your Email"
          label="Email"
          control={control}
        />
        {/* <ControlledTextInput<ISignUp>
          control={control}
          name="role"
          label="You are joining as?"
          isSelect
          selectItems={[
            {
              label: 'Reader',
              value: 'reader',
            },
            {
              label: 'Writer',
              value: 'writer',
            },
          ]}
          placeholder="Reader"
        /> */}
        <ControlledTextInput<ISignUp>
          name="password"
          type="password"
          placeholder="Enter your Password"
          label="Password"
          control={control}
        />
        <ControlledTextInput<ISignUp>
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          control={control}
        />

        <div className="space-y-3">
          <button
            className="bg-slate-950 hover:bg-slate-700 text-slate-100 text-lg font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={handleSubmit(onRegister)}
          >
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <Loader size="w-5 h-5" />
              </div>
            ) : (
              'Register'
            )}
          </button>
          <SignInWithGoogleButton />
        </div>
      </form>
    </section>
  );
}

export default RegisterCard;
