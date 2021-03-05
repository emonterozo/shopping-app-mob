import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'

import { userLogout } from '../../redux/actions/user';


export default function Profile({ navigation }) {
  const { users } = useSelector(state => state.users)
  const dispatch = useDispatch()

  

  const log = () => {
      dispatch(userLogout())
  }

  return (
    <View style={styles.container}>
        <Text>Profile</Text>
        <Button mode="contained" onPress={() => log()} >
            Logout
          </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
