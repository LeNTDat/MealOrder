import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
 
  const [cartShow, setCartShow] = useState(false);

  const CloseCartHandler = ()=>{
    setCartShow(false);
  };

  const ShowCartHandler = ()=>{
    setCartShow(true);
  };

  return (
    <CartProvider>
      {cartShow && <Cart isShow = {cartShow} onCloseHandler = {CloseCartHandler}/>}
      <Header onShowHandler = {ShowCartHandler} />
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
