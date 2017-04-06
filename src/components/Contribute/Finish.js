import React from 'react';
import { Button, Icon } from 'antd';
import styles from './Finish.less';

export default () => (
  <div className={styles.container}>
    <Icon type="check-circle-o" className={styles.check} />
    <h2 className={styles.title}>我们已经收到的你提交的信息</h2>
    <div className={styles.description}>点击按钮跳转 Github 查看详情</div>
    <Button type="primary" size="large">立即查看</Button>
  </div>
);
