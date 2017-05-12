import React from 'react';
import { Button, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import styles from './Finish.less';

export default ({ url }) => (
  <div className={styles.container}>
    <Icon type="check-circle-o" className={styles.check} />
    <h2 className={styles.title}>
      <FormattedMessage id="submit.finish.title" />
    </h2>
    <div className={styles.description}>
      <FormattedMessage id="submit.finish.description" />
    </div>
    <a href={url}>
      <Button type="primary" size="large">
        <FormattedMessage id="submit.finish.button" />
      </Button>
    </a>
  </div>
);
