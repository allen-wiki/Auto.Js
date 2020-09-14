var height = device.height;
var width = device.width;
setScreenMetrics(width, height);

// 种树开始
console.show();

console.log("进入淘宝");
var appRun = currentActivity();
if (appRun != "com.taobao.taobao") {
  launch("com.taobao.taobao");
  toast("打开手机淘宝中");
  waitForActivity("com.taobao.tao.TBMainActivity");
  sleep(2000);
}

console.log("进入芭芭农场");

desc("芭芭农场").waitFor();
desc("芭芭农场").findOne().click();
sleep(3000);

// 判断是否在第一棵数
className("android.view.View")
  .depth(19)
  .untilFind()
  .forEach((item) => {
    const img = item.findOne(
      className("android.widget.Image").depth(20).text("TB1X9ITzND1gK0jSZFsXXbldVXa-52-52.png_1080x1800Q50s50.jpg_")
    );

    const text = item.findOne(className("android.view.View").depth(20).text("2/2"));
    if (img !== null && text !== null) {
      img.click();
    }
  });
sleep(1000);

// 点击集肥料
className("android.widget.Image")
  .depth(20)
  .untilFind()
  .forEach((element) => {
    if (element.indexInParent() == 6 || element.indexInParent() == 5) {
      element.click();
      console.log("点击集肥料");
    }
  });

sleep(2000);
// 点击签到
if (className("android.widget.Button").text("去签到").exists()) {
  className("android.widget.Button").text("去签到").click();
  console.log("签到成功");
}

sleep(2000);
if (textContains("去浏览").exists()) {
  console.log("进行浏览任务");
  swipe18s("去浏览");
  console.log("浏览任务完成");
}
sleep(2000);
if (className("android.widget.Button").text("去领取").exists()) {
  className("android.widget.Button").text("去领取").click();
}

sleep(1000);

TODO: 未完成去抽奖;
if (className("android.widget.Button").text("去抽奖").exists()) {
  className("android.widget.Button").text("去抽奖").click();
}

sleep(1000);

// TODO: 不完善
// 去支付宝逛逛
if (className("android.widget.Button").text("去逛逛").exists()) {
  className("android.widget.Button").text("去逛逛").click();
  sleep(5000);

  if (className("android.view.View").text("继续赚肥料").exists()) {
    className("android.view.View").text("继续赚肥料").click();
  }

  while (className("android.view.View").text("领取").exists()) {
    className("android.view.View").text("领取").click();
    sleep(2000);
  }

  sleep(1000);
  if (className("android.view.View").text("去签到").exists()) {
    className("android.view.View").text("去签到").click();
  }
}

function swipe18s(act) {
  while (textContains(act).exists()) {
    toast("存在" + act);
    textContains(act).findOne().click();
    sleep(17000);
    for (let index = 1; index < 9; index++) {
      swipe(width / 2, height - 200, width / 2, 0, 500);
      sleep(2500);
    }
    back();
    sleep(1000);
  }
}
