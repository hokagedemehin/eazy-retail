import React from 'react';
// import UpcomingComponent from '@/components/Upcoming/Upcoming';
import { ProfileHomeProps } from '@/interfaces/navigation/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Subscriptions from '../subscriptions/Subscriptions';
import ProfileHome from '../profile/ProfileHome';

const ProfileStack = createNativeStackNavigator();

const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen
        name='ProfileHome'
        component={ProfileHome}
      />
      <ProfileStack.Screen
        name='Subscriptions'
        component={Subscriptions}
      />

    </ProfileStack.Navigator>
  );
};

export default ProfileScreen;
