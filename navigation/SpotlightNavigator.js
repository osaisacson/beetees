import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import usePopToTopOnBlur from '../hooks/usePopToTopOnBlur';
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen, {
  screenOptions as editProfileScreenOptions,
} from '../screens/addAndEdit/EditProfileScreen';
import GoalDetailScreen from '../screens/details/GoalDetailScreen';
import { detailHeader, defaultNavOptions, defaultMainPageOptions } from './NavHeaders';

const SpotlightStackNavigator = createStackNavigator();

export const SpotlightNavigator = ({ navigation }) => {
  usePopToTopOnBlur(navigation, 'Beetees');

  return (
    <SpotlightStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SpotlightStackNavigator.Screen
        name="Beetees"
        component={HomeScreen}
        options={defaultMainPageOptions}
      />
      {/* Details */}
      <SpotlightStackNavigator.Screen
        name="GoalDetail"
        component={GoalDetailScreen}
        options={detailHeader}
      />
      {/* Edits */}
      <SpotlightStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={editProfileScreenOptions}
      />
    </SpotlightStackNavigator.Navigator>
  );
};
