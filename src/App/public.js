//var SERVER = 'http://10.108.113.8:8080' //renzilong_lab
//var SERVER = 'http://10.108.119.104:8080' //renzilong_mac
var SERVER = 'http://localhost:8080' //yaochenkun_mac
var LOADING_DELAY_TIME = 500 //加载延迟时间，若在0.5s内加载完毕则不显示

//正则表达式
var REGEX = {
    PHONE : /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
}




















//导出常量
export {SERVER,
        REGEX,
        LOADING_DELAY_TIME};
