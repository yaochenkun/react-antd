import './LoginRegister.css'
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { browserHistory } from 'react-router';
import $ from 'jquery';
const FormItem = Form.Item;

class VerticalRegisterForm_ extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // //在这里用正则验证输入合法性!!
        // $.ajax({
        //     url : 'http://localhost:8080/api/auth/registerValidate',
        //     type : 'POST',
        //     contentType: 'application/json',
        //     data : JSON.stringify({username : values.username, password : values.password}),
        //     dataType : 'json',
        //     success : (result) => {
        //         console.log(result);
        //         if(result.code == "SUCCESS") {
        //
        //             //保存状态信息
        //             sessionStorage.setItem("token", result.content.token);
        //             sessionStorage.setItem("username", result.content.username);
        //             sessionStorage.setItem("role", result.content.role);
        //
        //             message.success(result.reason);
        //             browserHistory.push('/user_home');
        //             return;
        //         } else {
        //             message.error(result.reason);
        //         }
        //     }
        // });
      }
    });
  }

  handleLogin = (e) => {
      e.preventDefault();
      let token = sessionStorage.getItem("token");


      browserHistory.push('/login');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名!' }],
            })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机/微信号" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
            })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入确认密码!' }],
            })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="确认密码" />
            )}
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                注&nbsp;&nbsp;册
            </Button>
            <a href="" onClick={this.handleLogin} style={{float:'right'}}>已有账号?</a>
        </FormItem>
      </Form>
    );
  }
}

const VerticalRegisterForm = Form.create()(VerticalRegisterForm_);
export default VerticalRegisterForm;
