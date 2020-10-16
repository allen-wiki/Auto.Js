console.show();
var height = device.height;
var width = device.width;
setScreenMetrics(width, height);
sleep(1000);

// 测试代码
// 判断是否可以开箱领元宝
log(descContains("开箱领元宝").exists());
if (descContains("开箱领元宝").exists()) {
  log("存在开箱领元宝任务");
  log(descContains("开箱领元宝").findOne().parent());
  const ch2 = descContains("开箱领元宝").findOne();
  click(ch2.bounds().centerX(), ch2.bounds().centerY());
  log("进行开箱领元宝任务");
  // 不执行
  sleep(1000);
  log(descContains("额外领取188元宝").exists());
  log(descContains("额外领取88元宝").exists());

  if(!descContains("额外领取188元宝").exists()){
    descContains("额外领取88元宝").findOne().click();
  } else{
    descContains("额外领取188元宝").findOne().click();
  }
  // log("等待关闭广告");
  id("tt_video_ad_close_layout").waitFor();
  id("tt_video_ad_close_layout").findOne().click();
  log("完成开箱领元宝");
  sleep(1000);

  log("关闭广告奖励弹框");
  className("android.view.View")
    .depth(7)
    .untilFind()
    .forEach((item) => {
      if (item.indexInParent() === 0) {
        if (item.clickable()) {
          item.click();
        }
      }
    });

  sleep(1000);
  click("首页");
}
