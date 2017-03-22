import React from 'react';
import { Radio } from 'antd';
import { IntlProvider, addLocaleData } from 'react-intl';
import styles from './CommonLayout.less';
import { isLocaleZhCN } from '../utils';
import zhCN from '../locale/zh-CN';
import enUS from '../locale/en-US';

addLocaleData([...zhCN.data, ...enUS.data]);

export default class CommonLayout extends React.Component {
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
    const appLocale = this.state.locale === 'zh-CN' ? zhCN : enUS;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <div className={styles.container}>
          <h1 className={styles.title}>Ant-design Scaffold</h1>
          <Radio.Group
            value={this.state.locale}
            onChange={this.handleLocaleChange}
          >
            <Radio.Button value="en-US">English</Radio.Button>
            <Radio.Button value="zh-CN">中文</Radio.Button>
          </Radio.Group>
          <div {...this.props} />
        </div>
      </IntlProvider>
    );
  }
}
