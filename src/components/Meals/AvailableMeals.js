import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import PaginationMeals from './PaginationMeals';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import MealSearchItems from './MealItems/MealSearchItems';
import CartContext from '../../store/cart-context';

const AvailableMeals = () => {

    const [dumMeals, setDumMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [filterItems, setFilterItems] = useState([]); 
    const {isFilter} = useContext(CartContext);   

    const fetchMealApi = async () => {
        try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            const data = await response.data.meals;
            if (response.status === 200) {
                setDumMeals(data);
                setIsLoading(false);
            } else {
                throw new Error('Something when wrong !!!');
            }
        } catch (error) {
            setIsLoading(false);
            setHttpError(error.message);
        }
    };

    useEffect(() => {
        fetchMealApi();
    }, []);


    if (httpError) {
        return <section className={classes.error}>
            <p>{httpError}</p>
        </section>
    }

    if (isLoading) {
        return <section className={classes.load}>
            <span className={classes.loader}></span>
            <p>Loading</p>
        </section>
    }
    
    const onSearchAndFilterItemsHandler = (value)=>{
        setFilterItems(value);
    }


    return <section className={classes.meals}>
        <Card>
            <MealSearchItems items={dumMeals} onSearch= {onSearchAndFilterItemsHandler}/>
            {!isFilter ? <PaginationMeals items={dumMeals}/>:
            <PaginationMeals items={filterItems}/>}
        </Card>
    </section>
};

export default AvailableMeals;