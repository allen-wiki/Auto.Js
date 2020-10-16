<<<<<<< HEAD
const height = device.height;
const width = device.width;
setScreenMetrics(width, height);

for (let index = 1; index < 800; index++) {
  randomUpSildeScreen();
  randomDownSildeScreen();
  slideScreenDown(width / 2, height / 2 + 300, width / 2, 0, 700);
  toast("进行第" + index + "次");
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
=======
const height = device.height;
const width = device.width;
setScreenMetrics(width, height);
const see_count = 1000;
for (var i = 1; i < see_count; i++) {
  toast("滑动" + i + "次" + "总计:" + see_count + "次");
  randomUpSildeScreen();
  randomDownSildeScreen();
  slideScreenDown(width / 2, height - 200, width / 2, 0, 700);
}

/**
 * 随机上滑（防止被判定是机器）上滑后停留时间至少是10S，造成假象表示是对内容感兴趣
 * 点赞和关注先不搞。
 */
function randomUpSildeScreen() {
  let randomIndex = random(1, 50);
  if (randomIndex == 1) {
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
    swipe(width / 2, height - 200, width / 2, 0, 700);
    sleep(2000);
    swipe(width / 2, height - 200, width / 2, 0, 700);
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
>>>>>>> 225f575444ed0300789423101672eab8efeb2bc4
