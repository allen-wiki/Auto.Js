const height = device.height;
const width = device.width;

setScreenMetrics(width, height);

// 次数
const see_count = 1000;
let status = false;
let count = 0;
const dateArr = [];

// 初始化十个五分钟一次的时间数组
for (let index = 1; index < 11; index++) {
  dateArr.push(Format(add(new Date(), 6 * index), "hh:mm"));
}
handleStart();

function handleStart() {
  for (var i = 1; i < see_count; i++) {
    if (count > 11) {
      toast("滑动" + i + "次" + "总计:" + see_count + "次");
      randomUpSildeScreen();
      randomDownSildeScreen();
      slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);
    } else if (Format(new Date(), "hh:mm") == dateArr[count]) {
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
  toast("定时器" + count);
  status = true;
  if (count > 10) {
    clearInterval(time);
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

//关闭当前程序
home(); //回到首页
exits(); //退出js脚本

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

function moment() {
  return new Date();
}

function add(date, num) {
  date.setMinutes(date.getMinutes() + num);
  return date;
}

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
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
