import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Icon } from '@rneui/themed';

type ProfileProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showArrow?: boolean;
};

const ProfileCardComponent = ({
  icon,
  title,
  onPress,
  showArrow = true,
}: ProfileProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        // style={({ pressed }) => [
        //   {
        //     backgroundColor: pressed ? Colors['activeFilter'] : 'white',
        //   },
        // ]}
        android_ripple={{ color: Colors['activeFilter'] }}
      >
        <View style={styles.wrapper}>
          <View style={styles.iconTitle}>
            <View style={styles.icon}>{icon}</View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.arrow}>
            {showArrow && <Icon name='arrow-forward-ios' size={20} />}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

// <Icon name='arrow-forward-ios' size={20} />

export default ProfileCardComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Givonic-SemiBold',
  },
  arrow: {
    // width: 20,
    // height: 20,
    // borderWidth: 1,
    // borderColor: 'red',
    // borderRadius: 50,
    // backgroundColor: 'white',
    // alignItems: 'center',
  },
});
