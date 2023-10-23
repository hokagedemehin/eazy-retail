import { useEffect, useRef, useState } from 'react';
import { ActionSheetRef } from 'react-native-actions-sheet';
import {
  useCountry,
  useCurrency,
  useIndustry,
  useTimezone,
} from '@/hooks/storeHook';
import { useAppDispatch } from '@/hooks/redux';
import { setStoreAddress } from '@/store/slice/storeSlice';

export const useCountrySelector = () => {
  // *************** BOTTOM SHEET ***************
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const handleShowCountryList = () => {
    actionSheetRef.current?.show();
  };
  interface Country {
    code: string;
    id: number;
    name: string;
  }

  const [countries, setCountries] = useState([] as Country[]);
  const [searchCountries, setsearchCountries] = useState([] as Country[]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: '',
    id: 0,
    name: '',
  });

  const { countryData } = useCountry();
  useEffect(() => {
    if (countryData) {
      setCountries(countryData);
      setsearchCountries(countryData);
    }
  }, [countryData]);
  // ********** SEARCH BAR **********
  const [search, setSearch] = useState('');
  const handleSearch = (text: string) => {
    if (text.length > 0) {
      const newData = countries.filter((item) => {
        const itemData = item.name ? item.name : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setCountries(newData);
    } else {
      setCountries(searchCountries);
    }
  };

  return {
    actionSheetRef,
    handleShowCountryList,
    countries,
    setCountries,
    search,
    setSearch,
    handleSearch,
    selectedCountry,
    setSelectedCountry,
    countryData,
    searchCountries,
  };
};

export const useCurrencySelector = () => {
  // *************** BOTTOM SHEET ***************
  const currencyActionSheetRef = useRef<ActionSheetRef>(null);
  const handleShowCurrencyList = () => {
    currencyActionSheetRef.current?.show();
  };
  interface Currency {
    code: string;
    id: number;
    name: string;
    symbol: string;
  }

  const [currencies, setCurrencies] = useState([] as Currency[]);
  const [searchCurrency, setSearchCurrency] = useState([] as Currency[]);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: '',
    id: 0,
    name: '',
    symbol: '',
  });

  const { currencyData } = useCurrency();
  useEffect(() => {
    if (currencyData) {
      setCurrencies(currencyData);
      setSearchCurrency(currencyData);
    }
  }, [currencyData]);
  // ********** SEARCH BAR **********
  const [currencySearch, setCurrencySearch] = useState('');
  const handleCurrencySearch = (text: string) => {
    if (text.length > 0) {
      const newData = currencies.filter((item) => {
        const itemData = item.name ? item.name : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setCurrencies(newData);
    } else {
      setCurrencies(searchCurrency);
    }
  };

  return {
    currencyActionSheetRef,
    handleShowCurrencyList,
    currencies,
    setCurrencies,
    currencySearch,
    setCurrencySearch,
    handleCurrencySearch,

    selectedCurrency,
    setSelectedCurrency,
    currencyData,
    searchCurrency,
  };
};

export const useIndustrySelector = () => {
  const industryActionSheetRef = useRef<ActionSheetRef>(null);
  const handleShowIndustryList = () => {
    industryActionSheetRef.current?.show();
  };
  interface Industry {
    id: number;
    name: string;
  }
  const [industries, setIndustries] = useState([] as Industry[]);
  const [searchIndustry, setSearchIndustry] = useState([] as Industry[]);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>({
    id: 0,
    name: '',
  });
  const { industryData } = useIndustry();
  useEffect(() => {
    if (industryData) {
      setIndustries(industryData);
      setSearchIndustry(industryData);
    }
  }, [industryData]);
  // ********** SEARCH BAR **********
  const [industrySearch, setIndustrySearch] = useState('');
  const handleIndustrySearch = (text: string) => {
    if (text.length > 0) {
      const newData = industries.filter((item) => {
        const itemData = item.name ? item.name : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setIndustries(newData);
    } else {
      setIndustries(searchIndustry);
    }
  };
  return {
    industryActionSheetRef,
    handleShowIndustryList,
    industries,
    setIndustries,
    industrySearch,
    setIndustrySearch,
    handleIndustrySearch,
    selectedIndustry,
    setSelectedIndustry,
    industryData,
    searchIndustry,
  };
};

export const useTimezoneSelector = () => {
  const timezoneActionSheetRef = useRef<ActionSheetRef>(null);
  const handleShowTimezoneList = () => {
    timezoneActionSheetRef.current?.show();
  };
  interface Timezone {
    id: number;
    name: string;
    code: string;
  }
  const [timezones, setTimezones] = useState([] as Timezone[]);
  const [searchTimezone, setSearchTimezone] = useState([] as Timezone[]);
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone>({
    id: 0,
    name: '',
    code: '',
  });
  const { timezoneData } = useTimezone();
  useEffect(() => {
    if (timezoneData) {
      setTimezones(timezoneData);
      setSearchTimezone(timezoneData);
    }
  }, [timezoneData]);
  // ********** SEARCH BAR **********
  const [timezoneSearch, setTimezoneSearch] = useState('');
  const handleTimezoneSearch = (text: string) => {
    if (text.length > 0) {
      const newData = timezones.filter((item) => {
        const itemData = item.name ? item.name : '';
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setTimezones(newData);
    } else {
      setTimezones(searchTimezone);
    }
  };
  return {
    timezoneActionSheetRef,
    handleShowTimezoneList,
    timezones,
    setTimezones,
    timezoneSearch,
    setTimezoneSearch,
    handleTimezoneSearch,
    selectedTimezone,
    setSelectedTimezone,
    timezoneData,
    searchTimezone,
  };
};

export const useAddressInput = () => {
  const [addressValue, setAddressValue] = useState('');
  const dispatch = useAppDispatch();
  const handleAddressChange = (text: string) => {
    setAddressValue(text);
    dispatch(setStoreAddress(text));
  };

  return { addressValue, setAddressValue, handleAddressChange };
};
