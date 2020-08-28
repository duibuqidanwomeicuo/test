// pages/songwu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemdata: [{
    id: 0,
    name: "医疗应急"
  },
  {
    id: 1,
    name: "生活用品"
  },{
    id: 2,
    name: "女士用品"
  },{
    id: 3,
    name: "儿童用品"
  },{
    id: 4,
    name: "男士用品"
  },{
    id: 5,
    name: "洗衣服务"
  }]
},
itembutton: function(e){
  const data = e.currentTarget.dataset.item;
  switch (data.name) {
    case "医疗应急":
      wx.navigateTo({
        url: '/pages/songwu/yiliao/index'
      });
      wx.setNavigationBarTitle({
        title: '医疗应急'
      })
      break;
    case "生活用品":
      wx.navigateTo({
        url: '/pages/songwu/shenghuo/index'
      });
      wx.setNavigationBarTitle({
        title: '生活用品'
      })
      break;
    case "女士用品":
      wx.navigateTo({
        url: '/pages/songwu/nvshi/index'
      });
      wx.setNavigationBarTitle({
        title: '女士用品'
      })
      break;
    case "儿童用品":
      wx.navigateTo({
        url: '/pages/songwu/ertong/index'
      });
      wx.setNavigationBarTitle({
        title: '儿童用品'
      })
      break;
    case "男士用品":
      wx.navigateTo({
        url: '/pages/songwu/nanshi/index'
      });
      wx.setNavigationBarTitle({
        title: '男士用品'
      })
      break;
    case "洗衣服务":
      wx.navigateTo({
        url: '/pages/songwu/xiyi/index'
      });
      wx.setNavigationBarTitle({
        title: '洗衣服务'
      })
      break;
    }
}
})
