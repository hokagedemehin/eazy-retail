import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import UpcomingComponent from '@/components/Upcoming/Upcoming';
import { Avatar, Button, Chip } from '@rneui/themed';
import {
  CounterSvgComponent,
  ProfileContactSvgComponent,
  ProfileEditIconComponent,
  ProfileLogoutSvgComponent,
  ProfileSecuritySvgComponent,
  ProfileSubscriptionSvgComponent,
} from '@/assets/icons';
import ProfileCardComponent from '@/components/Profile/ProfileCard';
// import { Chip } from 'react-native-paper';
// import BaseUrl from '@/utils/BaseUrl';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import HeaderComponent from '@/components/Header/HeaderComponent';
import Colors from '@/constants/Colors';
// import { useAppDispatch } from '@/hooks/redux';
import { ProfileHomeProps } from '@/interfaces/navigation/profile';

const ProfileHome = ({
  navigation,
}: Omit<ProfileHomeProps<'ProfileHome'>, 'route'>) => {
  // ******************* HIDE TABS *******************
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getParentName('hideScreen'));
  //   return () => {
  //     dispatch(getParentName(''));
  //   };
  // }, [dispatch]);

  // ****************** GO BACK ******************
  const handleBack = () => {
    navigation.goBack();
  };

  // ****************** SUBSCRIPTIONS ******************
  const handleSubscription = () => {
    navigation.navigate('Subscriptions');
  };

  const handleLogOut = async () => {
    try {
      // await axios.post(`${BaseUrl}/dj-rest-auth/logout/`, null);
      await AsyncStorage.removeItem('token');
      navigation.replace('SignIn');
    } catch (error) {
      console.error(error);
    }
  };

  const profileCardsArray = [
    {
      id: 1,
      title: 'The Center Distribution',
      icon: <CounterSvgComponent fill={Colors['purple']} />,
      onPress: () => console.log('Pressed'),
      showArrow: true,
    },
    {
      id: 2,
      title: 'Security',
      icon: <ProfileSecuritySvgComponent fill={Colors['purple']} />,
      onPress: () => console.log('Pressed'),
      showArrow: true,
    },
    {
      id: 3,
      title: 'Subscriptions',
      icon: <ProfileSubscriptionSvgComponent fill={Colors['purple']} />,
      onPress: () => handleSubscription(),
      showArrow: true,
    },
    {
      id: 4,
      title: 'Contact Us',
      icon: <ProfileContactSvgComponent fill={Colors['purple']} />,
      onPress: () => console.log('Pressed'),
      showArrow: false,
    },
    {
      id: 5,
      title: 'Logout',
      icon: <ProfileLogoutSvgComponent fill={Colors['purple']} />,
      onPress: () => handleLogOut(),
      showArrow: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <HeaderComponent title='' handleBack={handleBack} />
        </View>
        <View style={styles.profileInfoWrapper}>
          <View style={styles.avatarName}>
            <Avatar
              size={70}
              rounded
              source={{
                uri: 'https://res.cloudinary.com/dnc04r7sc/image/upload/v1675388092/profile_so3odg.png',
              }}
            />
            <View style={styles.nameTitle}>
              <Text numberOfLines={1} style={styles.name}>
                Jane Smith
              </Text>
              <View style={styles.roleSerial}>
                <Chip
                  type='outline'
                  buttonStyle={styles.chipStyle}
                  titleStyle={styles.chipTextStyle}
                  onPress={() => console.log('Pressed')}
                  size='sm'
                  // onPress={() => {
                  //   taxActionSheetRef.current?.show();
                  // }}
                >
                  Owner
                </Chip>
                <Text style={styles.serial}>123456789</Text>
              </View>
            </View>
          </View>
          <View style={styles.editButton}>
            <Button
              type='clear'
              onPress={() => console.log('Pressed')}
              size='sm'
              titleStyle={styles.EditButtonTitleStyle}
              icon={
                <View
                  style={{
                    marginLeft: 8,
                  }}
                >
                  <ProfileEditIconComponent />
                </View>
              }
              iconRight
            >
              Edit
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.bodyWrapper}>
        <View>
          {profileCardsArray.map((item) => (
            <ProfileCardComponent
              key={item.id}
              title={item.title}
              icon={item.icon}
              onPress={item.onPress}
              showArrow={item.showArrow}
            />
          ))}
        </View>
        <View style={styles.footer}>
          <Button
            type='clear'
            onPress={() => console.log('Pressed')}
            size='sm'
            titleStyle={styles.footerButtonTitleStyle}
          >
            Report bug
          </Button>
          <Text style={styles.version}> Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileHome;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 25 : 10,
    backgroundColor: Colors['background'],
  },
  headerWrapper: {
    backgroundColor: Colors['white'],
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    // elevation: 5,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  profileInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  avatarName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTitle: {
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
    color: '#000',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Hubhead',
    color: '#000',
    // borderWidth: 1,
    width: 150,
    paddingBottom: 2,
  },
  roleSerial: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipStyle: {
    backgroundColor: Colors['chipBackground'],
    borderRadius: 50,
    borderColor: Colors['white'],
  },
  chipTextStyle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 12,
    color: Colors['chipText'],
  },
  serial: {
    fontSize: 12,
    fontFamily: 'Givonic-SemiBold',
    color: '#000',
    marginLeft: 5,
  },
  editButton: {},
  EditButtonTitleStyle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 12,
    color: Colors['editButton'],
  },
  bodyWrapper: {
    backgroundColor: Colors['background'],
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerButtonTitleStyle: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 14,
    color: Colors['green'],
  },
  version: {
    fontFamily: 'Givonic-SemiBold',
    fontSize: 12,
    color: Colors['black'],
  },
});
