import classes from './PopUpItems.module.css';
import {GiCancel} from 'react-icons/gi'

const PopUpItems = (props) => {
    const defaultAmount = 1;
    const addItemToCartHandler = () => {
        props.onAdd(defaultAmount);
        props.onClose();
    };

    return <section className={classes.popup}>
        <GiCancel className={classes.cancel}/>
        <p>{props.name}</p>
        <img className={classes.image} src={props.item} alt={props.name} />
        <p className={classes.description}>
            {props.description}
        </p>
        <div className={classes.cartbtn}>
            <button onClick={addItemToCartHandler}>+Add</button>
        </div>
    </section>
};

export default PopUpItems;