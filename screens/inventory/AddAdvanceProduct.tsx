import {
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, TouchableRipple } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { Button, Icon, Image } from '@rneui/themed';
import { useToast } from 'react-native-toast-notifications';
import * as ImagePicker from 'expo-image-picker';
import {
  CategoryImageUploadSvgComponent,
  EmptyListSvgComponent,
} from '@/assets/icons';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { AllProductListProps } from '@/interfaces/navigation/inventory';
import { allCategory } from '@/data/dummy_data';
// Omit<InventoryProps<'AddProduct'>, 'route'>
const AddAdvanceProductScreen = ({
  navigation,
}: Omit<AllProductListProps<'AllProducts'>, 'route'>) => {
  const [productImage, setPategoryImage] = useState('');

  const toast = useToast();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    //Set image url
    // setImage(result.uri)
    if (!result.canceled) {
      // const token = await AsyncStorage.getItem('token');
      // console.log('result :>> ', result);
      setPategoryImage(result.assets[0].uri);

      // try {
      // get the suffix of the result uri
      // const suffix = result.uri.split('.').pop();
      // const suffix = result.assets[0].uri.split('.').pop();
      // get the mime type of the result uri
      // const mimeType = `image/${suffix}`;
      // create a new file object
      // const file = {
      //   uri: result.assets[0].uri,
      //   type: mimeType,
      //   name: `photo.${suffix}`,
      // };
      // console.log('file :>> ', file);
      // const formData = new FormData();
      // formData.append('profile_image', file);
      // mutateImage(formData);
      // toast.show('Profile image updated successfully', {
      //   type: 'success',
      //   placement: 'top',
      // });
      // } catch (error) {
      //   console.error('image', error);
      // }
    } else {
      // toast.show('No image was selected', {
      //   type: 'danger',
      //   placement: 'top',
      // });
      toast.show('No image was selected', {
        type: 'danger',
        duration: 2000,
      });
    }
  };

  // ******************* SAVE PRODUCT *******************
  const handleSaveProduct = () => {
    toast.show('Product added successfully', {
      type: 'success',
      duration: 2000,

      // successIcon: <CategoryImageUploadSvgComponent />,
    });
    navigation.navigate('InventoryHome');
  };

  // ******************** CATEGORY ACTION SHEET ********************
  const categoryActionSheetRef = useRef<ActionSheetRef>(null);

  // ******************* CATEGORY LIST *******************
  const [categoryList, setCategoryList] = useState<typeof allCategory>([]);
  const [categoryValue, setCategoryValue] = useState('');

  useEffect(() => {
    const newData = [] as (typeof allCategory)[number][];
    allCategory.forEach((category) => {
      newData.push(category);
    });
    setCategoryList(newData);
    return () => {
      setCategoryList([]);
    };
  }, []);

  // ****************** FLATLIST CATEGORY ******************
  const renderCategoryList = ({ item }: { item: (typeof allCategory)[0] }) => {
    return (
      <TouchableRipple
        rippleColor={Colors['white']}
        onPress={() => {
          // console.log('Category');
          setCategoryValue(item.name);
          categoryActionSheetRef.current?.hide();
        }}
        // style={styles.categoryItem}
      >
        <View style={styles.content}>
          <View style={styles.imageNameWrapper}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.nameWrapper}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
            </View>
          </View>
          <View style={styles.addIcon}>
            <Icon
              name='add'
              type='ionicon'
              size={20}
              color={Colors['black']}
              // reverse
            />
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.tabContent}>
        <View style={styles.inputWrapper}>
          <TextInput
            label='Product name'
            underlineColor='transparent'
            activeOutlineColor='transparent'
            selectionColor={Colors['activeTab']}
            contentStyle={styles.inputContent}
            theme={{
              colors: {
                primary: Colors['black'],
                text: Colors['black'],
                placeholder: Colors['white'],
                background: Colors['white'],
                surfaceVariant: Colors['white'],
              },
            }}
          />
          <View style={styles.hideUnderline}></View>
        </View>
        <View style={styles.inputWrapper}>
          <Pressable
            onPress={() => {
              // console.log('Category');
              categoryActionSheetRef.current?.show();
            }}
          >
            <>
              <TextInput
                label='Category'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                right={
                  <TextInput.Icon
                    icon={'chevron-down'}
                    style={styles.inputIcon}
                    size={30}
                    onPress={() => {
                      // console.log('Category');
                      categoryActionSheetRef.current?.show();
                    }}
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
                value={categoryValue}
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
              />
              <View style={styles.hideUnderline}></View>
            </>
          </Pressable>
        </View>
        {/* <View style={styles.inputWrapper}>
          <Pressable onPress={() => console.log('Sell by')}>
            <>
              <TextInput
                label='Sell by'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                right={
                  <TextInput.Icon
                    icon={'chevron-down'}
                    style={styles.inputIcon}
                    size={30}
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
              />
              <View style={styles.hideUnderline}></View>
            </>
          </Pressable>
        </View> */}
        <View style={styles.inputWrapper}>
          <Pressable
            // onPress={() => console.log('Variants')}
            onPress={() => navigation.navigate('AddVariant')}
          >
            <>
              <TextInput
                label='Variants'
                underlineColor='transparent'
                activeOutlineColor='transparent'
                selectionColor={Colors['activeTab']}
                contentStyle={styles.inputContent}
                // value='5 Variants'
                right={
                  <TextInput.Icon
                    icon={'chevron-right'}
                    style={styles.inputIcon}
                    size={30}
                    onPress={() => navigation.navigate('AddVariant')}
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
              />
              <View style={styles.hideUnderline}></View>
            </>
          </Pressable>
        </View>
        <View style={styles.imageUploadWrapper}>
          {productImage === '' && (
            <Button
              title='Click to upload image from gallery'
              // onPress={() => console.log('Upload image')}
              onPress={pickImage}
              buttonStyle={styles.uploadBtnStyle}
              containerStyle={styles.uplaodContainerStyle}
              titleStyle={styles.uploadBtnTitleStyle}
              icon={
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <CategoryImageUploadSvgComponent />
                </View>
              }
              iconPosition='top'
            />
          )}
          {productImage !== '' && (
            <>
              <View style={styles.showImageWrapper}>
                <Image
                  // source={{ uri: categoryImage }}
                  source={{
                    uri: productImage,
                  }}
                  containerStyle={styles.selectedImage}
                  PlaceholderContent={<CategoryImageUploadSvgComponent />}
                />
              </View>
              <Button
                title='Change Image'
                onPress={pickImage}
                // onPress={() => console.log('Change image')}
                buttonStyle={styles.changeImageBtnStyle}
                // containerStyle={styles.changeImageContainerStyle}
                // titleStyle={styles.changeImageBtnTitleStyle}
                size='md'
              />
            </>
          )}
        </View>
      </View>
      <View style={styles.footerWrapper}>
        <Button
          type='solid'
          title='Save product'
          // onPress={() => console.log('pressed')}
          onPress={() => {
            handleSaveProduct();
          }}
          icon={{
            name: 'check',
            type: 'entypo',
            color: Colors['white'],
            size: 20,
          }}
          radius={10}
          buttonStyle={{ backgroundColor: Colors['black'], height: 50 }}
          size='lg'
        />
      </View>
      <ActionSheet
        ref={categoryActionSheetRef}
        gestureEnabled={true}
        snapPoints={categoryList.length === 0 ? [100] : [50]}
        containerStyle={styles.actionSheetContainer}
      >
        <View>
          {/* empty category list in action sheet */}
          {categoryList.length === 0 && (
            <View style={styles.emptyContainer}>
              <View>
                <EmptyListSvgComponent />
              </View>
              <Text style={styles.message}>No category is available</Text>

              <Button
                title='Add new category'
                onPress={() => {
                  categoryActionSheetRef.current?.hide();
                  navigation.navigate('AddCategory');
                }}
                buttonStyle={styles.addCategoryBtnStyle}
                containerStyle={styles.addCategoryContainerStyle}
                titleStyle={styles.addCategoryBtnTitleStyle}
                size='lg'
              />
            </View>
          )}
          {categoryList.length > 0 && (
            <FlatList
              data={categoryList}
              renderItem={renderCategoryList}
              keyExtractor={(item) => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 10,
                paddingHorizontal: 5,
              }}
            />
          )}
        </View>
      </ActionSheet>
    </ScrollView>
  );
};

export default AddAdvanceProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // paddingTop: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  tabContent: {
    marginTop: 10,
  },
  inputWrapper: {
    // marginBottom: 10,
    // paddingTop: 5,
    // paddingBottom: 12,
    // // borderWidth: 1,
    // backgroundColor: Colors['white'],
    // borderRadius: 5,

    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors['border'],
  },
  input: {
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    // backgroundColor: 'white',
  },
  inputOutline: {
    borderColor: Colors['white'],
  },
  hideUnderline: {
    marginTop: -4,
    borderTopWidth: 8,
    borderColor: Colors['white'],
  },
  inputIcon: {
    // marginTop: 10,
    // backgroundColor: Colors['white'],
  },
  imageUploadWrapper: {
    // borderWidth: 1,
  },
  uploadBtnStyle: {
    backgroundColor: Colors['white'],
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  uplaodContainerStyle: {
    // borderWidth: 1,
    borderRadius: 10,
  },
  uploadBtnTitleStyle: {
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
  },
  showImageWrapper: {
    marginVertical: 10,
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  selectedImage: {
    // width: '80%',
    // width: 200,
    height: 200,
    borderRadius: 10,
    aspectRatio: 1,
    alignItems: 'center',
    // borderWidth: 1,
    // resizeMode: 'contain',
  },
  changeImageBtnStyle: {
    backgroundColor: Colors['black'],
    borderRadius: 5,
    // width: '100%',
  },
  footerWrapper: {
    // marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  actionSheetContainer: {
    backgroundColor: Colors['white'],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  // ** EMPTY CATEGORY LIST IN ACTION SHEET **
  emptyContainer: {
    // flex: 1,
    // backgroundColor: Colors['background'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  message: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Givonic-Bold',
    textAlign: 'center',
    marginVertical: 15,
  },

  // ** ADD CATEGORY BUTTON IN ACTION SHEET **
  addCategoryBtnStyle: {
    backgroundColor: Colors['black'],
    borderRadius: 5,
    // width: '100%',
  },
  addCategoryContainerStyle: {
    // borderWidth: 1,
    // borderRadius: 10,
    width: '100%',
    marginTop: 20,
    // marginBottom: 20,
  },
  addCategoryBtnTitleStyle: {
    fontFamily: 'Givonic-SemiBold',
    color: Colors['white'],
  },

  // ** CATEGORY LIST IN ACTION SHEET **

  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  imageNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    // width: 170,
    // height: 170,
    // overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    // resizeMode: 'contain',
  },
  nameWrapper: {
    paddingVertical: 10,
    // paddingHorizontal: 15,
    backgroundColor: Colors['white'],
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderWidth: 1,
    // height: 70,
    // width: '100%',
    // justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: Colors['black'],
    paddingLeft: 10,
    // borderWidth: 1,
  },
  addIcon: {
    // paddingHorizontal: 10,
  },
});
