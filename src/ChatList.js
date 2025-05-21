import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat Screen Coming Soon...</Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});
