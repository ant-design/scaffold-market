import React from 'react';
import { Icon, Button } from 'antd';

export default function ScaffoldItem({ data, styles }) {
  return (<li>
    <article>
      <header>{data.name}[{data.chineseName}]
        <a href={data.source}><Icon type="github" /></a>
      </header>
      <div>{data.description}</div>
      <div className={styles.actions}>
        <Button> Open in IDE</Button>
      </div>
    </article>
  </li>);
}
