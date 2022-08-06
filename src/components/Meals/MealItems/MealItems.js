import classes from './MealItems.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItems = (props) => {

    const price = `$${props.price.toFixed(2)}`
    const ctx = useContext(CartContext);
    const getItemsHandler = (value)=>{
        const itemsInput = {
            id: props.id,
            name: props.name,
            price: props.price,
            amount: value
        };

        ctx.addItem(itemsInput);
    };


    return <li  className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id = {props.id} getItemAmount = {getItemsHandler}/>
        </div>
    </li>
};

export default MealItems;