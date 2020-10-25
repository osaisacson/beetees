import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import TouchableCmp from './TouchableCmp';

const SmallNumberItem = ({ itemData, onSelect }) => {
  return (
    <Card style={{ height: 70, width: 70 }}>
      <View style={styles.container}>
        <View style={styles.touchable}>
          <TouchableCmp style={styles.innerContainer} onPress={onSelect} useForeground>
            <Text style={styles.title}>{itemData.value}E</Text>
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
    color: '#666',
    fontFamily: 'roboto-bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 20,
  },
});

export default SmallNumberItem;
