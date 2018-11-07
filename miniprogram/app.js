//app.js
var that;
var userdata;
var server = require('./localdb/server.js').server;
App({
    onLaunch: function() {
        that = this;
        that.login();//登录
        // that.userInit();//初始化user
    },
    sendRequest: function(code) {
        //   发送服务器请求
        wx: wx.request({
            url: server.url+'login?code=' + code,
            data: "",
            header: {
                contentEncoding: "utf-8",
                contentType: "text/html"
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
                //   成功
                console.log(res);
                var userdata = res.data;
                console.log("detail测试:"+userdata.detail)
                that.save("userdata", userdata)
                that.globalData = {
                    userdata:userdata
                }
                console.log(that.globalData);

                // websocket连接
                that.connectWebSocket(userdata.id);
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    save: function(key, value) {
        wx: wx.setStorage({
            key: key,
            data: value,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    login: function() {
        var that = this;
        // 测试

        wx:wx.login({
            success: function(res) {
                console.log("code:"+res.code);
                that.sendRequest(res.code);
                // that.connectWebSocket();
            },
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    cloudInit:function(){
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }
    },
    userInit:function(){
        userdata = require('./localdb/userdb.js').userdata;
        // console.log(userdata);
        that.globalData = {
            userdata:userdata
        }
    },
    connectWebSocket:function(userid){
        wx.connectSocket({
            url: "ws://"+server.name+"websocket/"+userid,
            header: {
                'content-type': 'application/json'
            },
            method:"GET",
            success:function(res){
                console.log(res)
            },
            fail:function(res){
                console.log(res)
            }
        })

        wx.onSocketOpen(function(res){
            console.log("onSocketOpen");

            // wx.sendSocketMessage({
            //     data: "啦啦啦",
            // })
        });

        wx.onSocketClose(function(res){
            console.log("onSocketClose");
        })

        wx.onSocketMessage(function(res){
            console.log("onSocketMessage");
            console.log(res.data)
        })

        wx.onSocketError(function(err){
            console.error("onSocketError");
            console.error(err)
        })
    },
})