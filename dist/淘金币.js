/*
 * @Description: 淘金币
 * @Author: Allen
 * @Date: 2020-09-23 10:56:53
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-23 13:23:09
 */
console.show();

const height = device.height;
const width = device.width;
setScreenMetrics(width, height);

// 进入淘金币
var appRun = currentActivity();
if (appRun != "com.taobao.taobao") {
  launch("com.taobao.taobao");
  log("打开手机淘宝中");
  waitForActivity("com.taobao.tao.TBMainActivity");
  log("进入淘宝");
  desc("领淘金币").findOne().click();
  log("进入淘金币");
}

handleGoShop();
sleep(1000);
handleHelpingHand();
sleep(1000);
textContains("赚金币").waitFor();
textContains("赚金币").findOne().click();
log("点击赚金币");
// 判断是否进入页面
textContains("做任务赚金币").waitFor();
log("进入做任务赚金币页面");

let goldStatus = true;
handleGold();
// 开始任务
function handleGold() {
  // 获取当前当前所有去完成按钮组件
  const list = className("android.widget.Button").text("去完成").untilFind();
  let listWrap = [];
  let count = 0;
  let taskStatus = true;
  list.forEach((element) => {
    listWrap.push(element.parent());
  });

  if (listWrap.length <= 3) {
    log("任务已完成");

    home();
    goldStatus = false;
  }
  log("length", listWrap.length);
  while (taskStatus) {
    if (count >= listWrap.length) {
      taskStatus = false;
      break;
    }
    log("count", count);
    task(listWrap, count);
    count = count + 1;
    sleep(1000);
  }

  while (textContains("领取奖励").exists()) {
    textContains("领取奖励").findOne().click();
    sleep(2000);
  }

  if (goldStatus) {
    handleGold();
  }
}

function task(listWrap, countNumber) {
  // 单个模块
  const item = listWrap[countNumber];
  const itemText = item.findOne(textContains("浏览"));
  const itemText1 = item.findOne(textContains("逛"));
  const itemText2 = item.findOne(textContains("边逛边领大额金币"));
  const itemText3 = item.findOne(textContains("每日限领"));
  const btn = item.findOne(className("android.widget.Button").text("去完成"));
  if (
    (itemText !== null || itemText1 !== null || itemText2 !== null || itemText3 !== null) &&
    btn !== null
  ) {
    sleep(500);
    btn.click();

    if (btn.click()) {
      sleep(2000);
      swipe15s();
    }
  } else {
    log("不存在,进行下一个");
    return "-1";
  }
}

function swipe15s() {
  log("进行浏览任务");
  for (let index = 1; index < 7; index++) {
    swipe(width / 2, height - 200, width / 2, 0, 500);
    sleep(3000);
  }
  back();
  sleep(2000);
}

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
  swipe(width / 2, height - 200, width / 2, 0, 700);
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

function log(text) {
  console.log(text);
  // toast(text);
}
