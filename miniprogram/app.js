//app.js
var that;
var userdata;
var server = require('./localdb/server.js').server;
var isConnected = null;
App({
    onLaunch: function() {
        that = this;
        that.login();//登录
        that.listenConnectState();//轮询监听连接状态
        // that.userInit();//初始化user
    },
    onShow: function(){
        if(isConnected == null){
            isConnected = false;
        }else if(!isConnected){
            that.connectWebSocket()
        }
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
                userdata = res.data;
                console.log("detail测试:"+userdata.detail)
                that.save("userdata", userdata)
                that.globalData = {
                    userdata:userdata
                }
                console.log(that.globalData);

                // websocket连接
                that.connectWebSocket();
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
    connectWebSocket:function(){
        var userid = userdata.id
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
            // console.log("socketState="+getApp().globalData.isConnected)
            isConnected = true;
            console.log("onSocketOpen");

            // wx.sendSocketMessage({
            //     data: "啦啦啦",
            // })
        });

        wx.onSocketClose(function(res){
            isConnected = false;
            console.log("onSocketClose");
        })

        wx.onSocketMessage(function(res){
            console.log("onSocketMessage");
            var userId = res.data.data.targetId;//自己id
            var targetId = res.data.data.userId;//对方id
            var time = res.data.data.time;
            var type = res.data.data.type;
            var value = res.data.data.value;
            var messages = getApp().globalData.userdata.messages;
            for(var i = 0 ; i < messages.length ; i ++){
                if(messages[i].targetId = targetId){
                    messages.messages.push({
                        userId:userId,
                        targetId:targetId,
                        type:type,
                        value:value,
                        time:time
                    })
                }
            }
        })

        wx.onSocketError(function(err){
            console.error("onSocketError");
            console.error(err)
        })
    },
    listenConnectState:function(){
        setInterval(function(){
            console.log("检测连接状态")
            if(!isConnected){
                that.connectWebSocket();
            }
        },10*1000)
    }
})