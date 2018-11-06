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
        currentId = getApp().globalData.userdata.id;//自己id
        targetId = options.id;//目标id
        that.initMessage();//初始化消息队列
        // console.log(getApp().globalData)
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
    initMessage: function() {//初始化消息
        var messagedb = require('../../localdb/messagedb.js').messagedb;//消息数据库

        var listMessage = getApp().globalData.userdata.messageListDetail;//用户信息列表
        var targetUser = that.getUser(targetId,listMessage);//用户信息
        var messages = that.getMessage(targetId, messagedb);

        for(var i = 0 ; i < messages.message.length ; i ++){//把当前用户封装进消息
            messages.message[i].currentId = currentId
        }

        that.setData({
            messages: messages,
            profilePath:targetUser.profilePath,
            name:targetUser.name,
        })
        console.log(that.data)
        // 滚动到消息底部
        that.scrollToBottom();
    },
    onInput: function(e) {
        input = e.detail.value;
    },
    onSend: function(e) {
        if(input == ""){
            wx.showToast({
                title: '消息不能为空喔！',
                icon:'none'
            })
            return ;
        }

        // 清空消息框
        that.setData({
            input: ""
        })

        // 获得消息内容 
        var messages = that.data.messages;

        // 更新消息数据
        messages.message.push({
            id: 1,
            content: input,
            currentId: currentId
        })

        // 同步到data
        that.setData({
            messages: messages
        });

        // 滚动消息到底部
        that.scrollToBottom();

        // 清空消息
        input = ""

        // 发送到服务器
    },
    scrollToBottom: function() {
        wx: wx.createSelectorQuery().select("#content").boundingClientRect(function(rect) {
            wx: wx.pageScrollTo({
                scrollTop: rect.bottom,
                duration: 0,
            })
        }).exec();
    },
    /**
     * 在所有Message中搜索两人的对话信息
     */
    getMessage: function (id, messagedb) {
        for (var i = 0; i < messagedb.length; i++) {//遍历messagedb
            var idList = messagedb[i].id;
            for (var j = 0; j < idList.length; j++) {//判断idList是否包含该id
                if (idList[j] == id) {
                    return messagedb[i];
                }
            }
        }
    },
    getUser:function(id,listMessages){
        for(var i = 0 ; i < listMessages.length ; i ++){
            if (id == listMessages[i].id){
                return listMessages[i];
            }
        }
    }
    
})