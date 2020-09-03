// pages/myIndex/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		servicelist: [{
			id: 0,
			name: "全部服务"
		},
	{
			id: 1,
			name: "待服务",
			number: 0,
			numcolor: 'red'
	},
	{
	        id: 2,
			name: "处理中",
			number: 0,
			numcolor: 'blue'
	},{
		    id: 3,
				name: "已服务",
				number: 0,
				numcolor: 'green'
	},{
			id: 4,
			name: "待评价"
	},{
			id: 5,
			name: "自助发票"
	}],
	userInfo: {}
	},
	onLoad: function(){
		wx.cloud.init();
		wx.cloud.callFunction({
			name: 'add',
			complete: res =>{
				console.log('callFunction add reault:', res)
			}
		})
	},
	onShow:function(){
		const userInfo = wx.getStorageSync("userInfo");
		this.setData(userInfo)
		//  const userinfodata =wx.getStorageSync({
		//   key: 'username'
		// })
	console.log(this.data.userInfo)
	},
	intelligentButton: function (e) {
		const data = e.currentTarget.dataset.item;
		console.log(data)
		switch (data.name) {
		  case "全部服务":
			wx.navigateTo({
				url: '/pages/myIndex/allserver/index',
			  });
			  wx.setNavigationBarTitle({
				title: '全部服务'
			  })
			  break;
		  case "待服务":
			wx.navigateTo({
			  url: '/pages/myIndex/stayserver/index',
			});
			wx.setNavigationBarTitle({
			  title: '待服务'
			})
			break;
		  case "处理中":
			wx.navigateTo({
			  url: '/pages/myIndex/servering/index',
			});
			wx.setNavigationBarTitle({
			  title: '处理中'
			})
			break;
		  case "已服务":
			wx.navigateTo({
			  url: '/pages/myIndex/served/index',
			});
			wx.setNavigationBarTitle({
			  title: '已服务'
			})
			break;
		  case "待评价":
			wx.navigateTo({
			  url: '/pages/myIndex/stayevaluation/index',
			});
			wx.setNavigationBarTitle({
			  title: '待评价'
			})
			break;
		case "自助发票":
			wx.navigateTo({
			  url: '/pages/myIndex/invoice/index',
			});
			wx.setNavigationBarTitle({
			  title: '自助发票'
			})
			break;
		}
	  },
	  fy: function(){
		wx.navigateTo({
		  url: '../fy/index',
		})
	  }

})
