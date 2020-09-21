/*
 * @Description: 刷宝自动化脚本
 * @Author: Allen
 * @Date: 2020-09-14 09:04:54
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-21 14:36:28
 */

console.show();

const height = device.height;
const width = device.width;
setScreenMetrics(width, height);
let dateArr = [];
let count = 0;
const see_count = 2000;
log("开始运行脚本");
log("准备打开刷宝短视频");
launchApp("刷宝短视频");
textContains("首页").waitFor();
log("刷宝短视频已打开");
sleep(1000);
handleTask();

// 检查是否签到
// handleSignIn();

/**
 * 签到
 */
function handleSignIn() {
  if (textContains("立即签到").exists()) {
    log("存在立即签到");
    textContains("立即签到").findOne().click();
    log("进行立即签到任务");
    textContains("看视频签到").waitFor();
    textContains("看视频签到").findOne().click();
    id("tt_video_ad_close_layout").waitFor();
    id("tt_video_ad_close_layout").findOne().click();
  }

  // 判断是否可以开箱领元宝
  if (textContains("开箱领元宝").exists()) {
    log("存在开箱领元宝任务");
    textContains("开箱领元宝").findOne().parent().click();
    log("进行开箱领元宝任务");
    textContains("额外领取88元宝").waitFor();
    textContains("额外领取88元宝").findOne().click();
    id("tt_video_ad_close_layout").waitFor();
    id("tt_video_ad_close_layout").findOne().click();
  }
  log("完成当前任务");
  sleep(1000);
  log("返回首页");
  click("首页");
}

function handleTask() {
  sleep(1000);
  click("任务");
  log("进入任务页面");
  sleep(2000);

  // 判断是否存在去邀请好友弹框
  className("android.widget.ImageView").id("imgClose").waitFor();
  className("android.widget.ImageView").id("imgClose").findOne().click();

  // 获取已观看次数
  log("获取已观看次数");
  const text = className("android.view.View").textContains("已观看").findOne().text();
  const number = Number(text.replace(/[^0-9]/gi, ""));
  log("创建去观看任务时间表");
  log(number);
  for (let index = 1; index <= 10 - number; index++) {
    dateArr.push(Format(add(new Date(), 6 * index), "hh:mm"));
  }
  log("创建完成", dateArr);
  sleep(1000);
  click("首页");
  handleStart();
}

function handleStart() {
  for (var i = 1; i < see_count; i++) {
    log(dateArr[count]);
    log(Format(new Date(), "hh:mm") == dateArr[count]);
    if (count > 11) {
      toast("滑动" + i + "次" + "总计:" + see_count + "次");
      randomUpSildeScreen();
      randomDownSildeScreen();
      slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);
    } else if (Format(new Date(), "hh:mm") == dateArr[count]) {
      console.log("进行第" + count + "次任务");
      handleTaskVideo();
    } else {
      toast("滑动" + i + "次" + "总计:" + see_count + "次");
      randomUpSildeScreen();
      randomDownSildeScreen();
      slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);
    }
  }
}

function handleTaskVideo() {
  log("定时器" + count);
  status = true;
  if (count > 10) {
    return void 0;
  }

  sleep(1000);
  click("任务");
  sleep(500);
  if (textContains("去观看").exists()) {
    click("去观看");
    // 判断广告结束是否出现关闭按钮 768 455
    while (status) {
      if (id("tt_video_ad_close").exists()) {
        sleep(200);
        id("tt_video_ad_close_layout").findOne().click();
        count = count + 1;
        status = false;
      } else {
        sleep(1000);
      }
    }
  } else {
    count = count + 1;
    status = false;
  }

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
  let delayTime = random(8000, 12000);
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
