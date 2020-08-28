// pages/dasao/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dasao: [{
      id: 0,
      name: "立即服务",
      image: ''
    },
    {
      id: 1,
      name: '定时服务',
      image: ''
    },
    {
      id: 2,
      name: '特殊要求',
      image: ''
    }],
    weixiu: [{
      id: 0,
      name: '网络',
      image: ''
    },{
      id: 1,
      name: '电器',
      image: ''
    },{
      id: 2,
      name: '灯光',
      image: ''
    },{
      id: 3,
      name: '插座',
      image: ''
    },{
      id: 4,
      name: '空调',
      image: ''
    }],
    select1: false,
    image1: '../../images/收起-01.png',
    select2: false,
    image2: '../../images/收起-01.png',
    select3: false,
    time: "12:00",
    date: "",
    discussShow: true
  },
  // 打扫的下拉列表点击事件
  dasaolist: function(e){
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
  // 维修的下拉列表点击事件
  weixiulist: function(e){
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
  // 打扫列表项的点击事件
  dasaoselect: function(e){
    const data = e.currentTarget.dataset.item;
    switch (data.name) {
      case "立即服务":
        if (data.image == ""){
          this.setData({
          'dasao[0].image': "../../images/选择金-01.png"
        })
        wx.showToast({
          title: '服务已成功预约，请稍等片刻。',
          icon: "none",
          duration: 2000
        })
        }else {
          this.setData({
            'dasao[0].image': ""
          })
        }
        break;
      case "定时服务":
        if (data.image == ""){
          this.setData({
          'dasao[1].image': "../../images/选择金-01.png",
          // 'select3': !this.data.select3
        })
        
        }else {
          this.setData({
            'dasao[1].image': "",
            // 'select3': !this.data.select3
          })
        }
        break;
        case "特殊要求":
        if (data.image == ""){
          this.setData({
          'dasao[2].image': "../../images/选择金-01.png"
        })

        }else {
          this.setData({
            'dasao[2].image': ""
          })
        }
        break;
      }
    },
    // 维修列表项的点击事件
    weixiuselect: function(e){
      const data = e.currentTarget.dataset.item;
      switch (data.name) {
      case "网络":
        if (data.image == ""){
          this.setData({
          'weixiu[0].image': "../../images/选择金-01.png"
        })
        }else {
          this.setData({
            'weixiu[0].image': ""
          })
        }
        break;
      case "电器":
        if (data.image == ""){
          this.setData({
          'weixiu[1].image': "../../images/选择金-01.png"
        })
        
        }else {
          this.setData({
            'weixiu[1].image': ""
          })
        }
        break;
        case "灯光":
          if (data.image == ""){
            this.setData({
            'weixiu[2].image': "../../images/选择金-01.png"
          })
          }else {
            this.setData({
              'weixiu[2].image': ""
            })
          }
          break;
          case "插座":
          if (data.image == ""){
            this.setData({
            'weixiu[3].image': "../../images/选择金-01.png"
          })
          }else {
            this.setData({
              'weixiu[3].image': ""
            })
          }
          break;
          case "空调":
            if (data.image == ""){
              this.setData({
              'weixiu[4].image': "../../images/选择金-01.png"
            })
            }else {
              this.setData({
                'weixiu[4].image': ""
              })
            }
            break;
        }
      },
      submit: function() { // 实现评论功能，将发布的评论同步到云数据库
        let value = this.data.inputValue;
        let new_id = this.data.new_id;
        let userInfo = this.data.userInfo
        // let new_id = '6594157273642172936'
        if(userInfo){
          comments.where({
            new_id: new_id
          }).get({
            success: (res) => {
              // console.log(res)
              let comms= res.data[0].comments;
              let people = {
                content: value,
                like: 0,
                avatar: userInfo.avatarUrl,
                nickname: userInfo.nickname
              }
              comms.unshift(people);
              // console.log(comm)
              this.setData({
                comms: comms,
                input: '',
              })
              wx.cloud.callFunction({
                name: 'updateComments',
                data: {
                  new_id: new_id,
                  comms: comms
                }
              }).then(res =>{
                console.log(res)
              })
      
            }
          })
        }
      }
})