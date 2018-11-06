// miniprogram/pages/playground/playground.js
var that;
var currentTab = "live";
var commentIconCounter = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        liveStyle: "background-color: #9EFAFF;color: #4E7C7F;",
        discoverStyle: "background-color: #89BAFF;color: #E6F0FF;",
        currentTab: "live"
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
    onLiveTap: function(e) {
        console.log(e);
        if (currentTab != "live") {
            currentTab = "live";
            that.setData({
                liveStyle: "background-color: #9EFAFF;color: #4E7C7F;",
                discoverStyle: "background-color: #89BAFF;color: #E6F0FF;",
                currentTab: currentTab
            })
        }
    },
    onDiscoverTap: function(e) {
        console.log(e);
        if (currentTab != "discover") {
            currentTab = "discover";
            that.setData({
                liveStyle: "background-color: #89BAFF;color: #E6F0FF;",
                discoverStyle: "background-color: #9EFAFF;color: #4E7C7F;",
                currentTab: currentTab
            })
        }
    },
    initData: function() {
        var lives = require('../../localdb/live.js').lives;
        var discover = require('../../localdb/discover.js').discover;
        that.setData({
            lives: lives,
            discover:discover
        })
        // console.log(lives);
        for (var i = 0; i < lives.length; i++) {
            commentIconCounter.push({
                liveId: lives[i].liveId,
                count: 0,
                likeCount: 0
            })
        }
        // console.log(commentIconCounter);
    },
    onLiveContentTap: function(e) { //进入评论详情
        console.log(e);
    },
    onCommentIconTap: function(e) { //控制评论展示与隐藏
        var liveId = e.currentTarget.dataset.liveId;
        var lives = that.data.lives;
        var counter;
        var flag = false; //判断是否匹配到id
    
        for (var i = 0; i < commentIconCounter.length; i++) {
            if (commentIconCounter[i].liveId == liveId) {
                counter = commentIconCounter[i];
                flag = true;
                break;
            }
        }
        if (!flag) {
            return;
        }
        counter.count ++;
        // console.log(counter.count);
        if (counter.count % 2 == 0) {
            for (var i = 0; i < lives.length; i++) {
                if (lives[i].liveId == liveId) {
                    lives[i].style = {
                        display: "block",
                        shadow: "0 2rpx 6rpx rgba(0, 0, 0, 0.2);"
                    }
                    break;
                }
            }
            that.setData({
                lives: lives
            })
        }else{
            for (var i = 0; i < lives.length; i++) {
                if (lives[i].liveId == liveId) {
                    lives[i].style = {
                        display: "none",
                        shadow: "none"
                    }
                    break;
                }
            }
            that.setData({
                lives: lives
            })
        }
    },
    onLikeTap:function(e){
        var liveId = e.currentTarget.dataset.liveId;
        var lives = that.data.lives;
        var counter;
        var flag = false; //判断是否匹配到id

        for (var i = 0; i < commentIconCounter.length; i++) {
            if (commentIconCounter[i].liveId == liveId) {
                counter = commentIconCounter[i];
                flag = true;
                break;
            }
        }
        if (!flag) {
            return;
        }
        counter.likeCount++;

        // 取消赞
        if (counter.likeCount % 2 == 0) {
            for (var i = 0; i < lives.length; i++) {
                if (lives[i].liveId == liveId) {
                    lives[i].likeIconPath = "/images/icons/dislike_icon.png";
                    break;
                }
            }
            that.setData({
                lives: lives
            })
        } else {//赞
            for (var i = 0; i < lives.length; i++) {
                if (lives[i].liveId == liveId) {
                    lives[i].likeIconPath = "/images/icons/like_icon.png";
                    break;
                }
            }
            that.setData({
                lives: lives
            })
        }
    }
})