import React from 'react';
import { Button, Input, Form } from 'antd';
import styles from './Start.less';

const FormItem = Form.Item;

function Start({ dispatch, form, loading }) {
  const { getFieldDecorator, validateFields } = form;
  const onSubmit = () => {
    validateFields(['url'], { force: true }, (err, values) => {
      if (!err) {
        dispatch({ type: 'contribute/validateRepo', payload: values.url });
      }
    });
  };
  return (
    <Form className={styles.form}>
      <h3 className={styles.title}>
        提交一个脚手架
      </h3>
      <FormItem>
        {getFieldDecorator('url', {
          initialValue: 'https://github.com/dvajs/dva-example-user-dashboard/',
          rules: [{
            type: 'string',
            required: true,
            pattern: /^https?:\/\/(www\.)?github\.com\/([\w-]+)\/([\w-]+)\/?/,
            message: 'url must be valid github url',
          }],
        })(<Input className={styles.input} autoComplete="off" placeholder="请填写脚手架的 GitHub 地址" />)}
      </FormItem>
      <FormItem style={{ marginTop: 60 }}>
        <Button
          type="primary"
          size="large"
          loading={loading.models.contribute}
          onClick={onSubmit}
        >
          添加项目
        </Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Start);
