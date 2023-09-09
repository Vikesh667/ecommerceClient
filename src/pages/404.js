import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/PageNotFound.module.css'; // Import the CSS Module

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <p className={styles.errorcode}>404</p>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.message}>
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className={styles.link}>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
