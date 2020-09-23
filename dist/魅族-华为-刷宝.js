/*
 * @Description: 刷宝自动化脚本
 * @Author: Allen
 * @Date: 2020-09-14 09:04:54
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-23 16:39:49
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
  textContains("继续赚元宝").waitFor();

  // 获取已观看次数
  log("获取已观看次数");
  const text = className("android.view.View").textContains("已观看").findOne().text();
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
    log(dateArr[count], currentActivity());
    if (i > 5 && currentActivity() !== "com.jm.video.ui.main.MainActivity") {
      log("刷宝短视频未打开");
      launchApp("刷宝短视频");
      textContains("首页").waitFor();
    } else if (Format(new Date(), "hh:mm") == dateArr[count]) {
      log("进行第" + count + "次任务");
      handleTaskVideo();
    } else if (Format(new Date(), "hh:mm") == timeList[timeCount]) {
      sleep(1000);
      click("任务");
      log("点击任务");
      textContains("继续赚元宝").waitFor();
      // 判断是否可以开箱领元宝
      if (textContains("开箱领元宝").exists()) {
        log("存在开箱领元宝任务");
        textContains("开箱领元宝").findOne().parent().click();
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
          .depth(7)
          .untilFind()
          .forEach((item) => {
            if (item.indexInParent() === 0) {
              if (item.clickable()) {
                item.click();
              }
            }
          });

        sleep(1000);
        click("首页");
      }
    } else {
      log("滑动" + i + "次" + "总计:" + see_count + "次");
      randomUpSildeScreen();
      randomDownSildeScreen();
      slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);

      // 判断是否是直播
      log("其他状态", className("android.widget.TextView").id("comment").exists());
      if (!className("android.widget.TextView").id("comment").exists()) {
        slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);
      }
    }
  }
}

// 红包视频任务
function layProgress() {
  const layProgress = id("layProgress").findOne();
  log(layProgress.bounds().centerX(), layProgress.bounds().centerY());
  sleep(1000);
  const clickStatus = click(layProgress.bounds().centerX(), layProgress.bounds().centerY());
  textContains("元宝流水").waitFor();
  log("是否存在立即观看", textContains("立即观看").exists());
  if (textContains("立即观看").exists()) {
    while (textContains("立即观看").exists()) {
      textContains("立即观看").findOne().click();
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
  textContains("继续赚元宝").waitFor();
  log("去观看", textContains("去观看").exists());
  if (textContains("去观看").exists()) {
    log("点击去观看");
    textContains("去观看").findOne().click();
    // 判断广告结束是否出现关闭按钮 768 455
    id("tt_video_ad_close_layout").waitFor();
    id("tt_video_ad_close_layout").findOne().click();
    log("观看结束");
  }
  sleep(1000);

  // 判断是否可以开箱领元宝
  if (textContains("开箱领元宝").exists()) {
    log("存在开箱领元宝任务");
    textContains("开箱领元宝").findOne().parent().click();
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
  count = count + 1;

  sleep(1000);
  click("首页");
}

/**
 * 随机上滑（防止被判定是机器）上滑后停留时间至少是10S，造成假象表示是对内容感兴趣
 * 点赞和关注先不搞。
 */
function randomUpSildeScreen() {
  let randomIndex = random(1, 50);
  if (randomIndex == 1) {
    pressTime = random(200, 500);
    swipe(width / 2, 500, width / 2, height - 200, 300);
    delayTime = random(10000, 15000);
    sleep(delayTime);
  }
}

/**
 * 连续下滑对上一个无兴趣
 * 其实得和上滑做个排他，既然无兴趣不要在上滑
 */
function randomDownSildeScreen() {
  let randomIndex = random(1, 50);
  if (randomIndex == 1) {
    swipe(width / 2, height - 200, width / 2, 500, 300);
    sleep(2000);
    swipe(width / 2, height - 200, width / 2, 500, 300);
    delayTime = random(8000, 10000);
    sleep(delayTime);
  }
}

/**
 * 屏幕向下滑动并延迟8至12秒
 */
function slideScreenDown(startX, startY, endX, endY, pressTime) {
  swipe(startX, startY, endX, endY, pressTime);
  let delayTime = random(4000, 9000);
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
