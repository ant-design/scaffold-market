import React from 'react';
import { connect } from 'dva';
import styles from './ScaffoldPage.less';

const ScaffoldPage = ({ list, params }) => {
  const scaffold = list.filter(item => item.name === params.templateId);
  return (
    <div className={styles.main}>
      {JSON.stringify(scaffold)}
    </div>
  );
};

export default connect(props => ({
  list: props.list,
}))(ScaffoldPage);
