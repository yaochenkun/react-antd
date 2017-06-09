import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import LoginRegister from './LoginRegister/LoginRegister.js';
import VerticalLoginForm from './LoginRegister/VerticalLoginForm.js';
import VerticalRegisterForm from './LoginRegister/VerticalRegisterForm.js';
import UserHome from './UserHome/UserHome.js';
import $ from 'jquery';
import {message} from 'antd'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


//认证
var requestAuth = function(nextState, replace){

    let token = sessionStorage.getItem("token");
    if(token == null) {
        message.error('请先登录');
        replace({ pathname: '/login' })
        return;
    } else {
        let expiredTime = sessionStorage.getItem("expiredTime"); //获取过期时间戳
        let now = new Date().getTime();
        if(now > expiredTime) {
            clearSession();
            message.error('已过期请重新登录');
            replace({ pathname: '/login' })
        }
    }
};

//清空登录状态信息
var clearSession = function() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("expiredTime");
}





ReactDOM.render(<Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <Route onEnter={requestAuth}>
                            <Route path="/user_home" component={UserHome}/>
                        </Route>
                        <Route component={LoginRegister}>
                            <Route path="/login" component={VerticalLoginForm}/>
                            <Route path="/register" component={VerticalRegisterForm}/>
                        </Route>
                    </Route>
                </Router>
                , document.getElementById('root'));
