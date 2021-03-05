import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { productExist } from '../../util/util';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CCard = (props) => {
   
    const addItem = () => {
        props.add(
            props.cartItem,
            productExist(props.orders, props.cartItem.product._id) ? "REMOVE" : "ADD"
        )
    }

    return (
        <Card style={{marginVertical: 5}}>
            {
                props.product && <ProductItem name={props.product.name} price={`${props.product.currency} ${props.product.price}`} description={props.product.description} />
            }
            {
                props.order && <OrderItem order={props.order} />
            }
            {
                props.cartItem && <CartItem cartItem={props.cartItem} />
            }
            {
                !props.order && 
                <Card.Actions>
                    {
                        props.cartItem ? <Button onPress={() => props.delete(props.cartItem)}>Delete</Button> : <Button onPress={() => props.addProduct(props.product, "BUY")}>Buy</Button>
                    }
                    {
                        props.cartItem ? <Button onPress={() => addItem()}>
                        {
                            productExist(props.orders, props.cartItem.product._id) ? "Remove" : "Place"
                        }
                        </Button> : <Button onPress={() => props.addProduct(props.product, "ADD")}>Add to Cart</Button> 
                    }
                </Card.Actions>
            }
        </Card>
    )
}

const ProductItem = (props) => {
    const { name, price, description  } = props
   return (
    <View >
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title title={name} subtitle={price} />
            <Card.Content>
                <Paragraph>{description}</Paragraph>
            </Card.Content>
    </View>
   )
}

const CartItem = (props) => {
    const { product, quantity} = props.cartItem
    
    return (
        <View>
            <Card.Title title={product.name} subtitle={`${product.currency} ${product.price}`} />
            <Card.Content>
                <Text>{`Qty: ${quantity}`}</Text>
            </Card.Content>
        </View>
    )
}

const OrderItem = (props) => {
    const { order } = props
    return (
        <View>
            <Card.Title title={`${order.product.name} X ${order.quantity}`} subtitle={order.order_date} />
            <Card.Content>
                <Text>{`Total Amount: ${order.product.currency} ${order.total_price} `}</Text>
            </Card.Content>
        </View>
    )
}

export default CCard