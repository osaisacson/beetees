import moment from 'moment';
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as goalsActions from '../../store/actions/goals';
import Error from '../states/Error';
import Loader from '../states/Loader';

const ActiveInsulin = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //Get original goals from state
  const goals = useSelector((state) => state.goals.availableGoals);

  const dispatch = useDispatch();

  //Load goals
  const loadGoals = useCallback(async () => {
    setError(null);
    try {
      console.log('Goals: fetching goals...');
      dispatch(goalsActions.fetchGoals());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  if (error) {
    return <Error actionOnPress={loadGoals} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      {goals.map((item) => (
        <View key={item.id}>
          <Text>{item.number}HOLA</Text>
          <Text>{moment(item.date).format('MMMM Do YYYY, hh:mm')}</Text>
        </View>
      ))}
    </View>
  );
};

export default ActiveInsulin;
