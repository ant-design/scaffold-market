import React from 'react';
import { Select, Button, Input, Form, Upload, Icon, Progress } from 'antd';
import styles from './Submit.less';

const FormItem = Form.Item;
const { Dragger } = Upload;

function Submit({ repo, dispatch, form, loading }) {
  if (!repo) {
    return null;
  }
  const { getFieldDecorator, validateFields, getFieldValue } = form;
  const coverPicture = getFieldValue('coverPicture');
  const coverPictureUploading = (coverPicture && !coverPicture.response);
  const coverPictureUploaded = (coverPicture && coverPicture.response);
  return (
    <Form className={styles.form} layout="vertical">
      <h3 className={styles.title}>新建脚手架详情</h3>
      <div className={styles.description}>核对脚手架详情信息，确认无误后提交请求</div>
      <FormItem label="Name" hasFeedback>
        {getFieldDecorator('name', { initialValue: repo.name })(<Input readOnly />)}
      </FormItem>
      <FormItem label="GitHub Url" hasFeedback>
        {getFieldDecorator('git_url', { initialValue: repo.git_url })(<Input readOnly />)}
      </FormItem>
      <FormItem label="Author" hasFeedback>
        {getFieldDecorator('author', { initialValue: repo.owner.login })(<Input readOnly />)}
      </FormItem>
      <FormItem label="Description" hasFeedback>
        {getFieldDecorator('description', { initialValue: repo.description })(<Input />)}
      </FormItem>
      <FormItem label="Version" hasFeedback>
        {getFieldDecorator('version', {
          initialValue: '',
        })(<Input />)}
      </FormItem>
      <FormItem label="Tags" hasFeedback>
        {getFieldDecorator('tags', { initialValue: [] })(
          <Select mode="tags" placeholder="please input tags" />,
        )}
      </FormItem>
      <FormItem label="Cover Picture">
        {
          coverPictureUploaded && (
            <div className={styles.cover}>
              <img
                src={`https://ucarecdn.com/${coverPicture.response.file}/`}
                className={styles.cover}
                alt=""
              />
            </div>
          )
        }
        {getFieldDecorator('coverPicture', {
          getValueFromEvent: ({ file }) => file,
        })(
          <Dragger
            className={`${styles.upload} ${coverPictureUploaded ? styles.hidden : ''}`}
            action="https://upload.uploadcare.com/base/"
            data={{
              UPLOADCARE_PUB_KEY: '7a0444cf0307d71d796b',
              UPLOADCARE_STORE: 1,
            }}
            multiple
            headers={{ 'X-Requested-With': null }}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            {
              coverPictureUploading ? (
                <Progress
                  style={{ width: '80%' }}
                  strokeWidth={6}
                  showInfo={false}
                  percent={coverPicture.percent}
                  status="active"
                />
              ) : <p className="ant-upload-text">Click or drag file to this area to upload</p>
            }
          </Dragger>,
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          style={{ marginTop: 48 }}
          loading={loading.models.contribute}
          onClick={() => validateFields((err, values) => {
            if (!err) {
              dispatch({
                type: 'contribute/submit',
                payload: {
                  ...values,
                  coverPicture: `https://ucarecdn.com/${coverPicture.response.file}/`,
                },
              });
            }
          })}
        >
          Submit
        </Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Submit);
