import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import { Card, Layout, Spin, Icon, Button, Tag } from 'antd';
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
        <section className={styles.header}>
          <h2 title={scaffold.name}>{scaffold.name}</h2>
          <div className={styles.right}>
            <Icon type="star" className={styles.star} />{scaffold.stargazers_count}
          </div>
        </section>
        <p>{scaffold.description}</p>
        <section className={styles.links}>
          <a href={`/${scaffold.name}`} target="_blank" rel="noopener noreferrer">
            <Button type="primary" icon="eye-o">
              预览
            </Button>
          </a>
          <a href={`${scaffold.html_url}/archive/master.zip`} target="_blank" rel="noopener noreferrer">
            <Button icon="download">
              源码包
            </Button>
          </a>
          <a href={scaffold.html_url} target="_blank" rel="noopener noreferrer">
            <Button icon="github">
              查看仓库
            </Button>
          </a>
        </section>
        <hr />
        <section>
          <h3>基本信息</h3>
          <span
            className={styles.meta}
            title={moment(scaffold.created_at).format('YYYY-MM-DD HH:mm:ss')}
          >
            创建时间：{moment(scaffold.created_at).fromNow()}
          </span>
          <span
            className={styles.meta}
            title={moment(scaffold.created_at).format('YYYY-MM-DD HH:mm:ss')}
          >
            更新时间：{moment(scaffold.updated_at).fromNow()}
          </span>
          <span className={styles.meta}>提交人：{scaffold.author}</span>
        </section>
        <hr />
        <section>
          <h3>标签</h3>
          <section>
            {
              (scaffold.tags && scaffold.tags.length > 0)
                ? scaffold.tags.map(tag => (
                  <Link to={`/?tags=${tag}`} key={tag}>
                    <Tag>{tag}</Tag>
                  </Link>
                ))
                : <div className={styles.notfound}>暂无标签</div>
            }
          </section>
        </section>
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
