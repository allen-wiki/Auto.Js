/*
 * @Description: 支付宝任务
 * @Author: Allen
 * @Date: 2020-09-14 16:46:16
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-27 11:04:50
 */
console.show();
log("程序已运行");

var height = device.height;
var width = device.width;
setScreenMetrics(1080, 2160);

handleLottery();

// 天天抽奖
function handleLottery() {
  log(textContains("天天抽奖-每日领免费福利").exists());
  textContains("天天抽奖-每日领免费福利").waitFor();
  textContains("天天抽奖-每日领免费福利").findOne().parent().click();
  log("进入天天抽奖-每日领免费福利");

  // className("android.view.View").depth(20).text("抽奖机会").exists()
  textContains("抽奖机会").waitFor();
  textContains("抽奖机会").findOne().click();

  sleep(2000);
  log(textContains("逛一逛").exists());

  let index = 0;

  while (click("逛一逛")) {
    console.log(index);
    click("逛一逛", index);
    sleep(15000);
    back();
    sleep(1000);
    index = index + 1;
    sleep(1000);
  }
}
