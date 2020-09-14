// 1. 做淘金币任务
// 2. 芭芭农场

var height = device.height;
var width = device.width;
setScreenMetrics(width, height);

// 淘金币任务开始

console.show();

console.log("进入淘宝");
var appRun = currentActivity();
if (appRun != "com.taobao.taobao") {
  launch("com.taobao.taobao");
  toast("打开手机淘宝中");
  waitForActivity("com.taobao.tao.TBMainActivity");
  sleep(2000);
}

handleTaoGold();

// 淘金币任务
function handleTaoGold() {
  console.log("进入淘金币");
  desc("领淘金币").waitFor();
  desc("领淘金币").findOne().click();
  textContains("赚金币").waitFor();
  console.log("点击赚金币");
  textContains("赚金币").findOne().click();
  sleep(3000);
  // 十秒任务
  className("android.view.View")
    .depth(14)
    .untilFind()
    .forEach((item) => {
      const child = item.findOne(className("android.view.View").text("浏览10s 立得"));
      const child1 = item.findOne(className("android.view.View").text("浏览10秒立得"));
      const child2 = item.findOne(className("android.widget.Button").text("去完成"));

      // 浏览任务
      if ((child !== null || child1 !== null) && child2 !== null) {
        sleep(500);
        item.click();
        sleep(2000);
        swipe10s();
        back();
        sleep(2000);
      }

      // 逛好店领一大波金币任务
      const GoingToShop = item.findOne(className("android.view.View").text("边逛边领大额金币"));
      if (GoingToShop !== null && child2 !== null) {
        item.click();
        sleep(1000);
        swipe10s();
      }

      // 签到领话费金
      const telephone = item.findOne(className("android.view.View").text("每日限领1次"));
      if (telephone !== null && child2 !== null) {
        item.click();
        sleep(1000);
        // click('签到领')
        // sleep(1000)
        swipe10s();
        sleep(500);
        back();
      }

      // 任务完成后领取奖励
      // const child3 = item.findOne(className("android.widget.Button").text("领取奖励"));
      // if (child3 !== null) {
      //   console.log(item.indexInParent());
      //   item.click();
      //   sleep(500);
      // }
    });

  while (textContains("领取奖励").exists()) {
    textContains("领取奖励").findOne().click();
    sleep(2000);
  }
  // 返回到首页
  back();
  console.log("赚金币任务完成");
  sleep(500);

  console.log("进入逛店铺");
  className("android.widget.ListView")
    .depth(13)
    .untilFind()
    .forEach((item) => {
      // 逛店铺
      if (item.indexInParent() == 0) {
        const ch2 = item.findOne(className("android.view.View").depth(14));
        click(ch2.bounds().centerX(), ch2.bounds().centerY());
        sleep(2000);
        // 逛店铺
        className("android.widget.FrameLayout")
          .depth(18)
          .untilFind()
          .forEach((itemChild) => {
            // TODO:最后两个任务不做 有点小问题
            const text = itemChild.findOne(className("android.view.View").depth(19).desc("逛10秒+10"));
            if (text !== null) {
              click(itemChild.bounds().centerX(), itemChild.bounds().centerY());
              sleep(1000);
              swipe10s();
              back();
              sleep(1000);
            }
          });
        back();
        console.log("逛店铺任务完成");
      } else if (item.indexInParent() == 1) {
        console.log("进行帮好友");
        // 帮好友
        sleep(500);
        const ch3 = item.findOne(className("android.view.View").depth(14));
        click(ch3.bounds().centerX(), ch3.bounds().centerY());
        while (textContains("去助力").exists()) {
          textContains("去助力").findOne().click();
          textContains("立即助力").waitFor();
          if (textContains("立即助力").exists()) {
            sleep(2000);
            className("android.widget.Button").text("立即助力").click();
            sleep(3000);
          }
          back();
          sleep(1000);
        }

        console.log("帮好友任务完成");
        back();
        sleep(500);
      }
    });

  console.log("所有任务完成");
  // 回到淘宝首页
  back();
  sleep(500);
  home();
}

function swipe10s() {
  for (let index = 1; index < 6; index++) {
    sleep(1000);
    swipe(width / 2, height - 500, width / 2, 0, 500);
    sleep(3000);
  }
}
