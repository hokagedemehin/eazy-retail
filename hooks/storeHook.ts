import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import BaseUrl from '@/utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BACKEND_URL = BaseUrl()

type postStoreData = {
  business_name: string;
  country: string;
  currency: string;
  industry: string;
  user: number;
}

type patchStoreData = {
  id?: number;
  business_name?: string;
  country?: string;
  currency?: string;
  industry?: string;
  user?: number;
}

const postStoreFetcher = async (url: string, data: postStoreData) => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const patchStoreFetcher = async (url: string, data: patchStoreData) => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const useCreateStore = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: postStoreData) => postStoreFetcher(`${BACKEND_URL}/stores/`, data),
  });
  return { createStoreMutate: mutate, isLoading };
}

export const useUpdateStore = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: patchStoreData) => patchStoreFetcher(`${BACKEND_URL}/stores/${data.id}/`, data),
  });
  return { updateStoreMutate: mutate, isLoading };
}
