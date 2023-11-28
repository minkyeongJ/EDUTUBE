'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Radio from '@/components/atom/Radio';
import useCheckDuplicateEmail from '@/queries/signUp/useCheckDuplicateEmail';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup.string().email('이메일 형식이 잘못되었습니다.').required('email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
      '8글자 이상 영문자, 숫자, 특수문자를 조합해서 입력하세요.',
    )
    .required('비밀번호를 입력해 주세요'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인이 필요합니다'),
});

type FormData = yup.InferType<typeof schema>;

const USER_TYPES = {
  USER: 'user',
  SELLER: 'seller',
} as { [key in string]: string };

const USER_TYPE = 'userType';

const SignUpIdPw = () => {
  const [userType, setUserType] = useState(USER_TYPES.USER);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const { mutate: mutateCheckEmail } = useCheckDuplicateEmail();

  const doCheckEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = getValues('email');

    mutateCheckEmail(email, {
      onSuccess: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error.message);
      },
    });
  };

  const handleUserType = (type: string) => {
    setUserType(type);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // 여기에 회원가입 로직을 구현하세요.
  };

  return (
    <>
      <div className="text-center">
        <p className="text-2xl">회원가입</p>
        <p>에듀튜브에서 당신의 꿈을 펼쳐보세요</p>
      </div>
      <div className="flex justify-center">
        <Radio value={USER_TYPES.USER} name={USER_TYPE} defaultChecked onClick={handleUserType}>
          일반 회원
        </Radio>
        <Radio value={USER_TYPES.SELLER} name={USER_TYPE} onClick={handleUserType}>
          강사 회원
        </Radio>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <label className="block text-sm font-medium text-gray-700 ">
          이메일
          <div className="flex items-center">
            <input
              type="text"
              placeholder="example@email.com"
              {...register('email', { required: true })}
              className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
            />
            <button
              type="button"
              className="min-w-fit  px-2 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none ml-3"
              onClick={doCheckEmail}
            >
              중복확인
            </button>
          </div>
          <p className="text-red-400 h-2">{errors.email?.message}</p>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          비밀번호
          <input
            type="password"
            placeholder="********"
            {...register('password', { required: true })}
            className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
          />
          <p className="text-red-400 h-2">{errors.password?.message}</p>
        </label>
        <label className="block text-sm font-medium text-gray-700">
          비밀번호 확인
          <input
            type="password"
            placeholder="********"
            {...register('confirmPassword', { required: true })}
            className="w-full px-5 py-3 border border-gray-400 rounded-lg outline-none focus:shadow-outline"
          />
          <p className="text-red-400 h-2">{errors.confirmPassword?.message}</p>
        </label>
        <button
          type="submit"
          className="w-full px-3 py-4 text-white bg-light-main rounded-md hover:bg-dark-main focus:outline-none"
        >
          다음
        </button>
      </form>
    </>
  );
};

export default SignUpIdPw;
