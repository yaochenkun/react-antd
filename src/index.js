import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App.js';
import Login from './Login/Login.js';
import UserHome from './UserHome/UserHome.js';
import $ from 'jquery';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';


//认证
var requestAuth = function(nextState, replace){

    // let logon = sessionStorage.getItem("logon");
    // if(logon == null || logon == false) {
    //     replace({ pathname: '/login' })
    // }


    // $.ajax({
    //     url : '/api/member/search/1',
    //     type : 'get',
    //     dataType : 'json',
    //     success : (userInfo) => {
    //         console.log(userInfo);
    //
    //     }
    // });

    // alert(3);
    // $.ajax({
    //     url : 'http://localhost:8080/api/auth/hehe',
    //     type : 'POST',
    //     dataType : 'json',
    //     success : (data) => {
    //         console.log(data);
    //         //browserHistory.push('/user_home');
    //     }
    // });
};





ReactDOM.render(<Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <Route onEnter={requestAuth}>
                            <Route path="/user_home" component={UserHome}/>
                        </Route>
                        <Route path="/login" component={Login}/>
                    </Route>
                </Router>
                , document.getElementById('root'));




// class Yao extends React.Component {
//
// render() {
//     return (
//         <div>
//             Hellow sdf
//         </div>
//     );
//   }
// }
//
//
//
// ReactDOM.render(<Router history={browserHistory}>
//                     <Route path="/" component={Yao} />
//                 </Router>
//                 , document.getElementById('root'));

// ReactDOM.render(<Yao/>
//                 , document.getElementById('root'));
