import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import TouchableCmp from './TouchableCmp';

const NumberItem = ({ itemData, onSelect }) => {
  return (
    <Card style={{ height: 100, width: 100 }}>
      <View style={styles.container}>
        <View style={styles.touchable}>
          <TouchableCmp style={styles.innerContainer} onPress={onSelect} useForeground>
            <Text style={styles.title}>{itemData.value}</Text>
          </TouchableCmp>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontFamily: 'roboto-bold',
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 25,
  },
});

export default NumberItem;
