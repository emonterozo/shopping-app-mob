import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';

import { userOrdersRequest } from '../../redux/actions/orders';
import CSpinner from '../../component/spinner/Spinner';
import CCard from '../../component/card/Card';


export default function Order() {
  const { orders, isLoading } = useSelector(state => state.orders)
  const { users } = useSelector(state => state.users)
  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(userOrdersRequest(users[0]._id))
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
        { isLoading && <CSpinner />}
        <ScrollView contentContainerStyle={{padding: 10}}>
          {
            orders.length > 0 &&
            orders.map((order) => {
              return <CCard order={order} />
            })
          }
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
