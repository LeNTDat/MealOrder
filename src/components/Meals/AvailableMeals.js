import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import PaginationMeals from './PaginationMeals';
import { useContext, useEffect, useState } from 'react';
import MealSearchItems from './MealItems/MealSearchItems';
import CartContext from '../../store/cart-context';
import useFetch from '../../hooks/useFetch';
import Loader from '../UI/Loader';

const AvailableMeals = () => {
    const [dumMeals, setDumMeals] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const { isFilter } = useContext(CartContext);
    const dataItems = isFilter ? filterItems : dumMeals;
    const { isLoading, httpError, fetchMealApi } = useFetch();

    const getMealData = (data) => {
        setDumMeals(data.meals);
    };

    useEffect(() => {
        fetchMealApi({
            method: 'GET',
            url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
            params:{},
            headers:{}

        }, getMealData);
    }, [fetchMealApi]);

    if (httpError) {
        return <section className={classes.error}>
            <p>{httpError}</p>
        </section>;
    };

    if (isLoading) {
        return <Loader />
    };

    const onSearchAndFilterItemsHandler = (value) => {
        setFilterItems(value);
    };

    return <section className={classes.meals}>
        <Card>
            <MealSearchItems items={dumMeals} onSearch={onSearchAndFilterItemsHandler} />
            <PaginationMeals items={dataItems} />
        </Card>
    </section>
};

export default AvailableMeals;