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
    airConditioner: {
      model: '1',
      // 设置温度
      config_temp: '24',
      // 环境温度
      env_temp: '28',
      // 0 关 1 开
      state: 1,

    },
    modelList: [{
      model: '0',
      name: '制冷',
      // 灰
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E5%88%B6%E5%86%B7%E7%81%B0-01.png',
      // 亮
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E5%88%B6%E5%86%B7%E8%93%9D-01.png'
    }, {
      name: '制热',
      model: '1',
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E9%A3%8E%E5%90%91%E7%81%B0-01.png',
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E9%A3%8E%E5%90%91%E8%93%9D-01.png'
    }, {
      name: '除湿',
      model: '3',
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E9%99%A4%E6%B9%BF%E7%81%B0-01.png',
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E9%99%A4%E6%B9%BF%E8%93%9D-01.png'
    }, {
      name: '送风',
      model: '2',
      img1: 'http://qehhe97e4.bkt.clouddn.com/%E9%A3%8E%E9%80%9F%E7%81%B0-01.png',
      img2: 'http://qehhe97e4.bkt.clouddn.com/%E9%A3%8E%E9%80%9F%E8%93%9D-01.png'
    }],
  },
  // 开关键
  modeChange: function (e) {
    const airConditioner = this.data.airConditioner;
    // 发送 改变相应事务的请求
    airConditioner.state = !airConditioner.state;
    // 页面状态改变
    this.setData({
      'airConditioner': airConditioner
    });
    // 发送改变状态的 http 请求

    const userInfo = this.userInfo;
    let DeviceState = '';
    if (airConditioner.state === '0') {
      DeviceState = 'STATE_OFF';
    } else {
      DeviceState = 'STATE_ON';
    }

    const date = new Date();
    const timestamp_str = util.formatTime(date);

    const sha1_str = "Thinker@123Action=DEVICECONTROLDeviceId=" + airConditioner.id + "DeviceState=" + DeviceState + "HotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";

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
        DeviceId: airConditioner.id,
        DeviceState: DeviceState,
        TimeStamp: timestamp_str
      },
      success: (res) => {
        if (res.data.ErrCode === '200') {
          console.log('control success!');
          this.updateAir();
        } else {
          console.log('请求失败');
          console.log(res.data);
        }
      }
    })
  },
  // 模式的变化

  // 模式的变化 开始 修改
  tarbarChange: function (e) {
    // 点击的 index
    const index = e.currentTarget.dataset.index;
    const model = this.data.modelList[index];
    const id = this.data.airConditioner.id;
    this.data.airConditioner.model = model.model;

    // 要更新 airConditioner
    this.setData({
      'airConditioner': this.data.airConditioner
    });
    const userInfo = this.userInfo;


    let DeviceModel = ''
    switch (model.model) {
      case '0':
        DeviceModel = 'MODE_COOL';
        break;
      case '1':
        DeviceModel = 'MODE_HEAT';
        break;
      case '2':
        DeviceModel = 'MODE_WIND';
        break;
      case '3':
        DeviceModel = 'MODE_AUTO';
        break;
    }

    const data = new Date();
    const timestamp_str = util.formatTime(data);
    const sha1_str = "Thinker@123Action=DEVICECONTROLDeviceAction=ACTION_TODeviceId=" + id + "DeviceModel=" + DeviceModel + "HotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";

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
        DeviceId: id,
        DeviceAction: "ACTION_TO",
        DeviceModel: DeviceModel,
        TimeStamp: timestamp_str
      },
      success: (res) => {
        if (res.data.ErrCode === 200) {
          this.updateAir();
        }
      }
    })
  },
  //  Plus / Minus 按钮的 绑定事件
  buttonChange: function (e) {
    const button = e.target.id;
    const airConditioner = this.data.airConditioner;
    if (button == !'buttonPlus' && button !== 'buttonMinus') return;
    if (button === "buttonPlus") {
      // 隐式转换成 数字
      airConditioner.config_temp = (+airConditioner.config_temp) + 1;
      if (airConditioner.config_temp > 30) airConditioner.config_temp = 30;
    }
    if (button === 'buttonMinus') {
      airConditioner.config_temp = (+airConditioner.config_temp) - 1;
      if (airConditioner.config_temp < 16) airConditioner.config_temp = 16;
    }
    this.setData({
      'airConditioner': airConditioner
    });
    // 发送请求
    const userInfo = this.userInfo;
    const date = new Date();
    const timestamp_str = util.formatTime(date);
    const sha1_str = "Thinker@123Action=DEVICECONTROLDeviceAction=ACTION_TODeviceAttribute=ATTRIBUTE_TEMPERATUREDeviceAttributeValue=" + airConditioner.config_temp + "DeviceId=" + airConditioner.id + "HotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";

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
        DeviceId: airConditioner.id,
        DeviceAction: "ACTION_TO",
        DeviceAttribute: "ATTRIBUTE_TEMPERATURE",
        DeviceAttributeValue: airConditioner.config_temp,
        TimeStamp: timestamp_str
      },
      success: (res) => {
        if (res.data.ErrCode === 200) {
          this.updateAir();
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
    this.updateAir();
    this.timer = setInterval(this.updateAir, 5000);
  },
  updateAir: function () {
    // const util = require('../../utils/util');
    const date = new Date();
    const timestamp_str = util.formatTime(date);

    const userInfo = this.userInfo;
    const sha1_str = "Thinker@123Action=DEVICELISTDeviceType=AIR_CONDITIONHotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";
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
        DeviceType: 'AIR_CONDITION',
        TimeStamp: timestamp_str
      },
      success: (res) => {
        if (res.data.ErrCode === 200) {
          const data = res.data.Data[0];
          this.setData({
            'airConditioner': data
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
    this.updateAir();
    if (!this.timer) {
      this.timer = setInterval(this.updateAir, 5000);
    }
  },
})