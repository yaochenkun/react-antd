import './Register.css';
import {SERVER, REGEX, LOADING_DELAY_TIME} from './../App/public.js';
import React from 'react';
import { Layout,Carousel,Form, Icon, Input, Button, Checkbox, message, Spin} from 'antd';
import { browserHistory } from 'react-router';
import $ from 'jquery';
const { Header, Content, Sider, Footer} = Layout;
const FormItem = Form.Item;

//注册表单
class VerticalRegisterForm_ extends React.Component {

  state = {
      isSendSmsBtnDisabled: false,
      sendSmsBtnStr: '发送验证码',
      countDown: 60 //倒计时
  }

  //请求注册
  handleRegister = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        $.ajax({
            url : SERVER + '/api/auth/register',
            type : 'POST',
            contentType: 'application/json',
            data : JSON.stringify({phone : values.phone,
                                   password : values.password,
                                   inputCode : values.inputCode}),
            dataType : 'json',
            success : (result) => {
                console.log(result);
                if(result.code == "SUCCESS") {
                    message.success(result.reason, 2);
                    browserHistory.push('/login');
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

  //请求发送验证码
  handleSendSms = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, values) => {

          if (!err) {
              $.ajax({
                  url : SERVER + '/api/auth/send_sms',
                  type : 'POST',
                  contentType: 'application/json',
                  data : JSON.stringify({phone : values.phone}),
                  dataType : 'json',
                  success : () => {
                      console.log("后端已生成验证码");
                      var timer = setInterval(() => {
                          this.setState({
                              isSendSmsBtnDisabled: true,
                              sendSmsBtnStr: '重新发送 ' + (--this.state.countDown),
                          });

                          if(this.state.countDown == 0) {
                              this.setState({
                                  isSendSmsBtnDisabled: false,
                                  sendSmsBtnStr: '重新发送',
                                  countDown: 60 //倒计时
                              });

                              //停止倒计时
                              clearInterval(timer);
                          }
                      }, 1000);
                  }
              });
          }
      });
  }

  handleToLoginPage = (e) => {
      e.preventDefault();
      browserHistory.push('/login');
  }


  handleConfirmPassword = (rule, value, callback) => {

      let password = this.props.form.getFieldValue('password');
      let confirmPassword = this.props.form.getFieldValue('confirmPassword');
      if(confirmPassword == '' || password !== confirmPassword) {
          callback("两次密码输入不一致");
      }
      callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleRegister} className="login-form">
        <FormItem>
            {getFieldDecorator('phone', { rules: [{ required: true, message: '请输入用户名' },{pattern: REGEX.PHONE, message:'请输入合法手机号'}],
            })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
            })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('confirmPassword', {
            rules: [{validator: this.handleConfirmPassword}],
            })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="确认密码" />
            )}
        </FormItem>

        <FormItem>
            {getFieldDecorator('inputCode')(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="验证码" style={{width:'55%'}}/>
            )}
            <Button disabled={this.state.isSendSmsBtnDisabled}
                    onClick={this.handleSendSms}
                    className="login-form-button"
                    style={{width:'40%', float:'right'}}>
                {this.state.sendSmsBtnStr}
            </Button>
        </FormItem>


        <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                注&nbsp;&nbsp;册
            </Button>
            <a href="" onClick={this.handleToLoginPage} style={{float:'right'}}>已有账号?</a>
        </FormItem>
      </Form>
    );
  }
}
const VerticalRegisterForm = Form.create()(VerticalRegisterForm_);


class Register extends React.Component {
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
        <Spin spinning={this.state.loading} delay={LOADING_DELAY_TIME} tip='注册中'>
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
                      <VerticalRegisterForm  handleLoading={this.handleLoading}/>
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

export default Register;
