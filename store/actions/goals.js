import firebase from 'firebase';
import { AsyncStorage } from 'react-native';

import Goal from '../../models/goal';

export const DELETE_GOAL = 'DELETE_GOAL';
export const CREATE_GOAL = 'CREATE_GOAL';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const CHANGE_GOAL_STATUS = 'CHANGE_GOAL_STATUS';
export const CHANGE_GOAL_AGREEMENT = 'CHANGE_GOAL_AGREEMENT';
export const SET_GOALS = 'SET_GOALS';

export function fetchGoals() {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem('userData').then((data) =>
      data ? JSON.parse(data) : {}
    );
    const uid = userData.userId;

    try {
      console.log('Fetching goals...');
      const goalSnapshot = await firebase.database().ref('goals').once('value');

      if (goalSnapshot.exists) {
        const normalizedGoalData = goalSnapshot.val();
        const allGoals = [];
        const userGoals = [];

        for (const key in normalizedGoalData) {
          const goal = normalizedGoalData[key];
          const newGoal = new Goal(key, goal.ownerId, goal.date, goal.number);

          allGoals.push(newGoal);

          if (goal.ownerId === uid) {
            userGoals.push(newGoal);
          }
        }

        await dispatch({
          type: SET_GOALS,
          goals: allGoals,
          userGoals,
        });
        console.log(`Goals:`);
        console.log(`...${allGoals.length} total goals found and loaded.`);
        console.log(`...${userGoals.length} goals created by the user found and loaded.`);
      }
    } catch (error) {
      console.log('Error in actions/goals/fetchGoals: ', error);
      throw error;
    }
  };
}

export function createGoal(number) {
  return async (dispatch) => {
    const currentDate = new Date().toISOString();
    const userData = await AsyncStorage.getItem('userData').then((data) =>
      data ? JSON.parse(data) : {}
    );
    const ownerId = userData.userId;

    try {
      console.log('Creating goal...');

      //First convert the base64 image to a firebase url...
      const goalData = {
        ownerId,
        date: currentDate,
        number,
      };

      const { key } = await firebase.database().ref('goals').push(goalData);

      const newGoalData = {
        ...goalData,
        id: key,
      };

      dispatch({
        type: CREATE_GOAL,
        goalData: newGoalData,
      });
      console.log(`...created new goal with id ${key}:`, newGoalData);
    } catch (error) {
      console.log('Error in actions/goals/createGoal: ', error);
      throw error;
    }
  };
}
