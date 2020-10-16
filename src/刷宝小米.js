console.show();

const height = device.height;
const width = device.width;
setScreenMetrics(width, height);

let dataList = [];
let count = 0;
for (let index = 1; index <= 20; index++) {
  dataList.push(Format(add(new Date(), 15 * index), "hh:mm"));
}

log("开始运行脚本");
log("准备打开刷宝短视频");
launchApp("刷宝短视频");
textContains("首页").waitFor();
log("刷宝短视频已打开");
layProgress();
sleep(1000);

for (var i = 1; i < 1000; i++) {
  log(dataList[count], currentActivity());
  if (Format(new Date(), "hh:mm") == dataList[count]) {
    log("进行第" + count + "次任务");
    handleTaskVideo();
  } else if (i > 5 && currentActivity() !== "com.jm.video.ui.main.MainActivity") {
    log("刷宝短视频未打开");
    launchApp("刷宝短视频");
    textContains("首页").waitFor();
    slideScreenDown();
  } else {
    slideScreenDown();
  }
}

function handleTaskVideo() {
  click("任务");
  log("点击任务");
  descContains("继续赚元宝").waitFor();
  log("进入任务页面");

  log("去观看", descContains("去观看").exists());
  if (descContains("去观看").exists()) {
    log("点击去观看");
    descContains("去观看").findOne().click();
    // 判断广告结束是否出现关闭按钮 768 455
    id("tt_video_ad_close_layout").waitFor();
    id("tt_video_ad_close_layout").findOne().click();

    sleep(3000);
    className("android.view.View")
      .depth(7)
      .untilFind()
      .forEach((item) => {
        if (item.indexInParent() === 0) {
          if (item.clickable()) {
            item.click();
          }
        }
      });
    log("观看结束");
  }

  log("开箱领元宝", descContains("开箱领元宝").exists());
  // 判断是否可以开箱领元宝
  if (descContains("开箱领元宝").exists()) {
    log("存在开箱领元宝任务");
    descContains("开箱领元宝").findOne().parent().click();
    log("进行开箱领元宝任务");
    // 不执行
    sleep(3000);
    const clickStatus = click("额外领取188元宝");
    if (!clickStatus) {
      click("额外领取88元宝");
    }
    id("tt_video_ad_close_layout").waitFor();
    id("tt_video_ad_close_layout").findOne().click();
    log("完成开箱领元宝");
    sleep(1000);

    className("android.view.View")
      .depth(7)
      .untilFind()
      .forEach((item) => {
        if (item.indexInParent() === 0) {
          if (item.clickable()) {
            item.click();
          }
        }
      });
  }
}

// 红包视频任务
function layProgress() {
  const layProgress = id("layProgress").findOne();
  log(layProgress.bounds().centerX(), layProgress.bounds().centerY());
  sleep(1000);
  click(layProgress.bounds().centerX(), layProgress.bounds().centerY());
  descContains("元宝流水").waitFor();
  log("是否存在立即观看", descContains("立即观看").exists());
  if (descContains("立即观看").exists()) {
    while (descContains("立即观看").exists()) {
      descContains("立即观看").findOne().click();
      id("tt_video_ad_close_layout").waitFor();
      id("tt_video_ad_close_layout").findOne().click();
      sleep(2000);
    }
  } else {
    log("看视频任务已完成");
  }
  back();
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
    // 判断是否是直播
    log("其他状态", id("attention").exists());
    if (!id("attention").exists()) {
      swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
    }

    sleep(delayTime);
  }
  swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
  sleep(1000);
  // 判断是否是直播
  log("其他状态", id("attention").exists());
  if (!id("attention").exists()) {
    swipe(width / 2, height / 2 + 200, width / 2, 0, 700);
  }

  sleep(delayTime); //模仿人类随机时间
}

// 日期处理函数
function Format(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

function add(date, num) {
  date.setMinutes(date.getMinutes() + num);
  return date;
}
