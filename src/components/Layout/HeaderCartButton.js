import { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [isBumpBtn, setIsBumpBtn] = useState(false);

    const context = useContext(CartContext);

    const { items } = context;

    let itemsIndex = items.reduce((curValue, item) => {
        return curValue + item.amount;
    }, 0);

    const classesBtn = `${classes.button} ${isBumpBtn ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) { return }

        setIsBumpBtn(true);

        const timer = setTimeout(()=>{
            setIsBumpBtn(false);
        },300);

        return ()=>{
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={classesBtn} onClick={props.onShowCart}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{itemsIndex}</span>
    </button>
}

export default HeaderCartButton;