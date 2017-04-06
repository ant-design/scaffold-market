import React from 'react';
import { Button, Input, Form } from 'antd';
import styles from './Start.less';

const FormItem = Form.Item;

function Start({ dispatch, form, loading }) {
  const { getFieldDecorator, validateFields } = form;
  return (
    <Form className={styles.form}>
      <h3 className={styles.title}>在 Template 上添加一个项目</h3>
      <FormItem>
        {getFieldDecorator('url', {
          initialValue: 'https://github.com/dvajs/dva-example-user-dashboard/',
          rules: [{ type: 'string',
            required: true,
            pattern: /^https?:\/\/(www\.)?github\.com\/([\w-]+)\/([\w-]+)\/?/,
            message: 'url must be valid github url',
          }],
        })(<Input className={styles.input} placeholder="请填写脚手架的 GitHub 地址" />)}
      </FormItem>
      <FormItem style={{ marginTop: 55 }}>
        <Button
          type="primary"
          size="large"
          loading={loading.models.contribute}
          onClick={() => validateFields(['url'], { force: true }, (err, values) => {
            if (!err) {
              dispatch({ type: 'contribute/validateRepo', payload: values.url });
            }
          })}
        >
          添加项目
        </Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Start);
