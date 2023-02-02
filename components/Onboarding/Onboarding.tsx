import Colors from '@/constants/Colors';
import {
  Image,
  // ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import { Button } from 'react-native-paper';
import { Button } from '@rneui/themed';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import { Button } from 'react-native-paper';
// import Colors from '../../constants/Colors';
// import * as SecureStore from 'expo-secure-store';
import Swiper from 'react-native-swiper';
import { useAppDispatch } from '@/hooks/redux';
import { OnboardingProps, RootStackParamList } from '@/declarations/navigation';
import * as SecureStore from 'expo-secure-store';
import { setOnBoarded } from '@/store/slice/tokenSlice';

const OnboardingComp = ({ navigation }: OnboardingProps) => {
  // ***** SECURE STORAGE | REDUX ONBOARDING | REDIRECT *******
  const dispatch = useAppDispatch();
  const handleRedirect = async (name: keyof RootStackParamList) => {
    await SecureStore.setItemAsync('onboarding', 'true');
    dispatch(setOnBoarded(true));
    navigation.replace(name);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
      }}
    >
      <Swiper
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={false}
        loop={false}
      >
        {/* Slide one */}
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            source={require('../../assets/onboarding/onboard1.png')}
            style={styles.imageStyle}
          />
          {/* </View> */}
          <View
            style={[
              styles.textWrapper,
              {
                backgroundColor: '#9E8CE0',
              },
            ]}
          >
            <Text style={styles.title}>Manage your inventory</Text>
            <Text style={styles.text}>
              Identify which and how much stock to order at what time. Track
              your inventory from purchase to the sale of goods.
            </Text>
          </View>
        </View>

        {/* Slide 2 */}
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            source={require('../../assets/onboarding/onboard2.png')}
            style={styles.imageStyle}
          />
          {/* </View> */}
          <View
            style={[
              styles.textWrapper,
              {
                backgroundColor: '#F99DA0',
              },
            ]}
          >
            <Text style={styles.title}>Track your expenses</Text>
            <Text style={styles.text}>
              Track your expenses and income. Know how much you are spending and
              earning.
            </Text>
          </View>
        </View>

        {/* Slide 3 */}
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            source={require('../../assets/onboarding/onboard2.png')}
            style={styles.imageStyle}
          />
          {/* </View> */}
          <View
            style={[
              styles.textWrapper,
              {
                backgroundColor: '#336353',
              },
            ]}
          >
            <Text style={styles.title}>Easy & flexible to use</Text>
            <Text style={styles.text}>
              Easy to use and flexible to use. You can use it on your phone,
              tablet or computer.
            </Text>
          </View>
        </View>
      </Swiper>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title='Sign up'
            buttonStyle={styles.signupButton}
            titleStyle={styles.signupLabel}
            radius={7}
            // onPress={() => console.log('Sign Up')}
            onPress={() => handleRedirect('SignUp')}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title='Log in'
            type='clear'
            buttonStyle={styles.signinButton}
            titleStyle={styles.signinLabel}
            radius={7}
            // onPress={() => console.log('Sign In')}
            onPress={() => handleRedirect('SignIn')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingComp;

const styles = StyleSheet.create({
  imageStyle: {
    width: 300,
    height: 370,
    resizeMode: 'cover',
    transform: [
      {
        translateX: 100,
      },
    ],
    zIndex: 1,
    // borderRadius: 20,
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
  },
  textWrapper: {
    padding: 30,
    // backgroundColor: '#9E8CE0',
    height: 300,
    justifyContent: 'flex-end',
    marginHorizontal: 30,
    // borderRadius: 20,
    transform: [
      {
        translateY: -70,
      },
    ],
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Hubhead',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginTop: 10,
    fontFamily: 'Hubhead',
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  signupButton: {
    backgroundColor: Colors['black'],
    height: 50,
  },
  signupLabel: {
    fontSize: 18,
    fontFamily: 'Hubhead',
  },
  signinButton: {
    borderWidth: 1,
    height: 50,
    borderColor: Colors['black'],
    backgroundColor: 'transparent',
  },
  signinLabel: {
    fontSize: 18,
    fontFamily: 'Hubhead',
    color: Colors['black'],
  },
});
