// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseUrl from '@/utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BACKEND_URL = BaseUrl()


type postSignInData = {
  email: string;
  password: string;
}

type postSignUpData = {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  password1: string;
  password2: string;
}

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
}

const postSignUpFetcher = async (url: string, data: postSignUpData) => {
  const response = await axios.post(url, data);
  return response.data;
}

const getUserFetcher = async (url: string) => {
  const token = await AsyncStorage.getItem('token');
  // console.log(token)
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}


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

  const {mutate, isLoading} = useMutation({
    mutationFn: (data: postSignInData) => postSignInFetcher(`${BACKEND_URL}/dj-rest-auth/login/`, data),
    // onSuccess: async(data) => {
    //   console.log(data)
    //   // await AsyncStorage.setItem('easy-token', data.key);
    // },
  })
  return  {
    mutate,
    isLoading,
  }
}

export const useSignUp = () => {

  const {mutate, isLoading} = useMutation({
    mutationFn: (data: postSignUpData) => postSignUpFetcher(`${BACKEND_URL}/dj-rest-auth/registration/`, data),
  })
  return  {
    mutate,
    isLoading,
  }
}

export const useGetUser = () => {
  // const { data, isLoading } = useQuery<getUserData, Error>({
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserFetcher(`${BACKEND_URL}/dj-rest-auth/user/`),
  });
  return { userData: data, isLoading };
}
