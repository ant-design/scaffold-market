import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import ScaffoldItem from '../components/ScaffoldItem';
import styles from './IndexPage.css';

const IndexPage = ({ list }) => (
  <div className={styles.normal}>
    <ul className={styles.list}>
      {(list && list.length > 0)
        ? list.map(item => <ScaffoldItem key={item.name} {...item} />)
        : (
          <div className={styles.loading}>
            <Spin size="large" />
          </div>
        )}
    </ul>
  </div>
);

IndexPage.propTypes = {
  list: PropTypes.array,
};

IndexPage.defaultProps = {
  list: [],
};

export default connect(props => ({
  list: props.list,
}))(IndexPage);
