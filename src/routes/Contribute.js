import React from 'react';
import { connect } from 'dva';
import ContributeForm from '../components/ContributeForm';
import styles from './Contribute.css';

class Contribute extends React.Component {
  componentWillMount() {
    if (!this.props.auth.user) {
      this.props.dispatch({ type: 'auth/login' });
    }
  }
  render() {
    const { auth } = this.props;
    if (!auth) {
      return <div>you have not login</div>;
    }
    return (
      <div className={styles.contribute}>
        <ContributeForm />
      </div>
    );
  }
}

export default connect(props => ({
  auth: props.auth,
  contribute: props.contribute,
}))(Contribute);
