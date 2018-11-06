var myFriendCounter = 0;
var myChattingRoomCounter = 0;
var anonymityFriendsCounter = 0;
var that;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myFriendsTriange: "/images/icons/triange_icon.png",
        myFriendsListDisplay: "block",
        myFriendsStyle: "box-shadow: 0 6rpx 4rpx rgba(0, 0, 0, 0.04);",
        myChattingRoomTriange: "/images/icons/triange_icon.png",
        myChattingRoomListDisplay: "block",
        myChattingRoomStyle: "box-shadow: 0 6rpx 4rpx rgba(0, 0, 0, 0.04);",
        anonymityFriendsTriange: "/images/icons/triange_icon.png",
        anonymityFriendsListDisplay: "block",
        anonymityFriendsStyle: "box-shadow: 0 6rpx 4rpx rgba(0, 0, 0, 0.04);"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        that = this;
        that.initData();
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
    onMyFriendsTap: function(e) {
        myFriendCounter++;
        if (myFriendCounter % 2 == 1) { //不显示
            that.setData({
                myFriendsListDisplay: "none",
                myFriendsTriange: "/images/icons/hide_triange_icon.png",
                myFriendsStyle: "box-shadow: none;"
            })
        } else {
            that.setData({
                myFriendsListDisplay: "block",
                myFriendsTriange: "/images/icons/triange_icon.png",
                myFriendsStyle: "box-shadow: 0 6rpx 4rpx rgba(0, 0, 0, 0.04);"
            })
        }
        // console.log(e)
    },
    onMyChattingRoomTap: function(e) {
        myChattingRoomCounter++;
        if (myChattingRoomCounter % 2 == 1) { //不显示
            that.setData({
                myChattingRoomListDisplay: "none",
                myChattingRoomTriange: "/images/icons/hide_triange_icon.png",
                myChattingRoomStyle: "box-shadow: none;"
            })
        } else {
            that.setData({
                myChattingRoomListDisplay: "block",
                myChattingRoomTriange: "/images/icons/triange_icon.png",
                myChattingRoomStyle: "box-shadow: 0 6rpx 4rpx rgba(0, 0, 0, 0.04);"
            })
        }
        // console.log(e)
    },
    onAnonymityFriendsTap: function(e) {
        anonymityFriendsCounter++;
        if (anonymityFriendsCounter % 2 == 1) { //不显示
            that.setData({
                anonymityFriendsListDisplay: "none",
                anonymityFriendsTriange: "/images/icons/hide_triange_icon.png",
                anonymityFriendsStyle: "box-shadow: none;"
            })
        } else {
            that.setData({
                anonymityFriendsListDisplay: "block",
                anonymityFriendsTriange: "/images/icons/triange_icon.png",
                anonymityFriendsStyle: "box-shadow: 0 6rpx 4rpx rgba(0, 0, 0, 0.04);"
            })
        }
        // console.log(e)
    },
    initData: function() {
        // var friends = require('../../localdb/friendsdb.js').friends;
        // console.log(friends)
        console.log(getApp())

        var friend = new Array();
        var anonymity = new Array();
        var room = new Array();
        var list = getApp().globalData.userdata.friends;
        for(var i = 0 ; i < list.length ; i ++){
            if(list[i].type == "friend"){
                friend.push(list[i]);
            }else if(list[i].type == "anonymity"){
                anonymity.push(list[i]);
            }else if(list[i].type == "room"){
                room.push(list[i]);
            }
        }

        that.setData({
            myFriends: friend,
            anonymityFriends: anonymity,
            myChattingRoom: room
        })
    },
    onFriendTap: function() {
        wx.navigateTo({
            url: '/pages/card/friend/friend_card',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    onAnonymityTap: function () {
        wx.navigateTo({
            url: '/pages/card/anonymity/anonymity_card',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
})