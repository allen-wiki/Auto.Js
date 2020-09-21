/*
 * @Description: 淘金币任务
 * @Author: Allen
 * @Date: 2020-09-16 12:01:32
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-21 17:06:09
 */

// 淘金币
console.show();
console.setSize(300, 300);
const height = device.height;
const width = device.width;
setScreenMetrics(width, height);
var appRun = currentActivity();
if (appRun != "com.taobao.taobao") {
  launch("com.taobao.taobao");
  log("打开手机淘宝中");
  waitForActivity("com.taobao.tao.TBMainActivity");
  log("进入淘宝");
  sleep(2000);
  desc("领淘金币").waitFor();
  desc("领淘金币").findOne().click();
  log("进入淘金币");
}

sleep(2000);

// 逛店铺
handleGoShop();
sleep(1000);

// 好友助力
handleHelpingHand();
sleep(1000);
// 赚金币
handleGold();

// 好友助力
function handleHelpingHand() {
  className("android.widget.ListView")
    .depth(13)
    .untilFind()
    .forEach((item) => {
      if (item.indexInParent() == 1) {
        log("进行帮好友");
        // 帮好友
        sleep(500);
        const ch3 = item.findOne(className("android.view.View").depth(14));
        click(ch3.bounds().centerX(), ch3.bounds().centerY());
        sleep(2000);
      }
    });
  log(textContains("去助力").exists());
  while (textContains("去助力").exists()) {
    textContains("去助力").findOne().click();
    textContains("立即助力").waitFor();
    className("android.widget.Button").text("立即助力").click();
    sleep(3000);
    back();
    sleep(1000);
  }

  log("帮好友任务完成");
  back();
}

// 逛店铺任
function handleGoShop() {
  log("进入逛店铺");
  className("android.widget.ListView")
    .depth(13)
    .untilFind()
    .forEach((item) => {
      // 逛店铺
      if (item.indexInParent() == 0) {
        const ch2 = item.findOne(className("android.view.View").depth(14));
        click(ch2.bounds().centerX(), ch2.bounds().centerY());
      }
    });
  sleep(2000);
  swipe(width / 2, height - 200, width / 2, 0, 500);
  sleep(1000);
  swipe(width / 2, 200, width / 2, height - 200, 700);
  sleep(2000);

  while (desc("逛10秒+10").exists()) {
    log("逛10秒", desc("逛10秒+10").exists());
    desc("逛10秒+10").findOne().parent().click();
    swipe15s();
    sleep(2000);
  }
  log("逛店铺任务完成");
  back();
}

// 赚金币任务
function handleGold() {
  textContains("赚金币").waitFor();
  textContains("赚金币").findOne().click();
  log("点击赚金币");
  sleep(3000);
  task();
  log("所有任务已完成");
  back();
}

function task() {
  /**
   * while 里面每次都去获取可完成的任务
   * 循环当前可完成的任务
   *
   */

  let status = true;
  while (status) {
    const list = className("android.widget.Button").text("去完成").find();
    log(list.length);

    log(list.empty());

    if (!list.empty()) {
      log("存在去完成任务");

      list.forEach(function (tv) {
        const layout = tv.parent();

        if (layout == null) {
          return;
        }
        // log("逛10s立得", layout);
        const text = layout.findOne(className("android.view.View").text("逛10s立得"));
        // log("浏览10秒立得", layout);
        const text1 = layout.findOne(className("android.view.View").text("浏览10秒立得"));
        // log("浏览10s立得", layout);
        const text2 = layout.findOne(className("android.view.View").text("浏览10s立得"));
        // log("浏览10s 立得", layout);
        const text3 = layout.findOne(className("android.view.View").text("浏览10s 立得"));
        // const content = layout.findOne(className("android.view.View").text("浏览10s立得"));
        sleep(1000);

        if (text == null && text1 == null && text2 == null && text3 == null) {
          log("1111");
          status = false;
        }

        if (text !== null) {
          log("text点击");
          layout.click();
          sleep(1000);
          swipe15s();
        }
        if (text1 !== null) {
          log("text1点击");
          layout.click();
          sleep(1000);
          swipe15s();
        }

        if (text2 !== null) {
          log("text2点击");
          layout.click();
          sleep(1000);
          swipe15s();
        }

        if (text3 !== null) {
          log("text3点击");
          layout.click();
          sleep(1000);
          swipe15s();
        }
      });
    } else {
      status = false;
    }

    sleep(3000);
  }
}

function swipe15s() {
  for (let index = 1; index < 8; index++) {
    swipe(width / 2, height - 200, width / 2, 0, 500);
    sleep(3000);
  }
  back();
  sleep(2000);
  while (textContains("领取奖励").exists()) {
    textContains("领取奖励").findOne().click();
    sleep(2000);
  }
}
