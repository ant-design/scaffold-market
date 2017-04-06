import React from 'react';
import { Select, Button, Input, Form } from 'antd';
import styles from './Submit.less';

const FormItem = Form.Item;

function Submit({ repo, dispatch, form, loading }) {
  if (!repo) {
    return null;
  }
  const { getFieldDecorator, validateFields } = form;
  return (
    <Form className={styles.form} layout="vertical">
      <h3 className={styles.title}>新建脚手架详情</h3>
      <div className={styles.description}>核对脚手架详情信息，确认无误后提交请求</div>
      <FormItem label="name " hasFeedback>
        {getFieldDecorator('name', { initialValue: repo.name })(<Input readOnly />)}
      </FormItem>
      <FormItem label="git url" hasFeedback>
        {getFieldDecorator('git_url', { initialValue: repo.git_url })(<Input readOnly />)}
      </FormItem>
      <FormItem label="chineseName " hasFeedback>
        {getFieldDecorator('chineseName', { initialValue: repo.name })(<Input />)}
      </FormItem>
      <FormItem label="author " hasFeedback>
        {getFieldDecorator('author', { initialValue: repo.owner.login })(<Input readOnly />)}
      </FormItem>
      <FormItem label="description " hasFeedback>
        {getFieldDecorator('description', { initialValue: repo.description })(<Input />)}
      </FormItem>
      <FormItem label="version " hasFeedback>
        {getFieldDecorator('version', { initialValue: '0.0.1' })(<Input />)}
      </FormItem>
      <FormItem label="industry " hasFeedback>
        {getFieldDecorator('industry', { initialValue: repo.isReact ? 'react' : ' ' })(<Input />)}
      </FormItem>
      <FormItem label="source " hasFeedback>
        {getFieldDecorator('source', { initialValue: 'npm' })(
          <Select>
            <Select.Option value="npm">npm</Select.Option>
            <Select.Option value="tnpm">tnpm</Select.Option>
          </Select>,
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          style={{ marginTop: 48 }}
          loading={loading.models.contribute}
          onClick={() => validateFields((err, values) => {
            if (!err) {
              dispatch({ type: 'contribute/submit', payload: values });
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
