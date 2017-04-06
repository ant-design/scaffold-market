import React from 'react';
import { connect } from 'dva';
import Start from '../components/Contribute/Start';
import Submit from '../components/Contribute/Submit';
import Finish from '../components/Contribute/Finish';
import styles from './Contribute.less';

class Contribute extends React.Component {
  componentWillMount() {
    if (!this.props.auth.user) {
      this.props.dispatch({ type: 'auth/login' });
    }
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'contribute/saveRepo', pyaload: null });
  }
  render() {
    const { auth, contribute: { repo }, dispatch, location, loading } = this.props;
    if (!auth) {
      return <div>you have not login</div>;
    }
    let children;
    if (location.pathname.indexOf('contribute/finish') > 0) {
      children = <Finish dispatch={dispatch} repo={repo} loading={loading} />;
    } else {
      children = repo
        ? <Submit dispatch={dispatch} repo={repo} loading={loading} />
        : <Start dispatch={dispatch} loading={loading} />;
    }
    return (
      <div className={styles.contribute}>
        {children}
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  contribute: state.contribute,
  loading: state.loading,
}))(Contribute);
