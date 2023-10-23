import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  // useCallback,
} from 'react';
import Colors from '@/constants/Colors';
import { TextInput, TouchableRipple } from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useCountry } from '@/hooks/storeHook';

const CountrySelection = () => {
  // *************** BOTTOM SHEET ***************
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const handleShowList = () => {
    actionSheetRef.current?.show();
  };

  // ************** COUNTRY **************
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

  // **************** RENDER ITEM ****************
  const renderItemList = ({ item }: { item: Country }) => (
    <TouchableRipple
      rippleColor={Colors['white']}
      onPress={() => {
        setSelectedCountry(item);
        actionSheetRef.current?.hide();
        setSearch('');
        setCountries(searchCountries);
      }}
    >
      <View style={styles.item}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    </TouchableRipple>
  );
  return (
    <View>
      <View style={styles.inputWrapper}>
        <TouchableRipple
          onPress={() => handleShowList()}
          rippleColor={Colors['background']}
        >
          <TextInput
            label='Country'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            style={styles.input}
            editable={false}
            theme={{
              colors: {
                primary: Colors['black'],
                text: Colors['black'],
                placeholder: Colors['white'],
                background: Colors['white'],
                surfaceVariant: Colors['white'],
              },
            }}
            value={selectedCountry.name}
            right={
              <TextInput.Icon
                icon={'chevron-down'}
                onPress={() => handleShowList()}
                style={styles.inputIcon}
                theme={{
                  colors: {
                    primary: Colors['black'],
                    text: Colors['black'],
                    // placeholder: Colors['white'],
                    background: Colors['white'],
                  },
                }}
              />
            }
          />
        </TouchableRipple>
        <View style={styles.hideUnderline}></View>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        snapPoints={[70]}
        containerStyle={styles.actionSheetContainer}
        useBottomSafeAreaPadding={true}
        gestureEnabled={true}
        CustomHeaderComponent={
          <View style={styles.searchBar}>
            <TextInput
              placeholder='Search country'
              mode='outlined'
              style={styles.searchInput}
              contentStyle={styles.searchInputContent}
              outlineStyle={styles.searchInputOutline}
              onChangeText={(text) => {
                setSearch(text);
                handleSearch(text);
              }}
              value={search}
              left={
                <TextInput.Icon
                  icon={'magnify'}
                  style={styles.inputIcon}
                  // onPress={() => console.log('search')}
                />
              }
              right={
                <TextInput.Icon
                  icon={'close'}
                  onPress={() => {
                    setSearch('');
                    setCountries(searchCountries);
                  }}
                  style={styles.inputIcon}
                />
              }
            />
          </View>
        }
      >
        <View>
          <View style={styles.listContainer}>
            <FlatList
              data={countries}
              renderItem={renderItemList}
              keyExtractor={(item) => item.id.toString()}
              // initialNumToRender={10}
            />
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

export default CountrySelection;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors['grey-200'],
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
  },
  inputWrapper: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  input: {
    // paddingVertical: 11,
    // height: 40,
    // fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    // fontFamily: 'Hubhead',
    backgroundColor: 'white',
  },
  inputIcon: {
    marginTop: 10,
  },
  hideUnderline: {
    marginTop: -4,
    borderTopWidth: 8,
    borderColor: Colors['white'],
  },
  actionSheetContainer: {
    paddingBottom: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchBar: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  searchInput: {
    // borderWidth: 1,
    // height: 40,
    fontSize: 18,
    fontFamily: 'Givonic-SemiBold',
  },

  searchInputContent: {},

  searchInputOutline: {
    backgroundColor: 'white',
    borderColor: Colors['grey-400'],
    borderRadius: 7,
  },
  listContainer: {
    // marginVertical: 10,
    // marginBottom: 330,
    // borderWidth: 1,
    // marginHorizontal: 20,
  },
});
