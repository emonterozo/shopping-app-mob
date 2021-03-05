import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { styles } from './Style';
import { userLogin } from '../../redux/actions/user';
import CSnackbar from '../../component/snackbar/Snackbar';
import CSpinner from '../../component/spinner/Spinner';
import { isEmpty } from '../../util/util';

const Signin = (props) => {
 const { isLoading, error } = useSelector(state => state.users)
 const dispacth = useDispatch()
 const [ state, setState ] = useState({
   email: '',
   password: ''
 })
 const [ isBtnDisable, setIsBtnDisable ] = useState(true)
 

  useEffect(() => {
    if (isEmpty(state.email) || isEmpty(state.password)) {
      setIsBtnDisable(true)
    } else {
      setIsBtnDisable(false)
    }
  },[state])

  const handleChange = (param, value) => {
    setState({
      ...state,
      [param]: value
    })
  }

  const login = () => {
    dispacth(userLogin(state))
  }


  return (
    <View style={styles.container}>
      { isLoading && <CSpinner />}
      { !isLoading && error && <CSnackbar description={error} />}
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputChild} value={state.email} label="Email Address" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('email', value)} />
          <TextInput secureTextEntry={true} value={state.password} style={styles.inputChild} label="Password" maxLength={20} mode="outlined" onChangeText={(value) => handleChange('password', value)} />
          <Button style={styles.inputChild} mode="contained" onPress={() => login()} disabled={ isBtnDisable } >
            Login
          </Button>
        </View>
        <View style={styles.optionContainer}>
          <Text>Don't have Account?</Text>
          <Button mode="text" onPress={() => props.navigation.replace('Signup')} >
            Click here
          </Button>
        </View>
    </View>
  )
}

export default Signin


