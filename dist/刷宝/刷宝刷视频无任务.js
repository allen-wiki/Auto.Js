/*
 * @Description: 刷宝自动化脚本
 * @Author: Allen
 * @Date: 2020-09-14 09:04:54
 * @LastEditors: Allen
 * @LastEditTime: 2020-10-16 11:45:57
 */

console.show();

const height = device.height;
const width = device.width;
setScreenMetrics(width, height);

log("开始运行脚本");
log("准备打开刷宝短视频");
launchApp("刷宝短视频");
textContains("首页").waitFor();
log("刷宝短视频已打开");
sleep(1000);

handleStart();

function handleStart() {
  for (var i = 1; i < 3000; i++) {
    if (!id("layProgress").exists()) {
      log("刷宝短视频未打开");
      launchApp("刷宝短视频");
      textContains("首页").waitFor();
    }
    toast("滑动" + i + "次" + "总计:" + 3000 + "次");
    slideScreenDown();
  }
}

/**
 * 屏幕向下滑动并延迟8至12秒
 */
function slideScreenDown() {
  let randomIndex = random(1, 50);
  let delayTime = random(9000, 12000);

  if (randomIndex == 6) {
    pressTime = random(200, 500);
    swipe(width / 2, 200, width / 2, height - 200, 700);
    sleep(200, 500);
  }

  if (randomIndex == 10) {
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
    sleep(2000);
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
    sleep(1000);

    sleep(delayTime);
  }
  swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
  sleep(1000);
  // 判断是否是直播
  log("是否存在praise", id("praise").exists());
  if (!id("praise").exists()) {
    sleep(1000);
    swipe(width / 2, height / 2 + 100, width / 2, 0, 800);
    slideScreenDown();
    log("下一个");
  }

  sleep(delayTime); //模仿人类随机时间
}
