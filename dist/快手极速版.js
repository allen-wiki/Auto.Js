/*
 * @Description: 快手极速版
 * @Author: Allen
 * @Date: 2020-09-14 09:04:54
 * @LastEditors: Allen
 * @LastEditTime: 2020-10-16 14:58:27
 */

console.show();

const height = device.height;
const width = device.width;
setScreenMetrics(width, height);

const COUNT = 4000;

log("开始运行脚本");
log("准备打开快手极速版");
launchApp("快手极速版");
id("left_btn").waitFor();
log("快手极速版已打开");

id("left_btn").click();

log("打开菜单");
textContains("去赚钱").waitFor();
textContains("去赚钱").findOne().parent().click();
log("去赚钱");
textContains("日常任务").waitFor();
log("进入任务页面");
if (textContains("福利").exists()) {
  log("进行福利任务");
  while (textContains("福利")) {
    log(textContains("福利").findOne().text());
    textContains("福利").findOne().click();
    id("video_close_icon").waitFor();
    id("video_close_icon").findOne().click();
    log("关闭广告视频");
    sleep(1200);
  }
} else {
  log("福利视频已完成");
}

if (textContains("观看精彩直播得100金币").exists()) {
  const text1 = textContains("观看精彩直播得100金币").findOne().text();
  const count = 10 - Number(text1.substr(-4, 1));
  log("观看次数", count);
  if (count > 0) {
    className("android.widget.Button")
      .depth(3)
      .untilFind()
      .forEach((item) => {
        if (
          (item.indexInParent() === 32 || item.indexInParent() === 35) &&
          item.text() == "看直播"
        ) {
          item.click();
          sleep(800);
        }
      });

    for (let index = 1; index <= count + 1; index++) {
      log("进行第", index);
      sleep(20000);
      swipe(width / 2, height - 200, width / 2, 0, 700);
    }

    back();
    log("看直播已完成");
    sleep(800);
    back();
  }
} else {
  log("看直播已完成");
  back();
}

for (var i = 1; i < COUNT; i++) {
  toast("滑动" + i + "次" + "总计:" + COUNT + "次");
  slideScreenDown();
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
  }

  if (randomIndex == 10) {
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
    sleep(2000);
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
  }
  swipe(width / 2, height / 2 + 300, width / 2, 0, 800);

  sleep(1000);
  log(
    id("thanos_ad_caption_tv").exists(),
    id("than nebula_hot_live_count_down_cancelos_ad_caption_tv").exists()
  );
  if (
    id("thanos_ad_caption_tv").exists() ||
    id("than nebula_hot_live_count_down_cancelos_ad_caption_tv").exists()
  ) {
    slideScreenDown();
  }

  log(delayTime);

  sleep(delayTime); //模仿人类随机时间
}
