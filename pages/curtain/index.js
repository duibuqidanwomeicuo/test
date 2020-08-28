Page({
  data:{
    curtainList:[{
      name:'遮光帘',
      state: true,
      progress:50,
      // 灰
      img1:'http://qehhe97e4.bkt.clouddn.com/%E9%81%AE%E5%85%89%E5%B8%98%E7%81%B0-01.png',
      // 亮
      img2:'http://qehhe97e4.bkt.clouddn.com/%E9%81%AE%E5%85%89%E5%B8%98%E8%93%9D-01.png'
    },{
      name:'纱帘',
      state: true,
      progress:50,
      img1:'http://qehhe97e4.bkt.clouddn.com/%E7%BA%B1%E5%B8%98%E7%81%B0-01.png',
      img2:'http://qehhe97e4.bkt.clouddn.com/%E7%BA%B1%E5%B8%98%E8%93%9D-01.png'
    },{
      name:'布帘',
      state: true,
      progress:50,
      img1:'http://qehhe97e4.bkt.clouddn.com/%E5%B8%83%E5%B8%98%E7%81%B0-01.png',
      img2:'http://qehhe97e4.bkt.clouddn.com/%E5%B8%83%E5%B8%98%E8%93%9D-01.png'
    },{
      name:'百叶窗',
      state: true,
      progress:50,
      img1:'http://qehhe97e4.bkt.clouddn.com/%E7%99%BE%E5%8F%B6%E7%AA%97%E7%81%B0-01.png',
      img2:'http://qehhe97e4.bkt.clouddn.com/%E7%99%BE%E5%8F%B6%E7%AA%97%E8%93%9D-01.png'
    }
  ],
    nowLamp: 0,
  },
  modeChange:function(e){
    
    const index = this.data.nowLamp;
    this.data.curtainList[index].state = !this.data.curtainList[index].state;
    if(this.data.curtainList[index].state)     this.data.curtainList[this.data.nowLamp].progress = 50;
    else this.data.curtainList[this.data.nowLamp].progress = 0;
    this.setData({'curtainList':this.data.curtainList});
  },
  tarbarChange:function(e){
    // console.log(e);
    const index = e.currentTarget.dataset.index;
    this.setData({'nowLamp':index});
  },
  buttonChange:function(e){
    const button = e.target.id;
    if(button === "button2"){
      if(this.data.curtainList[this.data.nowLamp].progress >= 100) return;
      this.data.curtainList[this.data.nowLamp].progress += 10;
      if(this.data.curtainList[this.data.nowLamp].progress >0)
          this.data.curtainList[this.data.nowLamp].state = true;
      this.setData({'curtainList':this.data.curtainList})
    }
    if(button === "button1"){
      if(this.data.curtainList[this.data.nowLamp].progress <= 0) return;
      this.data.curtainList[this.data.nowLamp].progress -= 10;
      if(this.data.curtainList[this.data.nowLamp].progress <=0)        
          this.data.curtainList[this.data.nowLamp].state =  false;
      this.setData({'curtainList':this.data.curtainList});
    }
  }
})
  