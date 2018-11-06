//userdata 存放于全局globalData,更改需要重新更新userdata

// 基本信息  （直接从服务器获取
// id编号（核心）
// openId用户唯一标识
// sessionId会话
// name名字
// fackName假名
// profilePath头像图标
// maskPath面具图标
// motto签名
// detail{}详细信息
// codePath二维码
// setting{}设置


// messageList[userId]消息列表（每个人缓存20条）
// friends[{remark备注}]好友列表
// chattingRoom[{}]聊天室列表
// anonymityFriends[{}]匿名好友列表


// lives[{}]动态信息（缓存20条）
// comments[{}]
// likes[{}]
// discovers[{}]发现信息（缓存20条）


var user = {
    openId: "",
    session_key: "",
    id: "000001",
    name: "Chauncy",
    fackName: "宇智波佐助",
    profilePath: "/images/profiles/profile1.png",
    maskPath: "/images/masks/mask1.png",
    motto: "#Java #Web #小程序 #UI设计",
    detail: {
        birthday: "8.19",
        age: "20",
        gender: "男",
        location: "北京",
        home: "柳州",
        phone: "18518169256",
        email: "332501080@qq.com",
    },
    codePath: "",
    setting: {},
    friends: [{
        id: "000002",
        remark: "郑怡亭",
        name: "郑怡亭",
        motto: "想长高",
        profilePath: "/images/profiles/profile2.png",
        lastMessage: "嗯"
    }, {
        id: "000003",
        remark: "加贝",
        name: "加贝",
        motto: "加贝最帅",
        profilePath: "/images/profiles/profile9.png",
        lastMessage: "哈哈哈"
    }],
    chattingRoom: [{
        id: "000009",
        name: "玄学聊天室",
        remark: "玄学聊天室",
        users: [{}],
        motto: "这里只讨论玄学",
        profilePath: "/images/profiles/profile8.png",
        lastMessage: "大学霸:我无处不在"
    }],
    anonymityFriends: [{
        id: "000004",
        remark: "大学霸",
        fackName: "大学霸",
        motto: "我天下无敌",
        profilePath: "/images/profiles/profile7.png",
        lastMessage: "你在干什么"
    }, {
        id: "000005",
        remark: "Lucy",
        fackName: "Lucy",
        motto: "努力我要努力，我要变成万人迷",
        profilePath: "/images/profiles/profile3.png",
        lastMessage: "你在干什么"
    }, {
        id: "000006",
        remark: "科比",
        fackName: "科比",
        motto: "神一般的男子",
        profilePath: "/images/profiles/profile6.png",
        lastMessage: "_(:з」∠)_"
    }, {
        id: "000007",
        remark: "hacker",
        fackName: "hacker",
        motto: "听说你想被黑？",
        profilePath: "/images/profiles/profile5.png",
        lastMessage: "老大"
    }, {
        id: "000008",
        remark: "小樱",
        fackName: "小樱",
        motto: "嗯？",
        profilePath: "/images/profiles/profile4.png",
        lastMessage: "哇，你有毒"
    }],
    messages: [{
            id: "000002",
            group: "friends"
        },
        {
            id: "000003",
            group: "friends"
        },
        {
            id: "000004",
            group: "anonymity"
        },
        {
            id: "000005",
            group: "anonymity"
        },
        {
            id: "000006",
            group: "anonymity"
        },
        {
            id: "000007",
            group: "anonymity"
        },
        {
            id: "000008",
            group: "anonymity"
        }
    ],
    lives: [],
    comments: [],
    likes: [],
    discovers: []
}

exports.userdata = user;