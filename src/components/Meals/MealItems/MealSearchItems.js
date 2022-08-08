import { useRef, useContext } from 'react';
import classes from './MealSearchItems.module.css';
import { ImSearch } from 'react-icons/im';
import CartContext from '../../../store/cart-context';

const MealSearchItems = (props) => {
    const inputVal = useRef();
    const ctx = useContext(CartContext);

    const searchItem = () => {
        let valueInput = inputVal.current.value.toUpperCase();
        const listFilter = props.items.filter(items => items.strIngredient.toUpperCase().match(valueInput));
        props.onSearch(listFilter);
        if (valueInput.trim().length > 0) {
            ctx.setFilter(true);
        } else {
            ctx.setFilter(false);
        }
    };

    const onBlurSearchItems = () => {
        inputVal.current.value = '';
    };


    return <>
        <div className={classes.box}>
        </div>
        <div className={classes.box}>
            <ImSearch className={classes.search} />
            <p>Search</p>
            <input
                onBlur={onBlurSearchItems}
                onChange={searchItem}
                ref={inputVal}
                className={classes.input}
            >
            </input>
        </div>
    </>
};

export default MealSearchItems;