/* eslint react/no-danger: 0 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import Overdrive from 'react-overdrive';
import { Card, Layout, Spin, Icon, Button, Tag, Popover } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import ReactDisqusComments from 'react-disqus-comments';
import styles from './ScaffoldPage.less';

const { Sider, Content } = Layout;

class ScaffoldPage extends PureComponent {
  state = {
    popupVisible: false,
  };
  componentDidMount() {
    const { list, params } = this.props;
    const scaffold = list.filter(item => item.name === params.templateId)[0];
    if (!scaffold || !('stargazers_count' in scaffold) || !scaffold.readme) {
      this.props.dispatch({
        type: 'scaffold/fetch',
        payload: params.templateId,
      });
    }
    window.scrollTo(0, 0);
  }
  onVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
  }
  triggerDeploy = (e, name) => {
    e.preventDefault();
    this.setState({ popupVisible: false });
    this.props.dispatch({
      type: 'contribute/deploy',
      payload: { name },
      intl: this.props.intl,
    });
  }
  render() {
    const { list, params, intl } = this.props;
    const scaffold = list.filter(item => item.name === params.templateId)[0];
    let content;
    if (!scaffold) {
      content = (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      );
    } else {
      const scaffoldPreviewUrl = scaffold.homepage;
      content = (
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
              {scaffoldPreviewUrl && (
                <a href={scaffoldPreviewUrl} target="_blank" rel="noopener noreferrer">
                  <Button type="primary" icon="eye-o">
                    <FormattedMessage id="scaffold.preview" />
                  </Button>
                </a>
              )}
              {scaffold.html_url && (
                <a href={`${scaffold.html_url}/archive/master.zip`} target="_blank" rel="noopener noreferrer">
                  <Button icon="download">
                    <FormattedMessage id="scaffold.download" />
                  </Button>
                </a>
              )}
              {scaffold.html_url && (
                <a href={scaffold.html_url} target="_blank" rel="noopener noreferrer">
                  <Button icon="github">
                    <FormattedMessage id="scaffold.repo" />
                  </Button>
                </a>
              )}
            </section>
            <hr />
            <section>
              <h3>
                <FormattedMessage id="scaffold.information" />
              </h3>
              <span
                className={styles.meta}
                title={moment(scaffold.created_at).format('YYYY-MM-DD HH:mm:ss')}
              >
                <FormattedMessage id="scaffold.createdAt" />:&nbsp;{moment(scaffold.created_at).fromNow()}
              </span>
              <span
                className={styles.meta}
                title={moment(scaffold.updated_at).format('YYYY-MM-DD HH:mm:ss')}
              >
                <FormattedMessage id="scaffold.updatedAt" />:&nbsp;{moment(scaffold.updated_at).fromNow()}
              </span>
              <span
                className={styles.meta}
                title={moment(scaffold.deployedAt).format('YYYY-MM-DD HH:mm:ss')}
              >
                <FormattedMessage id="scaffold.deployedAt" />:&nbsp;
                <Popover
                  visible={this.state.popupVisible}
                  onVisibleChange={this.onVisibleChange}
                  content={
                    <a
                      href=""
                      onClick={e => this.triggerDeploy(e, scaffold.name)}
                      className={styles.redeploy}
                    >
                      <Icon type="rocket" />
                      <FormattedMessage id="scaffold.redeploy" />
                    </a>
                  }
                >
                  {moment(scaffold.deployedAt).fromNow()}
                </Popover>
              </span>
              <span className={styles.meta}>
                <FormattedMessage id="scaffold.author" />:&nbsp;
                <a href={`https://github.com/${scaffold.author}`} target="_blank" rel="noopener noreferrer">
                  {scaffold.author}
                </a>
              </span>
              <span className={styles.meta}>
                <FormattedMessage id="scaffold.language" />:&nbsp;{scaffold.language}
              </span>
            </section>
            <hr />
            <section>
              <h3>
                <FormattedMessage id="scaffold.tags" />
              </h3>
              <section>
                {
                  (scaffold.tags && scaffold.tags.length > 0)
                    ? scaffold.tags.map(tag => (
                      <Link to={`/?tags=${tag}`} key={tag}>
                        <Tag>{tag}</Tag>
                      </Link>
                    ))
                    : <div className={styles.notfound}><FormattedMessage id="notags" /></div>
                }
              </section>
            </section>
          </Sider>
          <Content>
            {
              scaffold.coverPicture ? (
                <Card className={styles.card} title={<FormattedMessage id="scaffold.screenshot" />}>
                  <Overdrive id={`cover-${scaffold.name}`}>
                    <img src={scaffold.coverPicture} alt="" />
                  </Overdrive>
                </Card>
              ) : null
            }
            <Card className={styles.card} title="README">
              {scaffold.readme
                ? (
                  <div
                    className={styles.markdown}
                    dangerouslySetInnerHTML={{ __html: scaffold.readme }}
                  />
              ) : <Spin />
              }
            </Card>
            <ReactDisqusComments
              shortname="scaffolds-1"
              identifier={scaffold.name}
              title={scaffold.name}
            />
          </Content>
        </Layout>
      );
    }
    return (
      <div>
        <Helmet>
          <title>
            {scaffold ? `${scaffold.name} - ${intl.formatMessage({ id: 'title.home' })}` : 'loading...'}
          </title>
        </Helmet>
        {content}
      </div>
    );
  }
}

export default injectIntl(connect(props => ({
  list: props.scaffold.list,
}))(ScaffoldPage));
