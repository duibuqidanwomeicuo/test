// pages/libin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 0,
      name: '行李运送',
      image: ''
    },{
      id: 1,
      name: '叫车',
      image: ''
    },{
      id: 2,
      name: '送花',
      image: ''
    },{
      id: 3,
      name: '配合惊喜',
      image: ''
    },{
      id: 4,
      name: '租车',
      image: ''
    },{
      id: 5,
      name: '跑腿',
      image: ''
    },{
      id: 6,
      name: '缝衣扣',
      image: ''
    },{
      id: 7,
      name: '叫醒服务',
      image: ''
    }]
  },
  listselect: function(e){
    const data = e.currentTarget.dataset.item;
    console.log(data.id)
    switch (data.name) {
    case "行李运送":
      if (data.image == ""){
        this.setData({
        'list[0].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[0].image': ""})
      }
      break;
    case "叫车":
      if (data.image == ""){
        this.setData({
        'list[1].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[1].image': ""})
      }
      break;
    case "送花":
      if (data.image == ""){
        this.setData({
        'list[2].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[2].image': ""})
      }
      break;
    case "配合惊喜":
      if (data.image == ""){
        this.setData({
        'list[3].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[3].image': ""})
      }
      break;
    case "租车":
      if (data.image == ""){
        this.setData({
        'list[4].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[4].image': ""})
      }
      break;
    case "跑腿":
      if (data.image == ""){
        this.setData({
        'list[5].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[5].image': ""})
      }
      break;
    case "缝衣扣":
      if (data.image == ""){
        this.setData({
        'list[6].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[6].image': ""})
      }
      break;
    case "叫醒服务":
      if (data.image == ""){
        this.setData({
        'list[7].image': "../../images/选择金-01.png"
      })
      }else {
        this.setData({'list[7].image': ""})
      }
      break;
    }
  }
})