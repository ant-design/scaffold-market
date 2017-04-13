import React from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './ScaffoldItem.less';

export default function ScaffoldItem({ name, description, stargazers_count, coverPicture }) {
  return (
    <li className={styles.card}>
      <Link to={`/templates/${name}`}>
        <img className={styles.picture} src={coverPicture} alt="" />
        <div className={styles.detail}>
          <h2 className={styles.title}>
            {name}
          </h2>
          <div className={styles.description} title={description}>
            {description}
          </div>
          <div>
            <Icon type="star" className={styles.star} />{stargazers_count}
          </div>
        </div>
      </Link>
    </li>
  );
}
