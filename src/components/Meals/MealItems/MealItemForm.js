import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) =>{
    const inputAmount = useRef();
    const [isValidNumber , setIsValidNumber] = useState(true);

    const onSubmitHandler = (e)=>{
        e.preventDefault();

        const amountEnterd = inputAmount.current.value;
        const amountEnterdNumber = +amountEnterd;
        if(amountEnterd.trim().length === 0 || amountEnterdNumber < 1 || amountEnterdNumber > 5 ) {
            setIsValidNumber(false);
            return;
        }
        setIsValidNumber(true);
        props.getItemAmount(amountEnterdNumber);
    };

    return (
        <form className={classes.form}>
            <Input label = "Amount" ref = {inputAmount} input = {{
                id:'amount_'+ props.id,
                type :'number',
                min:'1',
                max:'5', 
                step :'1',
                defaultValue :'1'
            }}/>
            <button onClick={onSubmitHandler}>+ Add</button>
            {!isValidNumber && <p>Please enter valid number</p>}
        </form>
    );
};

export default MealItemForm;