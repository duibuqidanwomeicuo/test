
//index.js
Page({
  data: {
    motto: '每天记录生命中的一点点,在未来的日子里慢慢品味',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{
      username:'',
      password:'',
    }
  },
  onLoad: function () {
    // 对本地的 localStoge进行判断,如果有,就直接进入文件, 如果没有就不做什么
    const username = wx.getStorageSync('username');
    const password = wx.getStorageSync('password');
    //直接登录跳转
    if (username) {
      wx.showToast({
        title: '自动登录',
        icon: 'loading',
        duration: 2000
      });
      //刷新token
      var util = require('../../utils/util.js');
      var todate = new Date()
      var timestamp_str = util.formatTime(todate);
      var sign = util.sha1('Thinker@123Action=WAPLOGINPassword=' + password + 'TimeStamp=' + timestamp_str + 'UserId=' + username + 'Thinker@123');
      console.log(sign);
      // 保存 this 用于  后面的使用
      wx.request({
        url: 'https://smart.thinkercu.com/interface2.php', //仅为示例，并非真实的接口地址
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Sign': sign,
        },
        data: {
          Action: 'WAPLOGIN',
          UserId: username,
          Password: password,
          TimeStamp: timestamp_str
        },
        success: (res) =>{
          // console.log(res)
          this.setStorageHand(res);
        },
        fail: function (res) {
          // console.log(res);
        }
      })
    }
  },
  login: function (e) {
    //点击登录
    //刷新token
    var util = require('../../utils/util.js');
    var todate = new Date()
    const userInfo = this.data.userInfo;
    // console.log(userInfo)
    var timestamp_str = util.formatTime(todate);
    var sign = util.sha1('Thinker@123Action=WAPLOGINPassword=' + userInfo.password + 'TimeStamp=' + timestamp_str + 'UserId=' + userInfo.username + 'Thinker@123');
    // console.log(sign);
    wx.request({
      
      url: 'https://smart.thinkercu.com/interface2.php', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Sign': sign,
      },
      data: {
        Action: 'WAPLOGIN',
        UserId: userInfo.username,
        Password: userInfo.password,
        TimeStamp: timestamp_str
      },
      success: (res) => {
        console.log(res);
        this.setStorageHand(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
 
  },
  accountInput: function (e) {
    this.data.userInfo.username = e.detail.value
  },
  pwdInput: function (e) {
    this.data.userInfo.password = e.detail.value
  },
  setStorageHand(res) {
    if (res.data.ErrCode == 200) {
      wx.setStorage({
        data: res.data.Data[0].username,
        key: 'username',
      })
      wx.setStorage({
        data: res.data.Data[0].pwd,
        key: 'password',
      })
      wx.setStorage({
        data: res.data.Data[0].hotelid,
        key: 'hotelId',
      })
      wx.setStorage({
        data: res.data.Data,
        key: 'userInfo',
      })
      wx.setStorage({
        data: res.data.Data[0].roomnum,
        key: 'roomNum',
      })
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      wx.showModal({
        title: '登录失败',
        showCancel: false,
        content: res.data.ErrDesc,
      });
    }
  }
})