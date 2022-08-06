import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick = {props.closeHandler}></div>
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    );
};

const portalEle = document.getElementById('overlay');

const Modal = (props) => {
 
    return <>
        {ReactDOM.createPortal(<Backdrop closeHandler = {props.closeHandler}/>, portalEle)}
        {ReactDOM.createPortal(<ModalOverlay onClose = {props.onClose}>{props.children}</ModalOverlay>, portalEle)}
    </>
};

export default Modal;