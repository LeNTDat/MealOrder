import classes from './PopUpItems.module.css';

const PopUpItems = (props) => {
    const addItemToCartHandler = ()=>{
        props.onAdd(1); 
        props.onClose();
    };

    return <section className={classes.popup}>
        <p className={classes.cancel}>X
        </p>
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