import React from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'dva/router';

export default function ScaffoldItem({ data, styles }) {
  return (
    <li>
      <article>
        <header>
          <Link to={`/templates/${data.name}`}>
            {data.name}[{data.chineseName}]
          </Link>
          <a href={data.source}><Icon type="github" /></a>
        </header>
        <div>{data.description}</div>
        <div><Icon type="star" />{data.stargazers_count}</div>
        <div className={styles.actions}>
          <Button.Group>
            <Button>
              <a href={`${data.name}`} target="_blank" rel="noopener noreferrer">
                DEMO
              </a>
            </Button>
          </Button.Group>
        </div>
      </article>
    </li>
  );
}
