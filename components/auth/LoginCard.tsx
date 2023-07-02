import { useForm } from 'react-hook-form';

import { ILogin } from '../../constant/validation/types';
import ControlledTextInput from '../shared/textInput/ControlledInput';
import {
  loginDefaultValue,
  loginResolver,
} from '../../constant/validation/formValidation';
import SignInWithGoogleButton from './signInWithGoogle';
import { useState } from 'react';
import { signIn } from '@/firebase/auth/signIn';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loader from '../svg/loader';

function LoginCard() {
  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: loginDefaultValue,
    resolver: loginResolver,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogin = async (values: ILogin) => {
    setLoading(true);
    const { error } = await signIn(values);
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
      <h2 className="text-center mt-20 mb-12 text-[2rem]">LoginCard Screen</h2>
      <form className="space-y-6">
        <ControlledTextInput<ILogin>
          control={control}
          name="email"
          type="email"
          label="Email"
          placeholder="Please enter your email"
        />
        <ControlledTextInput<ILogin>
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter Your Password"
        />
        {/* {error && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error}
          </p>
        )} */}
        <div className="space-y-2">
          <button
            className="bg-slate-950 hover:bg-slate-700 text-slate-100 text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={handleSubmit(onLogin)}
          >
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <Loader size="w-5 h-5" />
              </div>
            ) : (
              'Sign In'
            )}
          </button>
          <SignInWithGoogleButton />
        </div>
      </form>
    </section>
  );
}

export default LoginCard;
