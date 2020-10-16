/*
 * @Description: 支付宝偷能量
 * @Author: Allen
 * @Date: 2020-09-27 09:17:15
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-28 09:11:44
 */

const clipText = "我在蚂蚁森林种了一棵真树，喊你一起来。KX7T6II833r长按复制打开支付宝即可";

console.show();
log("程序已运行");

// app.startActivity({
//   data: "alipay://platformapi/startapp?appId=60000002",
// });

var height = device.height;
var width = device.width;
setScreenMetrics(1080, 2160);
setClip(clipText);
sleep(1000);

log("打开支付宝");

launchApp("支付宝");

textContains("去看看").waitFor();
textContains("去看看").findOne().click();
log("进入收能量");
sleep(1500);

while (true) {
  if (textContains("startapp?appId=60000002&url=%2Fwww%2Fhome").exists()) {
    textContains("startapp?appId=60000002&url=%2Fwww%2Fhome").findOne().click();
    log("收能量结束");
    break;
  }

  className("android.widget.Button")
    .depth(8)
    .untilFind()
    .forEach((element) => {
      console.log(element.indexInParent());

      log("收集能量", textContains("收集能量").exists());

      if (textContains("收集能量").exists()) {
        const centerX = textContains("收集能量").findOne().bounds().centerX();
        const centerY = textContains("收集能量").findOne().bounds().centerY() - 20;

        log(centerX);
        log(centerY);

        click(centerX, centerY);
      }

      // || element.text()("收集能量")
      // if (element.text() == "" || element.text().indexOf("收集能量") !== -1) {
      //   const centerX = element.bounds().centerX();
      //   const centerY = element.bounds().centerY() - 20;
      //   click(centerX, centerY);
      //   log("收集能量");
      // }

      sleep(2000);
    });
  log("进行下一个");
  click(980, 1540);
  sleep(1000);
}

// textContains("收集能量").findOne().click();
