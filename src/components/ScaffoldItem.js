import React from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import Overdrive from 'react-overdrive';
import styles from './ScaffoldItem.less';

export default function ScaffoldItem({ name, description, stargazers_count, coverPicture }) {
  const picture = coverPicture || `https://placeholdit.imgix.net/~text?txtsize=60&bg=ed33ba&txtclr=ffffff&txt=${name}&w=560&h=360&txttrack=0`;
  return (
    <li className={styles.card}>
      <Link to={`/scaffolds/${name}`}>
        <Overdrive id={`cover-${name}`} duration={400}>
          <img className={styles.picture} src={picture} alt="" />
        </Overdrive>
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
