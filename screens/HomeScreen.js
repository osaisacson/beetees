import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../components/UI/Card';
import HorizontalScroll from '../components/UI/HorizontalScroll';
import Rings from '../components/UI/Rings';
import ActiveInsulin from '../components/sections/ActiveInsulin';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import * as goalsActions from '../store/actions/goals';

const HomeScreen = (props) => {
  //TBD: Find a better solution for this. Currently the user object does not update if we don't pull in all profiles
  const currentProfileForId = useSelector((state) => state.profiles.userProfile || {});
  const loggedInUserId = currentProfileForId.profileId;
  const currentProfile = useSelector((state) =>
    state.profiles.allProfiles.find((profile) => profile.profileId === loggedInUserId)
  );

  const dispatch = useDispatch();

  const [currentBS, setCurrentBS] = useState(0);
  const [activeUnits, setActiveUnits] = useState();

  const [currentNeededCorrection, setCurrentNeededCorrection] = useState(0);

  const conditionalColor =
    currentBS <= 4 ? '#33bbff' : currentBS > 9 ? '#ffc300' : currentBS > 13 ? '#c70039' : '#1F9236';

  const neededCorrection = () => {
    const valueToReduce = currentBS <= 5 ? 0 : currentBS - 5;
    setCurrentNeededCorrection(valueToReduce / 2.5);
  };

  const submitActiveUnits = useCallback(async () => {
    try {
      dispatch(goalsActions.createGoal(activeUnits));
    } catch (err) {
      alert('Something went wrong');
    }
  }, [dispatch, activeUnits]);

  const numbers = [
    { id: '1', value: 1 },
    { id: '2', value: 2 },
    { id: '3', value: 3 },
    { id: '4', value: 4 },
    { id: '5', value: 5 },
    { id: '6', value: 6 },
    { id: '7', value: 7 },
    { id: '8', value: 8 },
    { id: '9', value: 9 },
    { id: '10', value: 10 },
    { id: '11', value: 11 },
    { id: '12', value: 12 },
    { id: '13', value: 13 },
    { id: '14', value: 14 },
    { id: '15', value: 15 },
    { id: '16', value: 16 },
    { id: '17', value: 17 },
    { id: '18', value: 18 },
    { id: '19', value: 19 },
    { id: '20', value: 20 },
    { id: '21', value: 21 },
    { id: '22', value: 22 },
    { id: '23', value: 23 },
    { id: '24', value: 24 },
    { id: '25', value: 25 },
  ];

  const units = [
    { id: '1', value: 1 },
    { id: '2', value: 2 },
    { id: '3', value: 3 },
    { id: '4', value: 4 },
    { id: '5', value: 5 },
    { id: '6', value: 6 },
    { id: '7', value: 7 },
    { id: '8', value: 8 },
  ];

  //Navigate to the edit screen and forward the profile id
  const editProfileHandler = () => {
    props.navigation.navigate('EditProfile', { detailId: currentProfile.id });
  };

  return (
    <>
      <View style={styles.ringContainer}>
        <Rings />
      </View>
      <View>
        <Card style={{ ...styles.centered, ...styles.meSection }}>
          <Text style={styles.smallText}>Current Bloodsugar</Text>
          <Text style={{ ...styles.meText, color: conditionalColor }}>{currentBS}</Text>
          <Text style={styles.smallText}>mmol</Text>
        </Card>
        <Card style={{ top: Styles.amTop, ...styles.ampmSection }}>
          <Text style={styles.smallText}>Needed correction</Text>
          <Text style={styles.ampmText}>{currentNeededCorrection}E</Text>
        </Card>
        <Text style={styles.smallText}>Blodsocker</Text>
        <HorizontalScroll
          onPress={setCurrentBS}
          triggerFunction={neededCorrection}
          scrollHeight={60}
          scrollData={numbers}
        />
        <Text style={styles.smallText}>Tagna enheter</Text>
        <HorizontalScroll
          smallNumber
          onPress={setActiveUnits}
          triggerFunction={submitActiveUnits}
          scrollHeight={60}
          scrollData={units}
        />
        <ActiveInsulin />
        <IconButton
          style={styles.settingsButton}
          icon="settings"
          color={Colors.primary}
          size={20}
          onPress={editProfileHandler}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  meSection: {
    margin: Styles.homeMargin,
    padding: 20,
    width: Styles.meHeight,
    height: Styles.meHeight,
  },
  meText: {
    fontFamily: Styles.defaultFontFamily,
    fontSize: 50,
    textAlign: 'center',
  },
  ringContainer: { position: 'absolute', top: 25, right: Styles.homeMargin },
  scrollView: {
    height: Styles.homeMargin + Styles.goalHeight + Styles.homeMargin,
  },
  ampmSection: {
    position: 'absolute',
    left: Styles.meHeight + Styles.homeMargin,
    margin: Styles.homeMargin,
    padding: 10,
    width: Styles.goalHeight,
    height: Styles.goalHeight,
  },
  smallText: {
    textAlign: 'center',
  },
  ampmText: {
    fontFamily: Styles.defaultFontFamily,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 5,
  },
  settingsButton: {
    position: 'absolute',
    top: 7,
    right: 6,
    zIndex: 100,
  },
  detailText: {
    marginTop: 100,
    padding: 10,
  },
});

export default HomeScreen;
