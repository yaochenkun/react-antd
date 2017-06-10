import './Login.css';
import {SERVER, LOADING_DELAY_TIME} from './../App/public.js';
import React from 'react';
import { Layout,Carousel,Form, Icon, Input, Button, message, Spin} from 'antd';
import $ from 'jquery';
import { browserHistory } from 'react-router';
const { Header, Content, Sider, Footer} = Layout;
const FormItem = Form.Item;


//登录表单
class VerticalLoginForm_ extends React.Component {
  handleLogin = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        //在这里用正则验证输入合法性!!
        $.ajax({
            url : SERVER + '/api/auth/login',
            type : 'POST',
            contentType: 'application/json',
            data : JSON.stringify({phone : values.phone, password : values.password}),
            dataType : 'json',
            success : (result) => {
                console.log(result);
                if(result.code == "SUCCESS") {

                    //保存状态信息
                    sessionStorage.setItem("token", result.content.token);
                    sessionStorage.setItem("phone", result.content.phone);
                    sessionStorage.setItem("role", result.content.role);
                    sessionStorage.setItem("expiredTime", result.content.duration);

                    message.success(result.reason, 2);
                    browserHistory.push('/user_home');
                    return;
                } else {

                    this.props.handleLoading(false, e); //关闭进度条
                    message.error(result.reason, 2);
                }
            }
        });

        //打开加载条
        this.props.handleLoading(true, e);
      }
    });
  }

  handleRegister = (e) => {
      e.preventDefault();
      let token = sessionStorage.getItem("token");

      browserHistory.push('/register');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleLogin} className="login-form">
        <FormItem>
            {getFieldDecorator('phone', { rules: [{ required: true, message: '请输入用户名!' }],
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



class Login extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
    loading: false
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleLoading = (onoff, e) => {
    e.preventDefault();
    this.setState({
      loading : onoff
    })
  }

  render() {

    return (

        <Spin spinning={this.state.loading} delay={LOADING_DELAY_TIME} tip='登录中'>
          <Layout>
              <Header style={{ color: 'white', fontSize:'20px'}}>
                医海慈航
              </Header>
              <Layout style={{backgroundColor:'#fff'}}>
                  <Content style={{ margin: '50px 0px 50px 50px',padding:'50px 0px 50px 0px', width:'70%', minHeight:600}}>
                    <Carousel autoplay>
                        <div style={{height:400}}><img src='1.jpg' style={{width:'100%', height:'100%'}}/></div>
                        <div style={{height:400}}><img src='2.jpg' style={{width:'100%', height:'100%'}}/></div>
                        <div style={{height:400}}><img src='3.jpg' style={{width:'100%', height:'100%'}}/></div>
                     </Carousel>
                  </Content>
                  <Sider style={{margin: '50px 0px',padding:'50px 50px', minWidth:'30%', minHeight:540, backgroundColor:'#fff'}}>
                    <VerticalLoginForm handleLoading={this.handleLoading}/>
                  </Sider>
              </Layout>
              <Header style={{ textAlign: 'center', color: 'white'}}>
                医海慈航 ©2017 Created by BUPT
              </Header>
          </Layout>
        </Spin>
    );
  }
}

export default Login;
