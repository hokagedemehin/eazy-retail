// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseUrl from '@/utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = BaseUrl();

type postSignInData = {
  email: string;
  password: string;
};

type postSignUpData = {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  password: string;
  password_confirmation: string;
};

// type getUserData = {
//   pk: number;
//   email: string;
//   first_name: string;
//   last_name: string;
//   phone: string;
//   date_joined: string;
// }

const postSignInFetcher = async (url: string, data: postSignInData) => {
  const response = await axios.post(url, data);
  return response.data;
};

const postSignUpFetcher = async (url: string, data: postSignUpData) => {
  const response = await axios.post(url, data);
  return response.data;
};

const postVerifyEmailFetcher = async (url: string, data: { token: string }) => {
  const response = await axios.post(url, data);
  return response.data;
};

export const useSignIn = () => {
  // const queryClient = useQueryClient();
  // const { mutate, isLoading } = useMutation(postFetcher, {
  //   onSuccess: async (data) => {
  //     await AsyncStorage.setItem('token', data.token);
  //     await AsyncStorage.setItem('user', JSON.stringify(data.user));
  //     queryClient.invalidateQueries('user');
  //   }
  // });
  // return { mutate, isLoading };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: postSignInData) =>
      postSignInFetcher(`${BACKEND_URL}/login`, data),
    // onSuccess: async(data) => {
    //   // await AsyncStorage.setItem('easy-token', data.key);
    // },
  });
  return {
    mutate,
    isLoading,
  };
};

export const useSignUp = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: postSignUpData) =>
      postSignUpFetcher(`${BACKEND_URL}/signup`, data),
  });
  return {
    mutate,
    isLoading,
  };
};

export const useGetUser = () => {
  // const getToken = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   return token;
  // };
  // const token = getToken()
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return null;
      }

      const response = await axios.get(`${BACKEND_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data?.data;
    },
    enabled: !!AsyncStorage.getItem('token'),
  });
  return { userData: data, isLoading };
};

export const useVerifyEmail = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: { token: string }) =>
      postVerifyEmailFetcher(`${BACKEND_URL}/verify/email`, data),
  });
  return {
    mutate,
    isLoading,
  };
};
