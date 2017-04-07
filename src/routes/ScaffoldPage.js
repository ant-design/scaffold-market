import React from 'react';
import { connect } from 'dva';
import { Card, Layout, Spin } from 'antd';
import styles from './ScaffoldPage.less';

const { Sider, Content } = Layout;

const ScaffoldPage = ({ list, params }) => {
  const scaffold = list.filter(item => item.name === params.templateId)[0];
  if (!scaffold) {
    return <Spin size="large" />;
  }
  return (
    <div className={styles.main}>
      <Layout>
        <Sider style={{ background: 'transparent' }}>
          {scaffold.name}
        </Sider>
        <Content>
          <Card title="README">
            content
          </Card>
        </Content>
      </Layout>
    </div>
  );
};

export default connect(props => ({
  list: props.list,
}))(ScaffoldPage);
