// pages/tv/tv.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	onXiaButton:function(e){
		console.log("下")
	},
	onShangButton:function(e){
		console.log("上")
	},
	onZuoButton:function(e){
		console.log('左')
	},
	onZhongButton:function(e){
		console.log('ok')
	},
	onYouButton:function(e){
		console.log('右')
	},
	onVolumeUp:function(e){
		console.log('音量+')
	},
	onVolumeDown:function(e){
		console.log('音量-')
	},
	onBootButton:function(e){
		console.log('开机')
	},
	onMenuButton:function(e){
		console.log('菜单')
	},
	onBackButton:function(e){
		console.log('返回上一级')
		wx.navigateBack({
		  delta: 1
		})
	}

})