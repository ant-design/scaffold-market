import React from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import Overdrive from 'react-overdrive';
import hash from 'string-hash';
import styles from './ScaffoldItem.less';

function getBackgroundColor(url) {
  // preset colors for default cover picture
  const colors = [
    '#f46e65',
    '#f78e3d',
    '#ffce3d',
    '#3dbd7d',
    '#3db8c1',
    '#2db7f5',
    '#f7629e',
  ];
  return colors[hash(url) % 7].replace('#', '');
}

export default function ScaffoldItem({ name, description, stargazers_count, coverPicture, url }) {
  let picture;
  if (coverPicture) {
    picture = `${coverPicture}-/resize/600x/`;
  } else {
    picture = `https://placeholdit.imgix.net/~text?txtsize=60&bg=${getBackgroundColor(url)}&txtclr=ffffff&txt=${name}&w=560&h=360&txttrack=0`;
  }
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
