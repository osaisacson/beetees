import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Alert, TextInput, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import Loader from '../../components/states/Loader';
import { FormFieldWrapper, formStyles } from '../../components/wrappers/FormFieldWrapper';
import FormWrapper from '../../components/wrappers/FormWrapper';
import * as goalsActions from '../../store/actions/goals';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value, // From textChangeHandler = (inputIdentifier, text)
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AddGoal = (props) => {
  //Set states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      number: '',
    },
    inputValidities: {
      number: true,
    },
    formIsValid: true,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('Oj! Något gick fel, försök igen.', error, [{ text: 'OK' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Ojoj', 'Det verkar som något saknas i formuläret', [{ text: 'OK' }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(goalsActions.createGoal(formState.inputValues.number));
      props.navigation.goBack();
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, formState]);

  //Manages validation of title input
  const textChangeHandler = (inputIdentifier, text) => {
    //inputIdentifier and text will act as key:value in the form reducer

    let isValid = true;

    //If we haven't entered any value (its empty) set form validity to false
    if (inputIdentifier === 'number' && text.trim().length === 0) {
      isValid = false;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      <Text>HOLLLLAAAA</Text>
      <FormWrapper
        submitButtonText="Spara mål"
        handlerForButtonSubmit={submitHandler}
        isLoading={isLoading}>
        <FormFieldWrapper prompt="Skriv in en titel">
          <TextInput
            placeholder="Antal tagna enheter"
            maxLength={30}
            style={formStyles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, 'number')}
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
          />
        </FormFieldWrapper>
      </FormWrapper>
    </View>
  );
};

export default AddGoal;
