import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Spin, Layout, Row, Col, Tag, Affix } from 'antd';
import groupBy from 'lodash.groupby';
import { FormattedMessage, injectIntl } from 'react-intl';
import ScaffoldItem from '../components/ScaffoldItem';
import styles from './IndexPage.less';

const { Sider, Content } = Layout;

const filterTag = (list, tags, search) => list.filter((item) => {
  if (!tags && !search) {
    return true;
  }
  if (search && item.name.indexOf(search) < 0 && item.description.indexOf(search) < 0) {
    return false;
  }
  const queryTags = typeof tags === 'string' ? [tags] : [...(tags || [])];
  return queryTags.every(tag => (item.tags || []).indexOf(tag) >= 0);
});

const IndexPage = ({ list, groupedTags, location: { query } }) => {
  const tags = Object.keys(groupedTags);
  const filteredItem = filterTag(list, query.tags, query.search);
  const scaffoldItems = (list && list.length > 0) ? (
    <Layout className={styles.normal}>
      <Sider className={styles.sider} width={300}>
        <Affix offsetTop={63}>
          <section className={styles.tags}>
            <h3>
              <FormattedMessage id="home.alltags" />
              {query.tags ? <Link to="/"><FormattedMessage id="home.cleartags" /></Link> : null}
            </h3>
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
                        <Tag
                          className={queryTags.indexOf(tag) >= 0 ? `${styles.tag} selected` : styles.tag}
                        >
                          {tag}
                          <span className={styles.tagCount}>
                            | {groupedTags[tag].length}
                          </span>
                        </Tag>
                      </Link>
                    );
                  }) : <div className={styles.notfound}><FormattedMessage id="notags" /></div>
              }
            </section>
          </section>
        </Affix>
      </Sider>
      <Content style={{ overflow: 'visible' }}>
        <Row className={styles.list} gutter={32}>
          {
            filteredItem.length > 0 ?
              filteredItem.map(item => (
                <Col key={item.name} span={8}>
                  <ScaffoldItem {...item} />
                </Col>
              )) : <div className={styles.notfound}><FormattedMessage id="notfound" /></div>
          }
        </Row>
      </Content>
    </Layout>
  ) : (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  );
  return scaffoldItems;
};

IndexPage.propTypes = {
  list: PropTypes.array,
};

IndexPage.defaultProps = {
  list: [],
};

export default injectIntl(connect(({ list = [] }) => {
  let tags = [];
  list.forEach((item) => {
    if (item && item.tags) {
      tags = tags.concat(item.tags);
    }
  });
  return {
    list: list.sort((a, b) => b.stargazers_count - a.stargazers_count),
    groupedTags: groupBy(tags),
  };
})(IndexPage));
