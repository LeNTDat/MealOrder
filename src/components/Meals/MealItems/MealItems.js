import classes from './MealItems.module.css';
import MealItemForm from './MealItemForm';
import { useContext, useState } from 'react';
import CartContext from '../../../store/cart-context';
import Modal from '../../UI/Modal';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../UI/Loader';
import PopUpItems from './PopUpItems';

const MealItems = (props) => {
    const {name,description} = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const [takedItem, setTakeItem] = useState('');
    const price = `$${props.price.toFixed(2)}`
    const ctx = useContext(CartContext);
    const fetchOption = {
        method: 'GET',
        url: 'https://google-image-search1.p.rapidapi.com/v2/',
        params: { q: props.name, hl: 'en' },
        headers: {
            'X-RapidAPI-Key': 'd0f191bd7cmsh4dae4f35680e3b4p143012jsn0b66ad6455f7',
            'X-RapidAPI-Host': 'google-image-search1.p.rapidapi.com'
          }
    }
    const { isLoading, fetchMealApi } = useFetch();

    const getItemsHandler = (value) => {
        const itemsInput = {
            id: props.id,
            name: props.name,
            price: props.price,
            amount: value
        };
        ctx.setFilter(false);
        ctx.addItem(itemsInput);
    };

    const getItemImageHandler = (data) => {
        setTakeItem(data.response.images[0].thumbnail.url);
    };

    const showModalItemsHandler = () => {
        setIsShowModal(true);
        fetchMealApi(fetchOption, getItemImageHandler)
    };

    const closeModalItemsHandler = () => {
        setIsShowModal(false);
    };

    const popUpItem = isLoading ? <Loader /> : <PopUpItems 
    item = {takedItem} 
    name = {name} 
    description={description} 
    onClose={closeModalItemsHandler} 
    onAdd = {getItemsHandler}/>;

    return <>
        {isShowModal && (<Modal closeHandler={closeModalItemsHandler} onClose={isShowModal}>
            {popUpItem}
        </Modal>)}
        <li className={classes.meal}>
            <div>
                <h3 onClick={showModalItemsHandler}>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} getItemAmount={getItemsHandler} />
            </div>
        </li>
    </>
};

export default MealItems;