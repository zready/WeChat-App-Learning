// addLocView.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    locInfo : {
    },
    hasErr: false
  },

  bindRegionChange: function (e) {
    this.data.locInfo.region = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  bindNameChange: function(e) {
    this.data.locInfo.name = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  bindNumChange: function(e) {
    this.data.locInfo.num = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  bindAddressChange: function (e) {
    this.data.locInfo.address = e.detail.value
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  checkData: function() {
    if (this.data.locInfo.name == "" || this.data.locInfo.num == "" || this.data.locInfo.address == "") {
      this.data.hasErr = true;
      this.setData({
        hasErr: this.data.hasErr
      })
      return false;
    }
    return true;
  },

  saveLocBtnTap: function() {
    if (this.checkData() == false) return;
    var newLoc = this.data.locInfo;

    //更新信息数组函数
    function updateInfoArr(userLocInfo, newLoc) {
      //如果只有一个设置为默认地址
      if (userLocInfo.length == 0) newLoc.isDefault = true;

      //判断是更新还是增加
      var checkPos = -1;
      for (var i in userLocInfo) {
        if (userLocInfo[i].id == newLoc.id) {
          checkPos = i;
        }
      }
      if (checkPos == -1) {
        console.log("add a new loc");
        userLocInfo.push(newLoc);
      } else {
        console.log("update a old loc")
        userLocInfo.splice(checkPos, 1, newLoc);
      }

      wx.setStorage({
        key: 'UserLocInfo',
        data: userLocInfo,
      })
    }

    wx.showToast({
      title: '成功',
      duration: 500
    })

    wx.getStorage({
      key: "UserLocInfo",
      //这里确保数据完成存储再跳转页面
      success: function(res) {
        var userLocInfo = res.data;
        updateInfoArr(userLocInfo, newLoc);
        wx.redirectTo ({
          url: '../locMan/locManView',
        })
      },
      fail: function(e) {
        updateInfoArr([], newLoc);
        console.log(e.errMsg);
        console.log("初始化数据")
        wx.redirectTo({
          url: '../locMan/locManView',
        })
      }
    })
    //Todo
    //更新后端数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.locInfo = {
        id: options.id,
        num: options.num || "",
        name: options.name || "",
        region: [options.region0 || '北京市', options.region1 || '北京市', options.region2 || '东城区'],
        address: options.address,
        isDefault: options.isDefault || 0
    }
    //更新页面放到onReady调用减少调用次数
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      locInfo: this.data.locInfo
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})