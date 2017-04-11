import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Spin, Layout, Row, Col, Tag } from 'antd';
import groupBy from 'lodash.groupby';
import ScaffoldItem from '../components/ScaffoldItem';
import styles from './IndexPage.less';

const { Sider, Content } = Layout;

const filterTag = (list, tags) => list.filter((item) => {
  if (!tags) {
    return true;
  }
  const queryTags = typeof tags === 'string' ? [tags] : [...tags];
  return queryTags.every(tag => (item.tags || []).indexOf(tag) >= 0);
});

const IndexPage = ({ list, groupedTags, location: { query } }) => {
  const tags = Object.keys(groupedTags);
  return (
    <Layout className={styles.normal}>
      <Sider className={styles.sider} width={300}>
        <section className={styles.tags}>
          <h3>全部标签</h3>
          <section>
            {
              (tags && tags.length > 0)
                ? tags.map((tag) => {
                  const queryTags = typeof query.tags === 'string'
                    ? [query.tags]
                    : [...(query.tags || [])];
                  const newTags = [...queryTags];
                  if (newTags.indexOf(tag) >= 0) {
                    newTags.splice(newTags.indexOf(tag), 1);
                  } else {
                    newTags.push(tag);
                  }
                  return (
                    <Link
                      to={{
                        pathname: '/',
                        query: { tags: newTags },
                      }}
                      key={tag}
                    >
                      <Tag color={queryTags.indexOf(tag) >= 0 ? 'blue-inverse' : undefined}>
                        {tag}
                        <span className={styles.tagCount}>
                          | {groupedTags[tag].length}
                        </span>
                      </Tag>
                    </Link>
                  );
                })
                : <div className={styles.notfound}>暂无标签</div>
            }
          </section>
        </section>
      </Sider>
      <Content style={{ overflow: 'visible' }}>
        <Row className={styles.list} gutter={32}>
          {
            (list && list.length > 0)
              ? filterTag(list, query.tags).map(item => (
                <Col key={item.name} span={8}>
                  <ScaffoldItem {...item} />
                </Col>
              ))
              : (
                <div className={styles.loading}>
                  <Spin size="large" />
                </div>
              )
          }
        </Row>
      </Content>
    </Layout>
  );
};

IndexPage.propTypes = {
  list: PropTypes.array,
};

IndexPage.defaultProps = {
  list: [],
};

export default connect(({ list = [] }) => {
  let tags = [];
  list.forEach((item) => {
    if (item && item.tags) {
      tags = tags.concat(item.tags);
    }
  });
  return {
    list,
    groupedTags: groupBy(tags),
  };
})(IndexPage);
