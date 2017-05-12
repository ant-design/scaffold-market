import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import moment from 'moment';
import CommonLayout from './CommonLayout';
import { isLocaleZhCN } from '../utils';
import zhCN from '../locale/zh-CN';
import enUS from '../locale/en-US';

addLocaleData([...zhCN.data, ...enUS.data]);

class IntlCommonLayout extends React.Component {
  state = {
    locale: isLocaleZhCN() ? 'zh-CN' : 'en-US',
  }
  handleLocaleChange = () => {
    const locale = this.state.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
    localStorage.setItem('locale', locale);
    this.setState({ locale });
    moment.locale(locale);
  }
  render() {
    const { locale } = this.state;
    const appLocale = locale === 'zh-CN' ? zhCN : enUS;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <CommonLayout
          {...this.props}
          locale={locale}
          handleLocaleChange={this.handleLocaleChange}
        />
      </IntlProvider>
    );
  }
}

export default IntlCommonLayout;
