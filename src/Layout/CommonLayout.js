import React from 'react';
import { Radio } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import styles from './CommonLayout.less';
import { isLocaleZhCN } from '../utils';
import zhCN from '../locale/zh-CN';
import enUS from '../locale/en-US';

addLocaleData([...zhCN.data, ...enUS.data]);

class CommonLayout extends React.Component {
  state = {
    locale: isLocaleZhCN() ? 'zh-CN' : 'en-US',
  }
  handleLocaleChange = (e) => {
    localStorage.setItem('locale', e.target.value);
    this.setState({
      locale: e.target.value,
    });
  }
  render() {
    const { dispatch, user, children } = this.props;
    const appLocale = this.state.locale === 'zh-CN' ? zhCN : enUS;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>
              <Link to="/">Logo</Link>
            </h1>
            <Radio.Group
              value={this.state.locale}
              onChange={this.handleLocaleChange}
              className={styles.changeLocale}
              size="small"
            >
              <Radio.Button value="en-US">English</Radio.Button>
              <Radio.Button value="zh-CN">中文</Radio.Button>
            </Radio.Group>
            <div className={styles.right}>
              {user ? (
                <div>
                  <span>
                    <FormattedMessage id="welcome" />
                    {user.name}
                    <img alt="avatar" className={styles.avatar} src={user.avatar_url} />
                  </span>
                  <Link className={styles.link} to="contribute">Contribute a new Scaffold</Link>
                  <Link className={styles.link} to="help">How to create a new Scaffold</Link>
                </div>
              ) : (
                <a onClick={() => dispatch({ type: 'auth/login' })}>
                  <FormattedMessage id="login" />
                </a>
              )}
            </div>
          </header>
          <div>{children}</div>
        </div>
      </IntlProvider>
    );
  }
}

export default connect(props => ({
  user: props.auth.user,
}))(CommonLayout);
