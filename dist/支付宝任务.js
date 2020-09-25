var height = device.height;
var width = device.width;
setScreenMetrics(width, height);
const index = 0;
launchApp("支付宝");
console.show();
sleep(3000);
click("天天抽奖-每日领免费福利");
sleep(2000);

if (className("android.view.View").depth(20).text("抽奖机会").exists()) {
  className("android.view.View").depth(20).text("抽奖机会").findOne().click();
  sleep(1000);
  click("玩一玩");
  sleep(17000);
  back();

  while (click("逛一逛")) {
    console.log(index);
    click("逛一逛", index);
    sleep(15000);
    back();
    sleep(1000);
    index = index + 1;
    sleep(1000);
  }

  sleep(2000);
  console.log("领取");
  while (className("android.view.View").depth(21).text("领取").exists()) {
    className("android.view.View").depth(21).text("领取").findOne().click();
    sleep(2000);
  }

  back();
  sleep(1000);
}

sleep(1000);
console.log(className("android.view.View").depth(21).text("0元抽奖").exists());
while (className("android.view.View").depth(21).text("0元抽奖").exists()) {
  className("android.view.View").depth(21).text("0元抽奖").findOne().click();
  sleep(3000);
  if (className("android.view.View").depth(21).text("参与抽奖").exists()) {
    className("android.view.View").depth(21).text("参与抽奖").findOne().click();
    sleep(1000);
  }
  if (className("android.view.View").depth(21).text("去领卡").exists()) {
    break;
  }
  back();
  sleep(2000);
}

// sleep(1000);
// click("我的");
// sleep(1000);
// click("余额宝");
// sleep(2000);

// // const ch2 = item.findOne(className("android.view.View").depth(14));
// click(id("YEB_ONE_CENT").findOne().bounds().centerX(), id("YEB_ONE_CENT").findOne().bounds().centerY());
// // .findOne().click();
