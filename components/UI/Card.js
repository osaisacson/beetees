import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from './../../constants/Colors';

const Card = ({ style, children }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2, //Because shadow only work on iOS, elevation is same thing but for android.
    borderRadius: 5,
    backgroundColor: Colors.cardBgColor,
  },
});

export default Card;
