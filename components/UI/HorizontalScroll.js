import React from 'react';
import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';

import Colors from './../../constants/Colors';
import NumberItem from './NumberItem';
import SmallNumberItem from './SmallNumberItem';

const HorizontalScroll = (props) => {
  const { scrollHeight, smallNumber } = props;

  let RenderedItem = NumberItem;

  if (smallNumber) {
    RenderedItem = SmallNumberItem;
  }

  const scrollData = props.scrollData;

  const scrollHeightAndMargins = scrollHeight > 0 ? scrollHeight + 70 : 0;

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{
          backgroundColor: props.bgColor ? props.bgColor : 'transparent',
        }}>
        <View
          style={{
            flex: 1,
            height: scrollHeightAndMargins,
          }}>
          {/* If dataset passed is not empty  */}
          {scrollData.length ? (
            <View
              style={{
                height: scrollHeightAndMargins,
                marginTop: 20,
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {scrollData.map((item) => (
                  <RenderedItem
                    itemData={item}
                    key={item.id}
                    isHorizontal
                    onSelect={() => {
                      props.onPress(item.value);
                      props.triggerFunction();
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
        <Divider style={{ marginBottom: 20, borderColor: Colors.primary, borderWidth: 0.6 }} />
      </ScrollView>
    </>
  );
};

export default HorizontalScroll;
