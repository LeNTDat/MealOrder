import classes from './Loader.module.css';

const Loader = () => {
    return <section className={classes.load}>
        <span className={classes.loader}></span>
        <p>Please wait ... </p>
    </section>
};

export default Loader;