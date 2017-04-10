import React from 'react';
import { connect } from 'dva';
import { Card, Layout, Spin, Icon } from 'antd';
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
      <Sider className={styles.sider} width={400}>
        <div className={styles.header}>
          <h2 title={scaffold.name}>{scaffold.name}</h2>
          <div className={styles.right}>
            <Icon type="star" className={styles.star} />{scaffold.stargazers_count}
          </div>
        </div>
        <p>{scaffold.description}</p>
        <hr />
        <p>
          <h3>基本信息</h3>
          <span>提交人：{scaffold.author}</span>
          <span>提交时间：{scaffold.createdAt}</span>
          <span>更新时间：{scaffold.updatedAt}</span>
        </p>
        <hr />
        <p>
          <h3>标签</h3>
        </p>
      </Sider>
      <Content>
        <Card title="README" style={{ border: '1px solid #e9e9e9' }}>
          <ReactMarkdown source={scaffold.readme} className={styles.markdown} />
        </Card>
      </Content>
    </Layout>
  );
};

export default connect(props => ({
  list: props.list,
}))(ScaffoldPage);
