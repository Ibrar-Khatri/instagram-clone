import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';

const NotificationScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: colors.black,
  },
});

export default NotificationScreen;
