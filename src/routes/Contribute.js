import React from 'react';
import { connect } from 'dva';
import Start from '../components/Contribute/Start';
import Submit from '../components/Contribute/Submit';
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
    const { auth, contribute: { repo }, dispatch } = this.props;
    if (!auth) {
      return <div>you have not login</div>;
    }
    return (
      <div className={styles.contribute}>
        {repo
          ? <Submit dispatch={dispatch} repo={repo} />
          : <Start dispatch={dispatch} />}
      </div>
    );
  }
}

export default connect(props => ({
  auth: props.auth,
  contribute: props.contribute,
}))(Contribute);
