import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router';
import ScaffoldItem from '../components/ScaffoldItem';
import styles from './IndexPage.css';

function IndexPage({ list, user, dispatch }) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}> Ant-design Scaffold </h1>
      {user ? <div>
        <span> hello!
          {user.name}
          <img alt="avatar" className={styles.avatar}src={user.avatar_url} />
        </span>
        <Link className={styles.link} to="contribute">Contribute a new Scaffold</Link>
        <Link className={styles.link} to="help">How to create a new Scaffold</Link>
      </div> :
      <a onClick={() => dispatch({ type: 'auth/login' })} >login with github</a>}
      <ul className={styles.list}>
        {list.map((item, idx) =>
          <ScaffoldItem key={`${idx}-${item.name}`} data={item} styles={styles} />
        )}
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(props => ({
  list: props.list,
  user: props.auth.user,
}))(IndexPage);
