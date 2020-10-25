import Goal from '../../models/goal';
import { CREATE_GOAL, SET_GOALS } from '../actions/goals';

const initialState = {
  availableGoals: [],
  userGoals: [],
  loading: false,
};

export default (state = initialState, action) => {
  //Switch cases
  switch (action.type) {
    case SET_GOALS:
      return {
        availableGoals: action.goals,
        userGoals: action.userGoals,
      };
    case CREATE_GOAL: {
      const newGoal = new Goal(
        action.goalData.id,
        action.goalData.ownerId,
        action.goalData.date,
        action.goalData.number
      );
      console.log('store/reducers/goals/CREATE_GOAL, new goal: ', newGoal);
      return {
        ...state,
        availableGoals: state.availableGoals.concat(newGoal),
        userGoals: state.userGoals.concat(newGoal),
      };
    }
  }
  return state;
};
