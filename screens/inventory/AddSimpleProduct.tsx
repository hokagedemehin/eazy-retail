import { Pressable, StyleSheet, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useToast } from 'react-native-toast-notifications';
import { Button, Image } from '@rneui/themed';
import { CategoryImageUploadSvgComponent } from '@/assets/icons';

const AddSimpleProductScreen = () => {
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
    // console.log('Save category');
    // navigation.navigate('InventoryHome');
    toast.show('Product added successfully', {
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
      <View style={styles.tabContent}>
        <View style={styles.inputWrapper}>
          <TextInput
            label='Product name'
            mode='outlined'
            // autoCapitalize='none'
            style={styles.input}
            activeOutlineColor={Colors['black']}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            theme={{
              colors: {
                primary: Colors['black'],
                text: Colors['black'],
                placeholder: Colors['white'],
                background: Colors['white'],
              },
            }}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Pressable onPress={() => console.log('category')}>
            <TextInput
              label='Category'
              mode='outlined'
              style={styles.input}
              activeOutlineColor={Colors['black']}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              editable={false}
              right={
                <TextInput.Icon
                  icon={'chevron-down'}
                  style={styles.inputIcon}
                  size={30}
                />
              }
            />
          </Pressable>
        </View>
        <View style={styles.inputWrapper}>
          <Pressable onPress={() => console.log('Sell by')}>
            <TextInput
              label='Sell by'
              mode='outlined'
              style={styles.input}
              activeOutlineColor={Colors['black']}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              editable={false}
              right={
                <TextInput.Icon
                  icon={'chevron-down'}
                  style={styles.inputIcon}
                  size={30}
                />
              }
            />
          </Pressable>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            label='Cost'
            mode='outlined'
            // autoCapitalize='none'
            style={styles.input}
            activeOutlineColor={Colors['black']}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            theme={{
              colors: {
                primary: Colors['black'],
                text: Colors['black'],
                placeholder: Colors['white'],
                background: Colors['white'],
              },
            }}
          />
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
    </ScrollView>
  );
};

export default AddSimpleProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
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
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 12,
    // borderWidth: 1,
    backgroundColor: Colors['white'],
    borderRadius: 5,
  },
  input: {
    fontFamily: 'Givonic-SemiBold',
    // borderWidth: 1,
  },
  inputContent: {
    backgroundColor: 'white',
  },
  inputOutline: {
    borderColor: Colors['white'],
  },
  inputIcon: {
    marginTop: 10,
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
});
