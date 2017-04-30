import React from 'react';
import { Select, Button, Input, Form, Upload, Icon, Progress, Tooltip, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import styles from './Submit.less';

const FormItem = Form.Item;
const { Dragger } = Upload;

function Submit({ repo, dispatch, form, loading, intl }) {
  if (!repo) {
    return null;
  }
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = form;
  const coverPicture = getFieldValue('coverPicture');
  const coverPictureUploading = (coverPicture && !coverPicture.response);
  const coverPictureUploaded = (
    coverPicture && coverPicture.response && coverPicture.response.file
  );
  return (
    <Form className={styles.form} layout="vertical">
      <h3 className={styles.title}>
        <FormattedMessage id="submit.title" />
      </h3>
      <div className={styles.description}>
        <FormattedMessage id="submit.detail.title.description" />
      </div>
      <FormItem label={<FormattedMessage id="submit.detail.name" />} hasFeedback>
        {getFieldDecorator('name', { initialValue: repo.name })(<Input readOnly />)}
      </FormItem>
      <FormItem label={<FormattedMessage id="submit.detail.url" />} hasFeedback>
        {getFieldDecorator('git_url', { initialValue: repo.git_url })(<Input readOnly />)}
      </FormItem>
      <FormItem label={<FormattedMessage id="submit.detail.author" />} hasFeedback>
        {getFieldDecorator('author', { initialValue: repo.owner.login })(<Input readOnly />)}
      </FormItem>
      <FormItem label={<FormattedMessage id="submit.detail.description" />} hasFeedback>
        {getFieldDecorator('description', { initialValue: repo.description })(<Input />)}
      </FormItem>
      <FormItem label={<FormattedMessage id="submit.detail.tag" />} hasFeedback>
        {getFieldDecorator('tags', { initialValue: [] })(
          <Select mode="tags" placeholder={intl.formatMessage({ id: 'submit.detail.tag.placeholder' })} />,
        )}
      </FormItem>
      <FormItem label={<FormattedMessage id="submit.detail.cover" />}>
        {
          coverPictureUploaded && (
            <div className={styles.cover}>
              <img
                src={`https://ucarecdn.com/${coverPicture.response.file}/`}
                alt="loading..."
              />
              <Tooltip title="Remove">
                <Icon
                  className={styles.deletePicture}
                  type="cross"
                  onClick={() => setFieldsValue({ coverPicture: undefined })}
                />
              </Tooltip>
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
            onChange={({ file }) => {
              if (file.status === 'done') {
                message.success('上传成功！');
              }
            }}
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
            ) : (
              <p className="ant-upload-text">
                <FormattedMessage id="submit.detail.cover.upload" />
              </p>
            )
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
                  coverPicture: coverPicture ? `https://ucarecdn.com/${coverPicture.response.file}/` : null,
                },
              });
            }
          })}
        >
          <FormattedMessage id="submit.detail.submit" />
        </Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Submit);
