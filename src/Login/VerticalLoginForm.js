import './Login.css'
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { hashHistory } from 'react-router';
import $ from 'jquery';
const FormItem = Form.Item;

class VerticalLoginForm_ extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        //在这里用正则验证输入合法性!!
        $.ajax({
            url : 'http://localhost:8080/api/auth/login',
            type : 'POST',
            // contentType: "application/json; charset=utf-8",
            data : JSON.stringify({'username':values.username,'password':values.password}),
            dataType : 'JSON',
            success : (userInfo) => {
                console.log(userInfo);
                // if(userInfo.logon == true) {
                //
                //     //保存状态信息
                //     sessionStorage.setItem("username", userInfo.username);
                //     sessionStorage.setItem("role", userInfo.role);
                //     sessionStorage.setItem("logon", userInfo.logon);
                //
                //     hashHistory.push('/user_home');
                // } else {
                //     alert("登录失败！");
                // }
            }
        });
      }
    });
  }

  handleRegister = (e) => {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名!' }],
            })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
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
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                登&nbsp;&nbsp;录
            </Button>
            <a href="" onClick={this.handleRegister} style={{float:'right'}}>注册</a>
        </FormItem>
      </Form>
    );
  }
}

const VerticalLoginForm = Form.create()(VerticalLoginForm_);
export default VerticalLoginForm;
