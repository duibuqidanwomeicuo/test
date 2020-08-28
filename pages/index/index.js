//index.js
//获取应用实例
const app = getApp()
Page({
  userInfo: {
    username: '',
    password: '',
    hotelId: '',
    roomNum: '',
  },
  data: {
    header: {
      date: '',
      day: '',
      temperature: '',
      humidity: '',
      airQuality: ''
    },
    circumstances: [{
      name: "睡眠",
      state: 0,
      img1: '../../images/icon/wu-shuimian.png',
      img2: '../../images/icon/shuimian.png'
    }, {
      name: "明亮",
      state: 0,
      img1: "../../images/icon/wu-mingliang.png",
      img2: "../../images/icon/mingliang.png"
    }, {
      name: '影音',
      state: 1,
      img1: '../../images/icon/wu-dianshi.png',
      img2: '../../images/icon/dianshi.png'
    }, {
      name: '会客',
      state: 0,
      img1: '../../images/icon/wu-yuedu.png',
      img2: '../../images/icon/yuedu.png'
    }],
    intelligent: [{
      img1: "../../images/icon/fangmen.png",
      name: "房门",
      desc: "欢迎回来",
      state: true
    }, {
      img1: "../../images/icon/dengguang.png",
      name: "灯光",
      desc: "LED模式",
      state: true
    }, {
      img1: "../../images/icon/chuanglian.png",
      name: "窗帘",
      desc: "透光模式",
      state: true
    }, {
      img1: "../../images/icon/kongtiao.png",
      name: "空调",
      desc: "制冷24℃",
      state: true
    }, {
      img1: "../../images/icon/wu-dianshi.png",
      name: "电视",
      desc: "投屏模式",
      state: true
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getDate: function (e) {
    const date = new Date();
    let dateString = `${date.getMonth()+1}月${date.getDate()}日`
    return dateString;
  },
  getDay: function (e) {
    const date = new Date();
    let dayString = '';
    switch (date.getDay()) {
      case 1:
        dayString = '星期一';
        break;
      case 2:
        dayString = '星期二';
        break;
      case 3:
        dayString = '星期三';
        break;
      case 4:
        dayString = '星期四';
        break;
      case 5:
        dayString = '星期五';
        break;
      case 6:
        dayString = '星期六';
        break;
      case 0:
        dayString = '星期天';
        break;
    }
    return dayString;
  },
  intelligentButton: function (e) {
    const data = e.currentTarget.dataset.item;
    switch (data.name) {
      case "房门":
        wx.navigateToMiniProgram({
          appId: 'wx28b39cbdb3edbf22',
          path: 'pages/index/index?role=tenant'
        });
        break;
      case "电视":
        wx.navigateTo({
          url: '/pages/tv/index',
        });
        wx.setNavigationBarTitle({
          title: '电视'
        })
        break;
      case "灯光":
        wx.navigateTo({
          url: '/pages/lamplight/index',
        });
        wx.setNavigationBarTitle({
          title: '灯光'
        })
        break;
      case "窗帘":
        wx.navigateTo({
          url: '/pages/curtain/index',
        });
        wx.setNavigationBarTitle({
          title: '窗帘'
        })
        break;
      case "空调":
        wx.navigateTo({
          url: '/pages/airConditioner/index',
        });
        wx.setNavigationBarTitle({
          title: '空调'
        })
        break;
    }
  },
  circumstancesButton: function (e) {
    // 修改 模式按钮, 需要 发送请求
    const item = e.currentTarget.dataset.index;
    // 先 全部置零 然后 关键置1
    const circumstances = this.data.circumstances.map((currentValue) => {
      currentValue.state = 0;
      return currentValue;
    })
    circumstances[item].state = 1;
    this.setData({
      'circumstances': circumstances
    })
    // console.log(item);
    const util = require('../../utils/util');
    const userInfo = this.userInfo;
    const target = this.data.circumstances[item];
    const date = new Date()
    const timestamp_str = util.formatTime(date);
    const sha1_str = "Thinker@123Action=SCENECONTROLDeviceId=" + target.id + "DeviceState=STATE_ONHotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";
    // console.log(target);
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
        Action: 'SCENECONTROL',
        HotelId: userInfo.hotelId,
        RoomId: userInfo.roomNum,
        DeviceId: target.id,
        DeviceState: "STATE_ON",
        TimeStamp: timestamp_str
      },
      success: (res) => {
        this.updateScene();
      }
    })


  },
  intelligentChange: function (e) {
    const index = e.currentTarget.dataset.index;
    this.data.intelligent[index].state = !this.data.intelligent[index].state;
    this.setData({
      'intelligent': this.data.intelligent
    })
  },
  updateScene: async function () {
    const util = require('../../utils/util');
    // console.log(this.userInfo);
    // 解耦
    const userInfo = this.userInfo;
    const data = new Date();
    const timestamp_str = util.formatTime(data);
    const sha1_str = "Thinker@123Action=DEVICELISTDeviceType=SENCEHotelId=" + userInfo.hotelId + "RoomId=" + userInfo.roomNum + "TimeStamp=" + timestamp_str + "Thinker@123";
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
        DeviceType: 'SENCE',
        TimeStamp: timestamp_str
      },
      //箭头函数 this 指向上一级
      success: (res) => {
        // 开始更新 模式数据
        // 返回数据 示例
        //  {id: "SCENE.0008.9.03", control_id: "03", state: "1", name: "睡眠模式", type: "SCENE", …}
        const data = res.data.Data;
        const circumstances = this.data.circumstances;
        for (let i = 0; i < data.length; i++) {
          circumstances[i].state = data[i].state === "0" ? 0 : 1;
          circumstances[i].id = data[i].id;
        }
        this.setData({
          'circumstances': circumstances
        })
      }
    });
  },
  // 页面加载函数
  onLoad: function () {
    // 加载  并处理 相关数据
    this.userInfo = {
      username: wx.getStorageSync('username'),
      password: wx.getStorageSync('password'),
      hotelId: wx.getStorageSync('hotelId'),
      roomNum: wx.getStorageSync('roomNum')
    }
    const date = this.getDate();
    const day = this.getDay();
    const header = {
      date: date,
      day: day,
      temperature: '',
      humidity: '',
      airQuality: ''
    }
    this.setData({
      'header': header
    })
    this.updateScene();
    this.timer = setInterval(this.updateScene, 5000);
  },
  // 页面移出 清除定时器
  onHide: function () {
    clearInterval(this.timer);
    this.timer = null;
  },
  // 监听页面 卸载
  onUnload: function () {
    clearInterval(this.timer);
    this.timer = null;
  },
  onShow: function () {
    if (!this.timer) {
      this.timer = setInterval(this.updateScene, 5000);
    }
  }
})