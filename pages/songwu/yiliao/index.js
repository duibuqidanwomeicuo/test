// pages/songwu/yiliao/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money: [{
      id: 0,
      name: "全部",
      number: 31.0,
      image: "../../../images/选择蓝-01.png"
    },
  {
    id: 1,
    name: "创可贴",
    number: 2.0,
    image: "../../../images/选择蓝-01.png"
  },{
    id: 2,
    name: "感冒药",
    number: 15.0,
    image: "../../../images/选择蓝-01.png"
  },{
    id: 3,
    name: "退热贴",
    number: 10.0,
    image: "../../../images/选择蓝-01.png"
  },{
    id: 4,
    name: "棉签",
    number: 2.0,
    image: "../../../images/选择蓝-01.png"
  },{
    id: 5,
    name: "纱布",
    number: 2.0,
    image: "../../../images/选择蓝-01.png"
  }]
  },
  itembutton: function(e){
    const data = e.currentTarget.dataset.item;
    switch (data.name) {
      case "全部":
        if (data.image == "../../../images/选择蓝-01.png"){
          this.setData({
          'money[0].image': "../../../images/选择金-01.png"
        })
        wx.request({
          url: 'url',
          
        })
       
        }else {
          this.setData({
            'money[0].image': "../../../images/选择蓝-01.png"
          })
         
        }
       
        break;
      case "创可贴":
        if (data.image == "../../../images/选择蓝-01.png"){
          this.setData({
          'money[1].image': "../../../images/选择金-01.png"
        })
        }else {
          this.setData({
            'money[1].image': "../../../images/选择蓝-01.png"
          })
        }
      
        break;
      case "感冒药":
        if (data.image == "../../../images/选择蓝-01.png"){
          this.setData({
          'money[2].image': "../../../images/选择金-01.png"
        })
        }else {
          this.setData({
            'money[2].image': "../../../images/选择蓝-01.png"
          })
        }
        
        break;
      case "退热贴":
        if (data.image == "../../../images/选择蓝-01.png"){
          this.setData({
          'money[3].image': "../../../images/选择金-01.png"
        })
        }else {
          this.setData({
            'money[3].image': "../../../images/选择蓝-01.png"
          })
        }
       
        break;
      case "棉签":
        if (data.image == "../../../images/选择蓝-01.png"){
          this.setData({
          'money[4].image': "../../../images/选择金-01.png"
        })
        }else {
          this.setData({
            'money[4].image': "../../../images/选择蓝-01.png"
          })
        }
        
        break;
      case "纱布":
        if (data.image == "../../../images/选择蓝-01.png"){
          this.setData({
          'money[5].image': "../../../images/选择金-01.png"
        })
        }else {
          this.setData({
            'money[5].image': "../../../images/选择蓝-01.png"
          })
        }
        
        break;
      }
    }
})