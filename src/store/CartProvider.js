import { useReducer } from 'react';
import CartContext from './cart-context';

const initCartItem = {
    items: [],
    totalAmount: 0
};
const contextReducer = (state, action) => {
    if (action.type === 'ADD') {
        const indexState = state.items.findIndex(item => item.name === action.val.name);
        if (indexState === -1) {
            const updatedState = state.items.concat(action.val);
            const updatedTotalAmount = state.totalAmount + (action.val.amount * action.val.price);
            return {
                items: updatedState,
                totalAmount: updatedTotalAmount
            };
        } else {
            let updateItemsIndex = state.items[indexState];
            updateItemsIndex.amount += action.val.amount;
            const updatedState = [...state.items];
            const updatedTotalAmount = state.totalAmount + (action.val.amount * action.val.price);
            console.log('this is update state', updateItemsIndex)
            console.log('this is total', updatedTotalAmount)
            return {
                items: updatedState,
                totalAmount: updatedTotalAmount
            }
        }
    }
    if (action.type === 'DELETE') {
        const indexState = state.items.findIndex(item => item.id === action.val);
        const itemsIndex = state.items[indexState];
        const updateState = [...state.items];
        if (itemsIndex.amount === 1) {
            if (state.items.length === 1 && state.items.length > 0) {
                return {
                    items: [],
                    totalAmount: 0
                };
            } else if(state.items.length > 1 ){
                updateState.splice(indexState , 1);
                const updatedTotalAmount = state.totalAmount - itemsIndex.price;
                return {
                    items: updateState,
                    totalAmount: updatedTotalAmount
                }
            }
        } else if (itemsIndex.amount > 1) {
            const stateIndexUpdate = updateState[indexState];
            stateIndexUpdate.amount -= 1;
            const updatedTotalAmount = state.totalAmount - stateIndexUpdate.price;
            return {
                items: updateState,
                totalAmount: updatedTotalAmount
            }
        }

    }
    return state;
};

const CartProvider = props => {
    const [state, dispatch] = useReducer(contextReducer, initCartItem);
    console.log(state)

    const addItemToCartHandler = (item) => {
        dispatch({ type: 'ADD', val: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatch({ type: 'DELETE', val: id });
    };

    const cartContext = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;