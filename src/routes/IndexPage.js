import React from 'react';
import { connect } from 'dva';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ScaffoldItem from '../components/ScaffoldItem';
import styles from './IndexPage.css';
import CommonLayout from '../Layout/CommonLayout';

function IndexPage({ list, user, dispatch }) {
  return (
    <CommonLayout>
      <div className={styles.normal}>
        {user ? <div>
          <span>
            <FormattedMessage id="welcome" />
            {user.name}
            <img alt="avatar" className={styles.avatar}src={user.avatar_url} />
          </span>
          <Link className={styles.link} to="contribute">Contribute a new Scaffold</Link>
          <Link className={styles.link} to="help">How to create a new Scaffold</Link>
        </div> :
        <a onClick={() => dispatch({ type: 'auth/login' })} >login with github</a>}
        <ul className={styles.list}>
          {list.map(item => <ScaffoldItem key={item.name} data={item} styles={styles} />)}
        </ul>
      </div>
    </CommonLayout>
  );
}

IndexPage.propTypes = {
};

export default connect(props => ({
  list: props.list,
  user: props.auth.user,
}))(IndexPage);
