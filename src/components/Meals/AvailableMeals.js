import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import PaginationMeals from './PaginationMeals';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {

    const [dumMeals, setDumMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


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
            console.log(response)
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

    return <section className={classes.meals}>
        <Card>
            <PaginationMeals items={dumMeals} />
        </Card>
    </section>
};

export default AvailableMeals;