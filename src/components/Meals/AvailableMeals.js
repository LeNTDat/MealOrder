import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItems from './MealItems/MealItems';
import axios from 'axios';
import {  useEffect, useState } from 'react';



// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {

    const [dumMeals, setDumMeals] = useState();


    const fetchMealApi = async () => {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            setDumMeals(response.data.categories);
        };


    useEffect(() => {
        fetchMealApi();
    }, []);
    
    const mealList = dumMeals?.map(meal => <MealItems
        key={meal.idCategory}
        id={meal.idCategory}
        name={meal.strCategory}
        description={meal.strCategoryDescription}
        price={0.69 * Math.random() * meal.idCategory}
    />)

    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealList}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;