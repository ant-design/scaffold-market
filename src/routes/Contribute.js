import React from 'react';
import { connect } from 'dva-react-router-3';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
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
    const { auth, contribute: { repo }, dispatch, location, loading, intl } = this.props;
    if (!auth || !auth.accessToken) {
      return (
        <div className={styles.nologin}>
          <FormattedMessage id="nologin" />
        </div>
      );
    }
    let children;
    if (location.pathname.indexOf('contribute/finish') > 0) {
      children = <Finish dispatch={dispatch} loading={loading} url={location.query.pull} />;
    } else {
      children = repo
        ? <Submit dispatch={dispatch} repo={repo} loading={loading} intl={intl} />
        : <Start dispatch={dispatch} loading={loading} intl={intl} />;
    }
    return (
      <div className={styles.contribute}>
        <Helmet>
          <title>
            {intl.formatMessage({ id: 'title.submit' })}
          </title>
        </Helmet>
        {children}
      </div>
    );
  }
}

export default injectIntl(connect(state => ({
  auth: state.auth,
  contribute: state.contribute,
  loading: state.loading,
}))(Contribute));
