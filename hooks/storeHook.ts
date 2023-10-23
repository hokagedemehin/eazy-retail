import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import BaseUrl from '@/utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = BaseUrl();

interface postStoreData {
  name: string;
  country_id: number;
  currency_id: number;
  industry_id: number;
  timezone_id: number;
  address: string;
}

type patchStoreData = {
  id?: number;
  name?: string;
  country_id?: string;
  currency_id?: string;
  industry_id?: string;
  timezone_id?: number;
  address?: string;
};

const postStoreFetcher = async (url: string, data: postStoreData) => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const patchStoreFetcher = async (url: string, data: patchStoreData) => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useCreateStore = () => {
  const createStoreMutation = useMutation({
    mutationFn: (data: postStoreData) =>
      postStoreFetcher(`${BACKEND_URL}/company-store`, data),
  });
  return createStoreMutation;
};

export const useUpdateStore = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: patchStoreData) =>
      patchStoreFetcher(`${BACKEND_URL}/stores/${data.id}/`, data),
  });
  return { updateStoreMutate: mutate, isLoading };
};

export const useCountry = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['country'],
    queryFn: () => axios.get(`${BACKEND_URL}/country`),
  });
  return { countryData: data?.data?.data, isLoading };
};

export const useCurrency = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['currency'],
    queryFn: () => axios.get(`${BACKEND_URL}/currency`),
  });
  return { currencyData: data?.data?.data, isLoading };
};

export const useTimezone = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['timezone'],
    queryFn: () => axios.get(`${BACKEND_URL}/timezone`),
  });
  return { timezoneData: data?.data?.data, isLoading };
};

export const useIndustry = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['industry'],
    queryFn: () => axios.get(`${BACKEND_URL}/industry`),
  });

  return { industryData: data?.data?.data, isLoading };
};
