/*
 * @Description: 刷宝自动化脚本
 * @Author: Allen
 * @Date: 2020-09-14 09:04:54
 * @LastEditors: Allen
<<<<<<< HEAD
 * @LastEditTime: 2020-10-13 10:55:01
=======
 * @LastEditTime: 2020-09-23 20:45:01
>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
 */

console.show();

const height = device.height;
const width = device.width;
setScreenMetrics(width, height);
let dateArr = [];
let count = 0;
let timeList = [];
let timeCount = 0;
for (let index = 1; index < 15; index++) {
  timeList.push(Format(add(new Date(), 15 * index), "hh:mm"));
}

log(timeList);

const see_count = 2000;
log("开始运行脚本");
log("准备打开刷宝短视频");
launchApp("刷宝短视频");
textContains("首页").waitFor();
log("刷宝短视频已打开");
sleep(1000);
// 看视频领元宝
layProgress();
sleep(1000);
handleTask();

function handleTask() {
  sleep(1000);
  click("任务");
  log("进入任务页面");
  sleep(2000);
  // 判断是否存在去邀请好友弹框;
  log(className("android.widget.ImageView").id("imgClose").exists());
  if (className("android.widget.ImageView").id("imgClose").exists()) {
    className("android.widget.ImageView").id("imgClose").findOne().click();
  }
  sleep(1000);
  descContains("继续赚元宝").waitFor();

  // 获取已观看次数
  log("获取已观看次数");
  const text = className("android.view.View").descContains("已观看").findOne().text();
  const number = Number(text.replace(/[^0-9]/gi, ""));
  log(number);
  if (number < 10) {
    log("创建去观看任务时间表");
    log(number);
    for (let index = 1; index <= 10 - number; index++) {
      dateArr.push(Format(add(new Date(), 6 * index), "hh:mm"));
    }
    log("创建完成", dateArr);
    sleep(1000);
  } else {
    log("观看任务已完成");
  }
  click("首页");
  handleStart();
}

function handleStart() {
  for (var i = 1; i < see_count; i++) {
<<<<<<< HEAD
    log(dateArr[count], timeList[timeCount]);
    if (!id("layProgress").exists()) {
      log("刷宝短视频未打开");
      launchApp("刷宝短视频");
      textContains("首页").waitFor();
      slideScreenDown();
=======
    log(dateArr[count], currentActivity());
    if (i > 5 && currentActivity() !== "com.jm.video.ui.main.MainActivity") {
      log("刷宝短视频未打开");
      launchApp("刷宝短视频");
      descContains("首页").waitFor();
      log("滑动" + i + "次" + "总计:" + see_count + "次");
      randomUpSildeScreen();
      randomDownSildeScreen();
      slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);

>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
    } else if (Format(new Date(), "hh:mm") == dateArr[count]) {
      log("进行第" + count + "次任务");
      handleTaskVideo();
    } else if (Format(new Date(), "hh:mm") == timeList[timeCount]) {
<<<<<<< HEAD
      sleep(1000);
      click("任务");
      log("点击任务");
      sleep(1000);
      // 判断是否存在去邀请好友弹框;
      log(className("android.widget.ImageView").id("imgClose").exists());
      if (className("android.widget.ImageView").id("imgClose").exists()) {
        className("android.widget.ImageView").id("imgClose").findOne().click();
      }

      descContains("继续赚元宝").waitFor();
      // 判断是否可以开箱领元宝
      if (descContains("开箱领元宝").exists()) {
        log("存在开箱领元宝任务");
        descContains("开箱领元宝").findOne().parent().click();
        log("进行开箱领元宝任务");
        // 不执行
        sleep(1000);
        const clickStatus = click("额外领取188元宝");
        if (!clickStatus) {
          click("额外领取88元宝");
        }
        id("tt_video_ad_close_layout").waitFor();
        id("tt_video_ad_close_layout").findOne().click();
        log("完成开箱领元宝");
        sleep(1000);
        className("android.view.View")
          .depth(4)
          .untilFind()
          .forEach((item) => {
            if (item.indexInParent() === 82 || item.indexInParent() === 79) {
              item.click();
            }
          });
      }

      timeCount = timeCount + 1;
      sleep(800);
      click("首页");
=======
      log("timeList", Format(new Date(), "hh:mm") == timeList[timeCount]);
      sleep(1000);
      click("任务");
      log("点击任务");
      descContains("继续赚元宝").waitFor();

      // 判断是否可以开箱领元宝
      log(descContains("开箱领元宝").exists());
      if (descContains("开箱领元宝").exists()) {
        log("存在开箱领元宝任务");
        log(descContains("开箱领元宝").findOne().parent());
        log("进行开箱领元宝任务");
        const ch2 = descContains("开箱领元宝").findOne();
        const btnStatus = click(ch2.bounds().centerX(), ch2.bounds().centerY());
        log("点击了开宝箱");
        log(btnStatus);

        // 不执行
        sleep(1000);
        log(descContains("额外领取188元宝").exists());
        log(descContains("额外领取88元宝").exists());

        if (!descContains("额外领取188元宝").exists()) {
          descContains("额外领取88元宝").findOne().click();
        } else {
          descContains("额外领取188元宝").findOne().click();
        }
        // log("等待关闭广告");
        id("tt_video_ad_close_layout").waitFor();
        id("tt_video_ad_close_layout").findOne().click(); 
        log("完成开箱领元宝");
        sleep(1000);

        log("关闭广告奖励弹框");
        className("android.view.View")
          .depth(14)
          .untilFind()
          .forEach((item) => {
            if (item.indexInParent() == 74) {
              if (item.clickable()) {
                item.click();
              }
            }
          });

        sleep(1000);
        click("首页");
      }
>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
    } else {
      log("滑动" + i + "次" + "总计:" + see_count + "次");
      slideScreenDown();
    }
  }
}

// 红包视频任务
function layProgress() {
  const layProgress = id("layProgress").findOne();
  log(layProgress.bounds().centerX(), layProgress.bounds().centerY());
  sleep(1000);
<<<<<<< HEAD
  const clickStatus = click(layProgress.bounds().centerX(), layProgress.bounds().centerY());
  descContains("看视频领元宝").waitFor();
=======
  click(layProgress.bounds().centerX(), layProgress.bounds().centerY());
  descContains("元宝流水").waitFor();
>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
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

function handleTaskVideo() {
  log("定时器" + count);
  status = true;
  if (count > 10) {
    return;
  }

  sleep(1000);
  click("任务");
  log("点击任务");
<<<<<<< HEAD
  sleep(1000);
  // 判断是否存在去邀请好友弹框;
  log(className("android.widget.ImageView").id("imgClose").exists());
  if (className("android.widget.ImageView").id("imgClose").exists()) {
    className("android.widget.ImageView").id("imgClose").findOne().click();
  }

=======
>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
  descContains("继续赚元宝").waitFor();
  log("去观看", descContains("去观看").exists());
  if (descContains("去观看").exists()) {
    log("点击去观看");
    descContains("去观看").findOne().click();
    // 判断广告结束是否出现关闭按钮 768 455
    id("tt_video_ad_close_layout").waitFor();
    id("tt_video_ad_close_layout").findOne().click();
    log("观看结束");

    className("android.view.View")
      .depth(4)
      .untilFind()
      .forEach((item) => {
        if (item.indexInParent() == 80) {
          if (item.clickable()) {
            item.click();
          }
        }
      });
  }
  sleep(1000);
<<<<<<< HEAD
  className("android.view.View")
    .depth(4)
    .untilFind()
    .forEach((item) => {
      if (item.indexInParent() === 75) {
        item.click();
        log("关闭领取奖励弹框");
      }
    });
=======
>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
  count = count + 1;
  sleep(1000);
  click("首页");
  log("回首页");
}

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
    slideScreenDown();
    log("下一个");
  }

<<<<<<< HEAD
=======
/**
 * 屏幕向下滑动并延迟8至12秒
 */
function slideScreenDown(startX, startY, endX, endY, pressTime) {
  swipe(startX, startY, endX, endY, pressTime);
  let delayTime = random(4000, 9000);
>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
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
