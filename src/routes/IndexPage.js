import React, { PropTypes } from 'react';
import { connect } from 'dva';
import ScaffoldItem from '../components/ScaffoldItem';
import styles from './IndexPage.css';

const IndexPage = ({ list }) => (
  <div className={styles.normal}>
    <ul className={styles.list}>
      {list.map(item => <ScaffoldItem key={item.name} data={item} styles={styles} />)}
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
