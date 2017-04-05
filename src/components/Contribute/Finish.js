import React from 'react';
import { Button } from 'antd';
import styles from './Finish.less';

export default () => (
  <div className={styles.container}>
    <h2>我们已经收到的你提交的信息</h2>
    <Button>立即查看</Button>
  </div>
);
