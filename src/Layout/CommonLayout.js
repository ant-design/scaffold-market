import React from 'react';
import { Button, Icon, Input } from 'antd';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { FormattedMessage, injectIntl } from 'react-intl';
import styles from './CommonLayout.less';

class CommonLayout extends React.Component {
  handleLocaleChange = (...args) => {
    const { handleLocaleChange } = this.props;
    handleLocaleChange(...args);
  }
  handleSearch = (e) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(e.target.value ? `/?search=${e.target.value}` : ''));
  }
  render() {
    const { dispatch, user, children, locale, location: { pathname }, intl } = this.props;
    return (
      <div>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              <Link to="/">
                <img alt="logo" src="https://zos.alipayobjects.com/rmsportal/HXZvKsbcQljpFToWbjPj.svg" />
                <FormattedMessage id="title.home" />
              </Link>
            </h1>
            <span className={styles.searchWrapper}>
              <Input
                className={styles.search}
                prefix={<Icon type="search" style={{ marginLeft: 10 }} />}
                placeholder={intl.formatMessage({ id: 'header.search' })}
                onChange={this.handleSearch}
              />
            </span>
            <div className={styles.right}>
              {user ? (
                <span>
                  <Link className={styles.link} to="contribute">
                    <Icon type="plus-circle-o" />
                    <FormattedMessage id="header.submit" />
                  </Link>
                  {!user.logining && (
                    <span>
                      <img alt="avatar" className={styles.avatar} src={user.avatar_url} />
                      {user.name}
                    </span>
                  )}
                </span>
              ) : (
                <span>
                  <Link className={styles.link} to="contribute">
                    <Icon type="plus-circle-o" />
                    <FormattedMessage id="header.submit" />
                  </Link>
                  <a onClick={() => dispatch({ type: 'auth/login' })}>
                    <Icon type="github" />
                    <FormattedMessage id="header.login" />
                  </a>
                </span>
              )}
              <Button
                className={styles.changeLocale}
                onClick={this.handleLocaleChange}
                size="small"
              >
                {locale === 'zh-CN' ? 'EN' : '中文'}
              </Button>
            </div>
          </div>
        </header>
        {
          pathname === '/' ? (
            <div className={styles.banner}>
              <div className={styles.bannerText}>
                <FormattedMessage id="home.slogan" />
              </div>
              <div className={styles.bannerFeatures}>
                <FormattedMessage id="banner.feature1" />
                <span className={styles.bannerDot}>∙</span>
                <FormattedMessage id="banner.feature2" />
                <span className={styles.bannerDot}>∙</span>
                <FormattedMessage id="banner.feature3" />
              </div>
              <Link to="contribute">
                <button className={styles.submit}>
                  <FormattedMessage id="home.submit" />
                </button>
              </Link>
            </div>
          ) : null
        }
        <div className={styles.container}>
          {children}
        </div>
        <footer className={styles.footer}>
          <div>Copyright © 2017</div>
          <div>
            <FormattedMessage id="title.home" />
            <img alt="logo" src="https://zos.alipayobjects.com/rmsportal/HXZvKsbcQljpFToWbjPj.svg" />
            <FormattedMessage id="footer.created" />
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(props => ({
  user: props.auth.user,
}))(injectIntl(CommonLayout));
