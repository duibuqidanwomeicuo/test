// pages/myIndex/invoice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputlist: [{
      id:0,
      name: "姓名",
      node: "入住人真实姓名"
    },{
      id:1,
      name: "房间号",
      node: "本次入住房间号"
    },{
      id: 2,
      name: "取票时间",
      node: "请选择取票时间"
    },{
      id: 3,
      name: "备注",
      node: "手机号、特殊要求、额外消息"
    }]
  },
  invoice: function(e){
    wx.chooseInvoiceTitle({
      success(res) {},
      complete: (res) => {

      }
    })
  }
})