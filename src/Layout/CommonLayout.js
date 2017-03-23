import React from 'react';
import { Button, Icon } from 'antd';
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
  handleLocaleChange = () => {
    const locale = this.state.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    localStorage.setItem('locale', locale);
    this.setState({ locale });
  }
  render() {
    const { dispatch, user, children } = this.props;
    const { locale } = this.state;
    const appLocale = locale === 'zh-CN' ? zhCN : enUS;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <div>
          <header className={styles.header}>
            <h1 className={styles.title}>
              <Link to="/">LOGO</Link>
            </h1>
            <div className={styles.right}>
              {user ? (
                <span>
                  <Link className={styles.link} to="contribute">
                    <Icon type="plus-circle-o" />
                    <FormattedMessage id="submit" />
                  </Link>
                  <Link className={styles.link} to="help">
                    <Icon type="question-circle-o" />
                    <FormattedMessage id="help" />
                  </Link>
                  {!user.logining && (
                    <span>
                      <img alt="avatar" className={styles.avatar} src={user.avatar_url} />
                      {user.name}
                    </span>
                  )}
                </span>
              ) : (
                <a onClick={() => dispatch({ type: 'auth/login' })}>
                  <Icon type="github" />
                  <FormattedMessage id="login" />
                </a>
              )}
              <Button
                className={styles.changeLocale}
                onClick={this.handleLocaleChange}
                size="small"
              >
                {locale === 'zh-CN' ? 'EN' : '中文'}
              </Button>
            </div>
          </header>
          <div className={styles.container}>
            {children}
          </div>
        </div>
      </IntlProvider>
    );
  }
}

export default connect(props => ({
  user: props.auth.user,
}))(CommonLayout);
