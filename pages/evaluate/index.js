// pages/pingjia/index.js
let a = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
list:['卫生','环境','服务','其他'],
    stars: [0,1,2,3,4],
    noselect: "../../images/未点亮-01.png",
    select: "../../images/点亮-01.png",
    score: 0,
    scores:[0,0,0,0],
  },
  // 提交事件
  submit_evaluate: function () {
    console.log('评价得分' + a)
    this.setData({
      scores: [0,0,0,0]
    })
    a = 0
  },
  //点击整颗星
  selected: function (e) {
    var score = e.currentTarget.dataset.score
    var idx=e.currentTarget.dataset.index1
    this.data.scores[idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      }),
      a+=score
  }
})