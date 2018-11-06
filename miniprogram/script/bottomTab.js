var onMessagesTap = function(e){
    wx.redirectTo({
        url: '/pages/messages/messages',
    })
}

var onFriendsTap = function (e) {
    wx.redirectTo({
        url: '/pages/friends/friends',
    })
}

var onPlaygroundTap = function (e) {
    wx.redirectTo({
        url: '/pages/playground/playground',
    })
}

var onMeTap = function (e) {
    wx.redirectTo({
        url: '/pages/me/me',
    })
}

exports.main = {
    onMeTap:onMeTap,
    onFriendsTap:onFriendsTap,
    onPlaygroundTap: onPlaygroundTap,
    onMessagesTap: onMessagesTap
}