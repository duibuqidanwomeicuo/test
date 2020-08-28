// pages/xuzhu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xuzhulist: [{
      id:0,
      name: '续住半天',
      image: ''
    },{
      id: 1,
      name: '续住一天',
      image: ''
    }],
    tflist: [{
      id: 0,
      name: '即时退房',
      image: ''
    },{
      id: 1,
      name: '预约退房',
      image: ''
    }],
    select1: false,
    image1: '../../images/收起-01.png',
    select2: false,
    image2: '../../images/收起-01.png',
  }, 
   // 续住的下拉列表点击事件
   xuzhulist: function(e){
    if(this.data.image1 == '../../images/收起-01.png'){
      this.setData({
      'image1': "../../images/展开-01.png",
      'select1': !this.data.select1
    })
    console.log(this.data.select1)
    }else{
      this.setData({
        'image1': "../../images/收起-01.png",
        'select1': !this.data.select1
      })
      console.log(this.data.select1)
    } 
  },
  // 退房的下拉列表点击事件
  tflist: function(e){
    if(this.data.image2 == '../../images/收起-01.png'){
      this.setData({
      'image2': "../../images/展开-01.png",
      'select2': !this.data.select2
    })
    }else{
      this.setData({
        'image2': "../../images/收起-01.png",
        'select2': !this.data.select2
      })
    }
  },
  // 续住列表项的点击事件
  xuzhuselect: function(e){
    const data = e.currentTarget.dataset.item;
    switch (data.name) {
      case "续住半天":
        if (data.image == ""){
          this.setData({
          'xuzhulist[0].image': "../../images/选择金-01.png"
        })
       
        }else {
          this.setData({
            'xuzhulist[0].image': ""
          })
        }
        break;
      case "续住一天":
        if (data.image == ""){
          this.setData({
          'xuzhulist[1].image': "../../images/选择金-01.png",
        })
        
        }else {
          this.setData({
            'xuzhulist[1].image': "",
          })
        }
        break;
      }
    },
    // 退房列表项的点击事件
  tfselect: function(e){
    const data = e.currentTarget.dataset.item;
    switch (data.name) {
      case "即时退房":
        if (data.image == ""){
          this.setData({
          'tflist[0].image': "../../images/选择金-01.png"
        })
       
        }else {
          this.setData({
            'tflist[0].image': ""
          })
        }
        break;
      case "预约退房":
        if (data.image == ""){
          this.setData({
          'tflist[1].image': "../../images/选择金-01.png",
        })
        
        }else {
          this.setData({
            'tflist[1].image': "",
          })
        }
        break;
      }
    }
})