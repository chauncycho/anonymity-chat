// miniprogram/pages/card/friend/friend_card.js

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
        that.setData({
            id: options.id
        })
        that.show();
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
    show: function() {
        var id = that.data.id;
        var userdata = getApp().globalData.userdata;
        var user;
        for (var i = 0; i < userdata.friends.length; i++) {
            if (userdata.friends[i].id == id) {
                user = userdata.friends[i];
            }
        }
        that.setData({
            user: user
        })
    },
    onChat: function(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/chat/chat?id='+id,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})