import { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './CheckOut';
import useFetch from '../../hooks/useFetch';

const Cart = (props) => {
    const CtxCart = useContext(CartContext);
    const [isOrder, setIsOrder] = useState(false);
    const { fetchMealApi } = useFetch();
    const onSubmitHandler = (value)=>{
        const data = {
            cartItem :CtxCart.items,
            address :value
        }
        fetchMealApi({
            method: 'POST',
            url: 'https://food-oder-4edb3-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
            data: {data}
        });
        props.onCloseHandler();
    };


    const onAddItemHandler = (value) => {
        CtxCart.addItem(value);
    }

    const onRemoveItemHandler = (value) => {
        CtxCart.removeItem(value)
    }

    const onOrderHandler = () => {
        setIsOrder(true);
    };

    const cartItems = CtxCart.items.map((item) =>
        <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={onAddItemHandler.bind(null, {
                id: item.id,
                name: item.name,
                price: item.price,
                amount: 1
            })}
            onRemove={onRemoveItemHandler.bind(null, item.id)}

        ></CartItem>
    );

    const hasItem = CtxCart.items.length > 0;

    const totalPrice = `$${CtxCart.totalAmount.toFixed(2)}`;

    const modalActions = <div className={classes.actions}>
        <button onClick={props.onCloseHandler} >Close</button>
        {hasItem && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
    </div>

    return (
        <Modal onClose={props.isShow} closeHandler={props.onCloseHandler}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            {isOrder && <Checkout closeHandler={props.onCloseHandler} onSubmit = {onSubmitHandler}/>}
            {!isOrder && modalActions}
        </Modal>
    )
};

export default Cart;