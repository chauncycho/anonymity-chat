// miniprogram/pages/messages/messages.js
// miniprogram/pages/me/me.js

var that;
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        that = this;
        // that.initPerson();
        // that.loadMessageList();
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
    initPerson: function() {
        var persons = require('../../localdb/persondb.js').persons;
        that.setData({
            persons: persons
        })
        // console.log(persons)
    },
    onPersonTap: function(e) {
        var targetId = e.currentTarget.dataset.id;
        // console.log(targetId)
        wx.navigateTo({
            url: '/pages/chat/chat?id='+targetId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    loadMessageList: function() {
        // 加载数据
        var userdata = getApp().globalData.userdata; //当前用户
        var messages = userdata.messages; //消息列表
        var friends = userdata.friends; //好友列表
        var chattingRoom = userdata.chattingRoom; //聊天室列表
        var anonymityFriends = userdata.anonymityFriends; //匿名好友列表
        var messagedb = require('../../localdb/messagedb.js').messagedb; //所有消息
        // console.log(messagedb)

        var messageList = new Array(); //用于显示的列表

        for (var i = 0; i < messages.length; i++) {
            var userId = messages[i].id;
            var group = messages[i].group;
            var user;//获得对方基本信息
            if (group == "friends") { //判断用户所属组
                user = that.getUser(userId, friends);
            } else if (group == "anonymity") {
                user = that.getUser(userId, anonymityFriends);
            } else if (group == "chattingRoom") {
                user = that.getUser(userId, chattingRoom);
            }
            var resMessage = that.getMessage(userId,messagedb);//搜索到的消息
            messageList.push({
                id:user.id,
                time:resMessage.lastTime,
                message: resMessage.message[resMessage.message.length-1].content,
                count:resMessage.message.length,
                profilePath: user.profilePath,
                name:user.remark
            })
        }
        // console.log(messageList)
        that.setData({
            messageList:messageList
        })

        getApp().globalData.userdata.messageListDetail = messageList;//联查数据更新到全局
        // getApp().globalData.abcd = "abcd";

        // console.log(getApp().globalData)
    },
    getUser: function(id, list) {
        for(var i = 0 ; i < list.length ; i ++){
            if(list[i].id == id){
                return list[i];
            }
        }
    },
    /**
     * 在所有Message中搜索两人的对话信息
     */
    getMessage:function(id,messagedb){
        for(var i = 0 ; i < messagedb.length ; i ++){//遍历messagedb
            var idList = messagedb[i].id;
            for(var j = 0 ; j < idList.length ; j ++){//判断idList是否包含该id
                if(idList[j] == id){
                    return messagedb[i];
                }
            }
        }
    }
})