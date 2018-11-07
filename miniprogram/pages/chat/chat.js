// miniprogram/pages/chat/chat.js
var that;
var currentId;
var targetId;
var input = "";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        input: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        that = this;
        currentId = getApp().globalData.userdata.id; //自己id
        that.test();
        targetId = options.id; //目标id
        that.initMessageTest(); //初始化消息队列
        that.initUserTest();
        // console.log(getApp().globalData)
        console.log(that.data)
        that.websocket();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
    
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    initMessage: function() { //初始化消息
        // var messagedb = require('../../localdb/messagedb.js').messagedb;//消息数据库

        // var listMessage = getApp().globalData.userdata.messageListDetail;//用户信息列表
        // var targetUser = that.getUser(targetId,listMessage);//用户信息
        // var messages = that.getMessage(targetId, messagedb);

        // for(var i = 0 ; i < messages.message.length ; i ++){//把当前用户封装进消息
        //     messages.message[i].currentId = currentId
        // }

        // that.setData({
        //     messages: messages,
        //     profilePath:targetUser.profilePath,
        //     name:targetUser.name,
        // })
        // console.log(that.data)


        // 滚动到消息底部
        that.scrollToBottom();
    },
    onInput: function(e) {
        input = e.detail.value;
    },
    onSend: function(e) {
        if (input == "") {
            wx.showToast({
                title: '消息不能为空喔！',
                icon: 'none'
            })
            return;
        }

        // 清空消息框
        that.setData({
            input: ""
        })

        // 获得消息内容 
        // console.log()
        var messages = that.data.messages;
        // var userdataGlobal = getApp().globalData.userdata
        // 更新消息数据
        var newMessage = {
            user_id: currentId,
            target_id: targetId,
            type: "text",
            value: input,
            time: new Date()
        }
        messages.messages.push(newMessage)

        // 同步到data
        that.setData({
            messages: messages
        });
        // 同步到全局
        var userdata = getApp().globalData.userdata;
        console.log(userdata);
        for(var i = 0 ; i < userdata.messages.length; i ++){
            if (userdata.messages[i].targetId == targetId){
                userdata.messages[i].messages.push(newMessage)
            }
        }
        console.log(getApp().globalData.userdata)

        // 清空消息
        input = ""

        // 发送到服务器
        console.log(newMessage)
       
        wx.sendSocketMessage({
            data: JSON.stringify(newMessage),
            success: function(res) {
                console.log(res);
                console.log("消息发送成功")
            },
            fail: function(res) {},
            complete: function(res) {},
        })
        // 滚动消息到底部
        that.scrollToBottom();
    },
    scrollToBottom: function() {
        wx: wx.createSelectorQuery().select("#content").boundingClientRect(function(rect) {
            wx.pageScrollTo({
                scrollTop: rect.height,
                duration: 0,
            })
        }).exec();
    },
    /**
     * 在所有Message中搜索两人的对话信息
     */
    getMessage: function(id, messagedb) {
        for (var i = 0; i < messagedb.length; i++) { //遍历messagedb
            var idList = messagedb[i].id;
            for (var j = 0; j < idList.length; j++) { //判断idList是否包含该id
                if (idList[j] == id) {
                    return messagedb[i];
                }
            }
        }
    },
    getUser: function(id, listMessages) {
        for (var i = 0; i < listMessages.length; i++) {
            if (id == listMessages[i].id) {
                return listMessages[i];
            }
        }
    },
    //聊天测试
    test: function() {
        that.setData({
            profilePath: "/images/masks/mask1.png",
            name: "聊天测试",
        })
    },
    initMessageTest: function() {
        var messageGlobal = getApp().globalData.userdata.messages;
        var preMessage;
        for (var i = 0; i < messageGlobal.length; i++) {
            if (messageGlobal[i].targetId == targetId) {
                preMessage = messageGlobal[i];
                break;
            }
        }
        // for (var i = 0; i < preMessage.messages.length; i++) {
        //     preMessage.messages[i].currentId = currentId;
        // }
        that.setData({
            messages: preMessage
        })
        console.log(that.data.messages);
        that.scrollToBottom();//滚动底部
    },
    initUserTest: function() {
        var userdata = getApp().globalData.userdata;
        var user;
        for (var i = 0; i < userdata.friends.length; i++) {
            if (userdata.friends[i].id == targetId) {
                user = userdata.friends[i];
                break;
            }
        }
        that.setData({
            user: user,
        })
    },
    websocket:function(){
        wx.onSocketMessage(function(res){
            console.log("onSocketMessage");
            console.log(res)
            var data = JSON.parse(res.data);//转换
            var targetId = data.targetId;//自己id
            var userId = data.userId;//对方id
            var time = data.time;
            var type = data.type;
            var value = data.value;

            console.log("消息:"+userId+"->"+targetId+":"+value)

            var messages = getApp().globalData.userdata.messages;//更新global
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].targetId = targetId) {
                    messages[i].messages.push({
                        user_id: userId,
                        target_id: targetId,
                        type: type,
                        value: value,
                        time: time
                    })
                }
            }

            // 更新页面
            var messagesLocal = that.data.messages;
            messagesLocal.messages.push({
                user_id: userId,
                target_id: targetId,
                type: type,
                value: value,
                time: time
            })
            that.setData({
                messages: messagesLocal
            })
            that.scrollTop();
            that.scrollToBottom();//滚动底部
        })
    }
})