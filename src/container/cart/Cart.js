import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

import { userCartRequest, userCartRemoveItem } from '../../redux/actions/cart';
import { userOrdersAdd } from '../../redux/actions/orders';
import CSpinner from '../../component/spinner/Spinner';
import CCard from '../../component/card/Card';
import { roundNumber, totalAmount, dateNow, productExist } from '../../util/util';


export default function Cart() {
  const { users } = useSelector(state => state.users)
  const { cartItems, isLoading } = useSelector(state => state.cartItems)
  const [ orders, setOrders ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userCartRequest(users[0]._id))
  }, [])

  const placeItem = (item, action) => {
    const productId = item.product._id
    const price = item.product.price
    const quantity = item.quantity
    const total = roundNumber(quantity * price)

    if (action === 'ADD') {
        setOrders([...orders, {
            product: productId,
            price: price,
            quantity: quantity,
            total_price: total,
            order_date: dateNow()
        }])
    } else {
        setOrders(orders.filter(({ product }) => product !== item.product._id))
    }
}

  const deleteItem = (item) => {
      placeItem(item, "REMOVE")
      const data = {
          userId: users[0]._id,
          items: [item.product._id]
      }
      dispatch(userCartRemoveItem(data))
  }

  const checkOut = () => {
    const data = {
        userId: users[0]._id,
        orders: orders
    }
    const products = []

    cartItems.forEach(item => {
        const order = productExist(orders, item.product._id)
        if (order)
            products.push(item.product._id)
    })

    const cart = {
        userId: users[0]._id,
        items: products
    }

    setOrders([])
    dispatch(userOrdersAdd(data))
    dispatch(userCartRemoveItem(cart))
  }

  return (
    <SafeAreaView style={styles.container}>
        { isLoading && <CSpinner />}
        <ScrollView contentContainerStyle={{padding: 10}}>
          {
            cartItems.length > 0 &&
            cartItems.map((cartItem) => {
              return <CCard cartItem={cartItem} delete={deleteItem} add={placeItem} orders={orders} />
            })
          }
        </ScrollView>
        <View style={{backgroundColor: '#292b2c', flexBasis: '10%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <Text style={{color: 'white'}}>Total Amount: {roundNumber(totalAmount(orders))}</Text>
          <Button mode="contained" onPress={() => checkOut()}>
              Check Out
          </Button>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
