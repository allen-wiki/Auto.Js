/*
 * @Description: 支付宝助力
 * @Author: Allen
 * @Date: 2020-09-15 13:28:29
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-21 09:05:27
 */
console.show();

zfbqunHelp();

// 支付宝助力群
function zfbqunHelp() {
  var appRun = currentActivity();
  if (appRun != "com.eg.android.AlipayGphone.AlipayLogin") {
    log("打开支付宝中...");
    launchApp("支付宝");
    log("支付宝已打开");
    sleep(5000);
  }
  click("消息");
  log("点击了消息");
  sleep(1000);
  click("支付宝助力群");
  log("进入助力力群");
  sleep(1000);
  log("正在获取助力信息");
  swipe(device.width / 2, 500, device.width / 2, device.height - 200, 700);
  className("android.widget.TextView")
    .text("小手一抖，肥料到手！")
    .untilFind()
    .forEach((element, index) => {
      log("助力信息获取成功");
      element.parent().click();
      log("点击" + index);
      sleep(2000);
      log("开始助力任务");
      className("android.view.View").text("为Ta助力").waitFor();
      className("android.view.View").text("为Ta助力").click();
      log("点击了为Ta助力");
      className("android.view.View").text("去种果树").waitFor();
      if (className("android.view.View").text("今日助力好友次数已满，明天再来").exists()) {
        sleep(1000);
        className("android.view.View").text("去种果树").click();
        log("点击了去种果树");
        log("助力已上限");
        exit();
      } else {
        sleep(1000);
        className("android.view.View").text("去种果树").click();
        log("点击了去种果树");
        sleep(1500);
        if (className("android.view.View").text("领取").exists()) {
          className("android.view.View").text("领取").findOne().click();
        }
        sleep(1000);
        back();
        sleep(500);
        back();
      }
      sleep(1000);
    });
  log("助力完成");
}
