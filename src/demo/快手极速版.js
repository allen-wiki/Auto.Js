/*
 * @Description: 快手极速版 1.0
 * @Author: Allen
 * @Date: 2020-09-14 09:04:54
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-21 15:07:35
 */

const height = device.height;
const width = device.width;
setScreenMetrics(width, height);
let see_count = 1000;
let count = 0;

console.show();

log("开始运行脚本");
log("准备打开快手极速版");
launchApp("快手极速版");

id("left_btn").waitFor();
log("快手极速版已打开");

handleWelfare();

//  福利任务
function handleWelfare() {
  // 进去任务 页面
  sleep(5000);
  id("left_btn").findOne().click();
  log("打开菜单");
  sleep(500);
  click("去赚钱");
  log("点击去赚钱");
  sleep(1500);

  log("是否存在福利", textContains("福利").exists());
  if (textContains("福利").exists()) {
    while (textContains("福利").exists()) {
      click("福利");
      sleep(18000);
      id("video_close_icon").waitFor();
      id("video_close_icon").findOne().click();
      sleep(1000);
    }
    sleep(1500);
  } else {
    log("福利已完成");
  }
  // 看直播
  liveVideos();
}

// 看直播领金币
function liveVideos() {
  sleep(1000);

  log("是否存在看直播", textContains("看直播").exists());
  if (textContains("看直播").exists()) {
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
    while (textContains("看直播").exists()) {
      if (count >= 11) break;
      sleep(1000);
      click("看直播");
      log("点击看直播");
      sleep(1500);
      for (let index = 1; index < 11; index++) {
        sleep(18000);
        swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
        log("进行第" + index + "个视频");
      }
      back();
      sleep(500);
      back();
      sleep(2000);
      count = 12;
    }
  } else {
    log("看直播已完成");
  }

  back();
  handleMoney();
}

function handleMoney() {
  for (var i = 1; i < see_count; i++) {
    log("滑动" + i + "次" + "总计:" + see_count + "次");
    randomUpSildeScreen();
    randomDownSildeScreen();
    slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);
  }
}

/**
 * 随机上滑（防止被判定是机器）上滑后停留时间至少是10S，造成假象表示是对内容感兴趣
 * 点赞和关注先不搞。
 */
function randomUpSildeScreen() {
  let randomIndex = random(1, 50);
  if (randomIndex == 1) {
    log("随机上滑");
    pressTime = random(200, 500);
    swipe(width / 2, 300, width / 2, height - 200, 700);
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
    log("连续下滑对上一个无兴趣");
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
    sleep(2000);
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
    delayTime = random(8000, 10000);
    sleep(delayTime);
  }
}

let status2 = 1;

/**
 * 屏幕向下滑动并延迟8至12秒
 */
function slideScreenDown(startX, startY, endX, endY, pressTime) {
  swipe(startX, startY, endX, endY, pressTime);
  sleep(1000);
  id("open_long_atlas").exists() ? (status2 = status2 + 1) : (status2 = 1);
  if (status2 === 2) {
    sleep(200);
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
  }

  if (textContains("点击打开长图").exists()) {
    sleep(200);
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
  }
  if (textContains("点击进入直播间").exists()) {
    sleep(200);
    swipe(width / 2, height / 2 + 300, width / 2, 0, 700);
  }

  let delayTime = random(8000, 12000);
  sleep(delayTime); //模仿人类随机时间
}
