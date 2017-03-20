import React from 'react';
import { connect } from 'dva';
import { Select, Button, Input, Form } from 'antd';

const FormItem = Form.Item;

const labelProps = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ConstributeForm({ contribute, dispatch, form }) {
  const { getFieldDecorator, validateFields } = form;
  return (
    <Form>
      <h3>Contribute to Antd Scaffold</h3>
      <FormItem label="source (github url)" hasFeedback {...labelProps} >
        {getFieldDecorator('url', {
          initialValue: 'https://github.com/dvajs/dva-example-user-dashboard/',
          rules: [
            { type: 'string', required: true, pattern: /^https?:\/\/(www\.)?github\.com\/([\w-]+)\/([\w-]+)\/?/, message: 'url must be valid github url' },
          ],
        })(<Input />)}
      </FormItem>
      {contribute.repo ? <div>
        <FormItem label="name " hasFeedback {...labelProps}>
          {getFieldDecorator('name', { initialValue: contribute.repo.name })(<Input readOnly />)}
        </FormItem>
        <FormItem label="git url" hasFeedback {...labelProps}>
          {getFieldDecorator('git_url', { initialValue: contribute.repo.git_url })(<Input readOnly />)}
        </FormItem>
        <FormItem label="chineseName " hasFeedback {...labelProps}>
          {getFieldDecorator('chineseName', { initialValue: contribute.repo.name })(<Input />)}
        </FormItem>
        <FormItem label="author " hasFeedback {...labelProps}>
          {getFieldDecorator('author', { initialValue: contribute.repo.owner.login })(<Input readOnly />)}
        </FormItem>
        <FormItem label="description " hasFeedback {...labelProps}>
          {getFieldDecorator('description', { initialValue: contribute.repo.description })(<Input />)}
        </FormItem>
        <FormItem label="version " hasFeedback {...labelProps}>
          {getFieldDecorator('version', { initialValue: '0.0.1' })(<Input />)}
        </FormItem>
        <FormItem label="industry " hasFeedback {...labelProps}>
          {getFieldDecorator('industry', { initialValue: contribute.repo.isReact ? 'react' : ' ' })(<Input />)}
        </FormItem>
        <FormItem label="source " hasFeedback {...labelProps}>
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
            onClick={() => validateFields((err, values) => {
              if (!err) {
                dispatch({ type: 'contribute/submit', payload: values });
              }
            })}
          >
            Submit
          </Button>
        </FormItem>
      </div> : <FormItem>
        <Button
          type="primary"
          onClick={() => validateFields(['url'], { force: true }, (err, values) => {
            if (!err) {
              dispatch({ type: 'contribute/validateRepo', payload: values.url });
            }
          })}
        >
          Next
        </Button>
      </FormItem>}
    </Form>
  );
}


export default connect(props => ({
  contribute: props.contribute,
  auth: props.auth,
}))(Form.create()(ConstributeForm));
