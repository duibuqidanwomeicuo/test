const util = require('../../utils/util');

Page({
  userInfo: {
    username: '',
    password: '',
    hotelId: '',
    roomNum: '',
  },
  // 定时器
  timer: null,
  data: {
    lampList: [{
      name: '走廊灯',
      state: 0,
      // 灰
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E8%B5%B0%E5%BB%8A%E7%81%AF%E7%81%B0-01.png',
      // 亮
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E8%B5%B0%E5%BB%8A%E7%81%AF%E8%93%9D-01.png'
    }, {
      name: '床头灯',
      state: 0,
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E5%BA%8A%E5%A4%B4%E7%81%AF%E7%81%B0-01.png',
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E5%BA%8A%E5%A4%B4%E7%81%AF%E8%93%9D-01.png'
    }, {
      name: '客房灯',
      state: 0,
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E5%AE%A2%E6%88%BF%E7%81%AF%E7%81%B0-01.png',
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E5%AE%A2%E6%88%BF%E7%81%AF%E8%93%9D-01.png'
    }, {
      name: '卫生间灯',
      state: 0,
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E5%8D%AB%E7%94%9F%E9%97%B4%E7%81%B0-01.png',
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E5%8D%AB%E7%94%9F%E9%97%B4%E8%93%9D-01.png'
    }],
    nowLamp: 0,
  },
  // 开关键
  modeChange: function (e) {
    const index = this.data.nowLamp;
    const lampList = this.data.lampList[index];

    // 发送 改变相应事务的请求
    const userInfo = this.userInfo;
    const date = new Date();
    const timestamp_str = util.formatTime(date);
    const id_ary = lampList.id.split('.');
    let DeviceState = '';
    if (lampList.state === 0) {
      DeviceState = 'STATE_ON'
    } else {
      DeviceState = 'STATE_OFF'
    }
    const sha1_str = "Thinker@123Action=DEVICECONTROLDeviceId=" + lampList.id + "DeviceState=" + DeviceState + "HotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";
    const sign = util.sha1(sha1_str);

    wx.request({
      url: 'https://smart.thinkercu.com/interface2.php', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Sign': sign,
        'Username': userInfo.username,
        'Password': userInfo.password
      },
      data: {
        Action: 'DEVICECONTROL',
        HotelId: userInfo.hotelId,
        RoomId: userInfo.roomNum,
        DeviceId: lampList.id,
        DeviceState: DeviceState,
        TimeStamp: timestamp_str
      },
      success: (res) => {
        console.log(res);
        if (res.data.ErrCode === 200) {
          console.log('control success!');
          this.data.lampList[index].state = this.data.lampList[index].state > 0 ? 0 : 100;
          this.setData({
            'lampList': this.data.lampList
          });
          this.updateLight();
        }
      }
    })
  },
  tarbarChange: function (e) {
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    this.setData({
      'nowLamp': index
    });
  },
  //  增加键
  buttonChange: function (e) {
    const button = e.target.id;
    if (button == !'buttonPlus' && button !== 'buttonMinus') return;
    if (button === "buttonPlus") {
      this.data.lampList[this.data.nowLamp].state += 10;
      if (this.data.lampList[this.data.nowLamp].state >= 100) this.data.lampList[this.data.nowLamp].state = 100;
    }
    if (button === 'buttonMinus') {
      this.data.lampList[this.data.nowLamp].state -= 10;
      if (this.data.lampList[this.data.nowLamp].state <= 0) this.data.lampList[this.data.nowLamp].state = 0;
    }
    this.setData({
      'lampList': this.data.lampList
    });
    // 发送请求
    const userInfo = this.userInfo;
    const lamp = this.data.lampList[this.data.nowLamp];
    const date = new Date();
    const timestamp_str = util.formatTime(date);
    const sha1_str = "Thinker@123Action=DEVICECONTROLDeviceAction=ACTION_TODeviceAttributeValue=" + lamp.state + "DeviceId=" + lamp.id + "HotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";
    // console.log(sha1_str)
    const sign = util.sha1(sha1_str);

    wx.request({
      url: 'https://smart.thinkercu.com/interface2.php', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Sign': sign,
        'Username': userInfo.username,
        'Password': userInfo.password
      },
      data: {
        Action: 'DEVICECONTROL',
        HotelId: userInfo.hotelId,
        RoomId: userInfo.roomNum,
        DeviceId: lamp.id,
        DeviceAction: "ACTION_TO",
        DeviceAttributeValue: lamp.state,
        TimeStamp: timestamp_str
      },
      success: (res) => {
        // 请求成功
        console.log('update success');
        console.log(res);
        if (res.data.ErrCode === 200) {
          this.updateLight();
        }
      }
    })
  },
  // 页面 加载 
  onLoad: function () {
    // 加载  并处理 相关数据
    this.userInfo = {
      username: wx.getStorageSync('username'),
      password: wx.getStorageSync('password'),
      hotelId: wx.getStorageSync('hotelId'),
      roomNum: wx.getStorageSync('roomNum')
    }
    this.updateLight();
    this.timer = setInterval(this.updateLight, 5000);
  },
  updateLight: function () {
    const util = require('../../utils/util');
    const date = new Date();
    const timestamp_str = util.formatTime(date);
    const userInfo = this.userInfo;
    const sha1_str = "Thinker@123Action=DEVICELISTDeviceType=LIGHTHotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";
    const sign = util.sha1(sha1_str);
    wx.request({
      url: 'https://smart.thinkercu.com/interface2.php', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Sign': sign,
        'Username': userInfo.username,
        'Password': userInfo.password
      },
      data: {
        Action: 'DEVICELIST',
        HotelId: userInfo.hotelId,
        RoomId: userInfo.roomNum,
        DeviceType: 'LIGHT',
        TimeStamp: timestamp_str
      },
      success: (res) => {
        const data = res.data.Data;
        // console.log(data);
        if (res.data.ErrCode == 200) {
          const lampList = this.data.lampList;
          for (let i = 4; i < 8; i++) {
            lampList[i - 4].id = data[i].id;
            lampList[i - 4].name = data[i].name;
            lampList[i - 4].state = data[i].state;
          }
          this.setData({
            'lampList': lampList
          });
        }
      }
    })
  },
  // 界面隐藏
  onHide: function () {
    clearInterval(this.timer);
    this.timer = null;
  },
  // 界面卸载
  onUnload: function () {
    clearInterval(this.timer);
    this.timer = null;
  },
  onShow: function () {
    // 页面出现在前台时执行
    this.updateLight();
    if (!this.timer) {
      this.timer = setInterval(this.updateLight, 5000);
    }
  },
})