import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { getParentName } from '@/store/slice/hideTabsSlice';
import HeaderComponent from '@/components/Header/HeaderComponent';
import { AddProductOrCategoryProps } from '@/interfaces/navigation/inventory';
import { TextInput } from 'react-native-paper';
import Colors from '@/constants/Colors';
import { Button, Image } from '@rneui/themed';
import { CategoryImageUploadSvgComponent } from '@/assets/icons';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from 'react-native-toast-notifications';

const AddCategoryScreen = ({
  navigation,
}: Omit<AddProductOrCategoryProps<'AddCategory'>, 'route'>) => {
  const dispatch = useAppDispatch();
  const [categoryImage, setCategoryImage] = useState('');

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
      setCategoryImage(result.assets[0].uri);

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

  useEffect(() => {
    dispatch(getParentName('hideScreen'));
    return () => {
      dispatch(getParentName(''));
    };
  }, [dispatch]);

  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  // ******************* SAVE CATEGORY *******************
  const handleSaveCategory = () => {
    // console.log('Save category');
    // navigation.navigate('InventoryHome');
    toast.show('Category added successfully', {
      type: 'success',
      duration: 2000,
      // successIcon: <CategoryImageUploadSvgComponent />,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <View style={styles.header}>
          <HeaderComponent title='Add Category' handleBack={handleBack} />
        </View>
        <View style={styles.bodyContent}>
          <View style={styles.inputWrapper}>
            <TextInput
              label='Category name'
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
          <View style={styles.imageUploadWrapper}>
            {categoryImage === '' && (
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
            {categoryImage !== '' && (
              <>
                <View style={styles.showImageWrapper}>
                  <Image
                    // source={{ uri: categoryImage }}
                    source={{
                      uri: categoryImage,
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
      </View>
      <View style={styles.footerWrapper}>
        <Button
          type='solid'
          title='Save Category'
          // onPress={() => console.log('pressed')}
          onPress={() => {
            handleSaveCategory();
          }}
          icon={{
            name: 'check',
            type: 'entypo',
            color: Colors['white'],
            size: 20,
          }}
          radius={10}
          buttonStyle={{ backgroundColor: Colors['black'] }}
          size='lg'
        />
      </View>
    </ScrollView>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  contentContainer: {
    // paddingTop: 15,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    // marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  bodyContent: {
    marginHorizontal: 20,
    marginTop: 15,
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
  footerWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  showImageWrapper: {
    marginVertical: 10,
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  selectedImage: {
    width: 200,
    height: 150,
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
});
