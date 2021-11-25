import React, { Fragment } from 'react';
import styles from './Page.module.css';
import hooks from '../../hooks/useForecast';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Form';
import useForcast from '../../hooks/useForecast';

const Page = () => {
    const {isError, isLoading, forecast, submitRequest} = useForcast();

    const onSubmit = value => {
        submitRequest(value)
    }

    return (
        <Fragment>
            <Header />
            <div className={styles.box}>
            {/* Form */}
            { !isLoading && <Form submitSearch={onSubmit}/>}
            {/* Error */}
            { isError && <Error message={isError} />}
            {/* Loader */}
            { isLoading && <Loader />}
            </div>
            {/* Forecast */}
            { forecast && <Forecast />}
        </Fragment>
    );
};

export default Page;
