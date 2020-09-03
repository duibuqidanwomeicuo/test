// pages/serviceIndex/index.js
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
    intelligent: [{
      img1: "../../images/icon/songwu.png",
      name: "送物服务"
    }, {
      img1: "../../images/icon/wenxun.png",
      name: "问询服务"
    }, {
      img1: "../../images/icon/dasao.png",
      name: "打扫/维修"
    }, {
      img1: "../../images/icon/xuzhu.png",
      name: "续住/退房"
    }, {
      img1: "../../images/icon/libin.png",
      name: "礼宾服务"
		}, {
      img1: "../../images/icon/pingjia.png",
      name: "评价服务"
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
      case "送物服务":
        wx.navigateTo({
          url: '/pages/songwu/index',
        });
        wx.setNavigationBarTitle({
          title: '送物服务'
        })
        break;
      case "问询服务":
        wx.navigateTo({
          url: '/pages/wenxun/index',
        })
        wx.setNavigationBarTitle({
          title: '问询服务'
        })
        break;
      case "打扫/维修":
        wx.navigateTo({
          url: '/pages/dasao/index',
        });
        wx.setNavigationBarTitle({
          title: '打扫/维修'
        })
        break;
      case "续住/退房":
        wx.navigateTo({
          url: '/pages/xuzhu/index',
        });
        wx.setNavigationBarTitle({
          title: '续住/退房'
        })
				break;
				case "礼宾服务":
					wx.navigateTo({
						url: '/pages/libin/index',
          });
          wx.setNavigationBarTitle({
            title: '礼宾服务'
          })
					break;
				case "评价服务":
					wx.navigateTo({
						url: '/pages/evaluate/index',
          });
          wx.setNavigationBarTitle({
            title: '评价服务'
          })
					break;
    }
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
  },
  fy: function(){
    wx.navigateTo({
      url: '../fy/index',
    })
  }
})