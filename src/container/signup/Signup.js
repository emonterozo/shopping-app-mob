import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, useWindowDimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { styles } from './Style';
import { isEmpty, isEightChar, isValidEmail, isEqual }from '../../util/util';
import CHelper from '../../component/helper/Helper';
import CSpinner from '../../component/spinner/Spinner';
import CSnackbar from '../../component/snackbar/Snackbar';
import { userRegister } from '../../redux/actions/user';

const Signup = (props) => {
  const [ state, setState ] = useState({
    firstname: '',
    lastname: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [ isBtnDisable, setIsBtnDisable ] = useState(true)
  const { isLoading, error } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const windowHeight = useWindowDimensions().height;

  const handleChange = (param, value) => {
    setState({
      ...state,
      [param]: value
    })
  }

  useEffect(() => {
    if ( isEmpty(state.firstname) || isEmpty(state.lastname) || isEmpty(state.address) 
    || isEmpty(state.email) || isEmpty(state.password) || isEmpty(state.confirmPassword) || !isValidEmail(state.email) || !isEightChar(state.password) || !isEqual(state.password, state.confirmPassword) ) {
      setIsBtnDisable(true)
    } else {
      setIsBtnDisable(false)
    }
  }, [state])


  const register = () => {
    dispatch(userRegister(state))
  }


  return (
    <View style={[{ minHeight: Math.round(windowHeight), flex: 1, alignItems: 'center' }]}>
      { isLoading && <CSpinner />}
      { !isLoading && error && <CSnackbar description={error} />}
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputChild} label="Firstname" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('firstname', value)} value={state.firstname} />

          <TextInput style={styles.inputChild} label="Lastname" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('lastname', value)} value={state.lastname} />

          <TextInput style={styles.inputChild} label="Address" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('address', value)} value={state.address} />
          
          <TextInput style={styles.inputChild} label="Email Address" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('email', value)} value={state.email} />
          {  
            !isEmpty(state.email) && !isValidEmail(state.email) && <CHelper type="error" message="Email Address is invalid!" />
          }

          <TextInput secureTextEntry={true} style={styles.inputChild} label="Password" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('password', value)} value={state.password} />
          {  
            !isEmpty(state.password) && !isEightChar(state.password) && <CHelper type="error" message="Password should atleast 8 characters long!" />
          }

          <TextInput secureTextEntry={true} style={styles.inputChild} label="Confirm Password" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('confirmPassword', value)} value={state.confirmPassword} />
          {
            !isEmpty(state.confirmPassword) && !isEqual(state.password, state.confirmPassword) && <CHelper type="error" message="Password not macth!" />
          }

          <Button style={styles.inputChild} mode="contained" disabled={isBtnDisable} onPress={() => register()} >
            Create Account
          </Button>
        </View>
        <View style={styles.optionContainer}>
          <Text>Alredy have Account?</Text>
          <Button mode="text" onPress={() => props.navigation.replace('Signin')}>
            Click here
          </Button>
        </View>
    </View>
  )
}

export default Signup


