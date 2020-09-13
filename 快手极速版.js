const height = device.height;
const width = device.width;
setScreenMetrics(width, height);
let see_count = 1000;
let count = 11;

toast("启动");

// console.show();

handleWelfare();

// hanldeMoney();

//  福利任务
function handleWelfare() {
  // 进去任务 页面
  sleep(1000);
  id("left_btn").findOne().click();
  sleep(500);
  click("去赚钱");
  sleep(500);
  sleep(1000);
  while (textContains("福利").exists()) {
    click("福利");
    sleep(18000);
    id("video_close_icon").waitFor();
    id("video_close_icon").findOne().click();
    sleep(1000);
  }

  liveVideos();
}

// 看直播领金币
function liveVideos() {
  sleep(1000);
  while (textContains("看直播").exists()) {
    if (count >= 11) break;
    sleep(1000);
    click("看直播");
    sleep(18000);
    back();
    sleep(500);
    back();
    sleep(2000);
    count = count + 1; 
  }

  back();
  hanldeMoney();
}

function hanldeMoney() {
  for (var i = 1; i < see_count; i++) {
    toast("滑动" + i + "次" + "总计:" + see_count + "次");
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
    swipe(width / 2, height - 400, width / 2, 500, 300);
    sleep(2000);
    swipe(width / 2, height - 400, width / 2, 500, 300);
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
