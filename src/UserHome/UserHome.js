import './UserHome.css'
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, message} from 'antd';
import $ from 'jquery';
import {browserHistory} from 'react-router'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class UserHome extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
    username: '',
    role: '',
    content: '北京邮电大学姚陈堃'
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  componentDidMount(){

        let token = sessionStorage.getItem('token');
        $.ajax({
            url : 'http://localhost:8080/api/member/search/1',
            type : 'GET',
            beforeSend: (request) => request.setRequestHeader("token", token),
            dataType : 'json',
            success : (result) => {

                console.log(result);
                if(result.code != "SUCCESS") {
                    message.error(result.reason);
                    browserHistory.push('/login');
                    return;
                }

                //显示获取到的数据
                this.setState({
                    username: sessionStorage.getItem("username"),
                    role: sessionStorage.getItem("role"),
                    content: JSON.stringify(result.content)
                });
            }
        });

  }



  render() {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
            >
              <Menu.Item key="1">Tom</Menu.Item>
              <Menu.Item key="2">Bill</Menu.Item>
              <Menu.Item key="3">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <span>
                <Icon type="file" />
                <span className="nav-text">File</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 540 }}>
              <div style={{color:'red'}}>用户名={this.state.username}</div>
              <div style={{color:'red'}}>角色={this.state.role}</div>
              <div>拉取member={this.state.content}</div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            医海慈航 ©2017 Created by BUPT
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default UserHome
