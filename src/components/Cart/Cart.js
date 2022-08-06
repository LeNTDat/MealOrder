import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const CtxCart = useContext(CartContext);

    const onAddItemHandler = (value) => {
        CtxCart.addItem(value);
    }

    const onRemoveItemHandler = (value) => {
        CtxCart.removeItem(value)
    }

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
            className={classes['cart-items']}
        ></CartItem>
    );

    const hasItem = CtxCart.items.length > 0;

    const totalPrice = `$${CtxCart.totalAmount.toFixed(2)}`;

    return (
        <Modal onClose={props.isShow} closeHandler={props.onCloseHandler}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCloseHandler} >Close</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;