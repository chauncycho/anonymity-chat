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
    initData: function() {
        var maskdb = require('../../localdb/maskdb.js');
        var masks = maskdb.masks;
        var fackNames = maskdb.fackNames;
        that.setData({
            masks: masks,
            fackNames: fackNames,
            userdata: getApp().globalData.userdata
        })
    },
    onMaskTap: function(e) {
        var maskIndex = e.currentTarget.dataset.maskIndex;
        getApp().globalData.userdata.maskPath = that.data.masks[maskIndex];
        that.setData({
            userdata:getApp().globalData.userdata
        })
        // console.log(getApp().globalData);
        // 还需接入后端处理
    },
    onFackNameTap:function(e){
        // console.log(e)
        var fackNameIndex = e.currentTarget.dataset.fackNameIndex;
        getApp().globalData.userdata.fackName = that.data.fackNames[fackNameIndex];
        that.setData({
            userdata: getApp().globalData.userdata
        })
        // console.log(getApp().globalData);
        // 还需接入后端处理
    },
    onModifyTap:function(){
        wx.navigateTo({
            url: '/pages/modify/modify',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    }
})