import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { Modal, Text, Button, } from 'react-native-paper';

import CCard from '../../component/card/Card';
import CSpinner from '../../component/spinner/Spinner';
import * as Constant from '../../constant/constant';
import { roundNumber, dateNow } from '../../util/util';
import { userCartAddItem } from '../../redux/actions/cart';
import { userOrdersAdd } from '../../redux/actions/orders';


export default function Product() {
  const [ products, setProducts ] = useState([])
  const [  isLoading, setIsLoading ] = useState(true)
  const [ isModalShow, setIsModalShow ] = useState(false)
  const [ product, setProduct ] = useState([])
  const [ action, setAction ] = useState('')
  const isFocused = useIsFocused()
 
  
  useEffect(() => {
    getProducts()
  }, [isFocused])

  const getProducts = () => {
    setIsLoading(true)
    axios.get(`${Constant.BASE_URL}/products`)
    .then((response ) => {
      setProducts(response.data.products)
      setIsLoading(false)
    })
    .catch((error) => {
      setIsLoading(false)
      throw error
    })
  }

  const addProduct = (product, action) => {
    setProduct(product)
    setAction(action)
    toggleModal()
  }

  const toggleModal = () => {
      setIsModalShow(!isModalShow)
  }

  return (
    <SafeAreaView style={styles.container}>
      { isLoading && <CSpinner /> }
        <ScrollView contentContainerStyle={{padding: 10}}>
        {
            products.length > 0 &&
            products.map((product) => {
              return  <CCard product={product} addProduct={addProduct} /> 
            })
        }
        </ScrollView>
        {
          isModalShow && <CModal product={product} action={action} toggleModal={toggleModal} />
        }
    </SafeAreaView>
  );
}

function CModal(props) {
  const { users } = useSelector(state => state.users)
  const [ quantity, setQuantity ] = useState(1)
  const dispatch = useDispatch()
  const containerStyle = {backgroundColor: 'white', padding: 5, margin: 10};


  const addProduct = () => {
    props.toggleModal()
    if (props.action === "ADD") {
        dispatch(
            userCartAddItem(
                users[0]._id,
                props.product._id,
                quantity
            )
        )
    } else {
        const total = quantity * props.product.price

        const data = {
            userId: users[0]._id,
            orders: [
                {
                    product: props.product._id,
                    price: props.product.price,
                    quantity: quantity,
                    total_price: total,
                    order_date: dateNow()
        
                }
            ]
        }
       
        dispatch(userOrdersAdd(data))
    }
  }
  
  return (
    <Modal visible={true} onDismiss={props.toggleModal} contentContainerStyle={containerStyle}>
      <Text>{props.product.name}</Text>
      <Text>{`${props.product.currency} ${props.product.price}`}</Text>
      <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Total Amount: {props.product.currency} {roundNumber(quantity * props.product.price)}</Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Button mode="contained" onPress={() => setQuantity(quantity-1)} disabled={quantity <= 1 && true}>-</Button>
        <Text style={{alignSelf: 'center', marginHorizontal: 6}}>{quantity}</Text>
        <Button mode="contained" onPress={() => setQuantity(quantity+1)}>+</Button>
        </View>
      </View>
      <View>
        <Button mode="contained" onPress={() => addProduct()}>Confirm</Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
