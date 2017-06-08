import './Login.css'
import React from 'react';
import { Layout,Carousel,Form, Icon, Input, Button, Checkbox} from 'antd';
import VerticalLoginForm from './VerticalLoginForm'
const { Header, Content, Sider, Footer} = Layout;
const FormItem = Form.Item;

class Login extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
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
  render() {

    return (
      <Layout>
          <Layout style={{backgroundColor:'#fff'}}>
              <Content style={{ margin: '50px 0px 50px 50px',padding:'50px 0px 50px 0px', width:'70%', minHeight:500}}>
                <Carousel autoplay>
                    <div style={{backgroundColor:'#333', height:400}}></div>
                    <div style={{backgroundColor:'#555', height:400}}></div>
                    <div style={{backgroundColor:'#777', height:400}}></div>
                 </Carousel>
              </Content>
              <Sider style={{margin: '50px 0px',padding:'50px 50px', minWidth:'30%', minHeight:540, backgroundColor:'#fff'}}>
                  <VerticalLoginForm />
              </Sider>
          </Layout>
          <Footer style={{ textAlign: 'center'}}>
            医海慈航 ©2017 Created by BUPT
          </Footer>
      </Layout>
    );
  }
}

export default Login;
