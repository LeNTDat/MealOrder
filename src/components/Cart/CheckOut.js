import { useRef } from 'react';
import classes from './CheckOut.module.css';


const Checkout = (props) => {
    const enterdName = useRef();
    const enterdStreet = useRef();
    const enterdPostalCode = useRef();
    const enterdCity = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
    };

    const submitDataHandler = (e)=>{
        e.preventDefault();
        let name = enterdName.current.value;
        let street = enterdStreet.current.value;
        let postcode = enterdPostalCode.current.value;
        let city = enterdCity.current.value;
        if(name.trim().length > 0 && street.trim().length > 0 && postcode.trim().length > 0 && city.trim().length > 0){
            const entered = {
                name, 
                street,
                postcode,
                city
            }
            props.onSubmit(entered)
        }else{
            return;
        }
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input ref={enterdName} type='text' id='name' />
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input ref={enterdStreet} type='text' id='street' />
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={enterdPostalCode} type='text' id='postal' />
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input ref={enterdCity} type='text' id='city' />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.closeHandler}>
                    Cancel
                </button>
                <button onClick={submitDataHandler} className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;