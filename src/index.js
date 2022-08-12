import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/admin" element = {<Cart/>}></Route>
        </Routes>
    </BrowserRouter>
);
