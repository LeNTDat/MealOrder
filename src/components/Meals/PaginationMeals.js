import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import MealItems from "./MealItems/MealItems";
import classes from "./PaginationMeals.module.css";

const Items = ({ currentItems }) => {
    return (
        <>
            {currentItems && currentItems.map(meal =>
                <MealItems
                    key={meal.idIngredient}
                    id={meal.idIngredient}
                    name={meal.strIngredient}
                    description={meal.strDescription === null ? `We are updating this info about ${meal.strIngredient}` : meal.strDescription }
                    price={0.99}
                />
            )}
        </>
    )
};

const PaginationMeals = (props) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemsOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + 10;
        setCurrentItems(props.items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(props.items.length / 10))
    }, [itemOffset, props.items]);

    const handlerPageClick = (e) => {
        const newOffSet = (e.selected * 10) % props.items.length;
        setItemsOffset(newOffSet);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <div className={classes.page}>
                <ReactPaginate
                    pageClassName ={classes['list-button']}
                    breakClassName ={classes.break}
                    onPageChange={handlerPageClick}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    previousLabel={null}
                    nextLabel={null}
                    pageRangeDisplayed={5}
                />
            </div>
        </>
    );
};

export default PaginationMeals;