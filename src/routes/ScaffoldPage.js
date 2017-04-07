import React from 'react';
import { connect } from 'dva';
import { Card, Layout, Spin } from 'antd';
import ReactMarkdown from 'react-markdown';
import styles from './ScaffoldPage.less';

const { Sider, Content } = Layout;

const ScaffoldPage = ({ list, params }) => {
  const scaffold = list.filter(item => item.name === params.templateId)[0];
  if (!scaffold) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Layout>
      <Sider style={{ background: 'transparent' }} width="400">
        <h2>{scaffold.name}</h2>
      </Sider>
      <Content>
        <Card title="README">
          <ReactMarkdown source={scaffold.readme} />
        </Card>
      </Content>
    </Layout>
  );
};

export default connect(props => ({
  list: props.list,
}))(ScaffoldPage);
