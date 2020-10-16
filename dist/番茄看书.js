console.show();
const height = device.height;
const width = device.width;
setScreenMetrics(width, height);

handleStart();

function handleStart() {
  log("开始看书任务");
  const see_count = 3000;
  for (let index = 1; index < see_count; index++) {
    toast("滑动" + index + "次" + "总计:" + see_count + "次");
    swipe(width / 2 + 300, height / 2, 0, height / 2, 500);
    // log("当前是否存在广告", textContains("看视频免30分钟").exists());
    if (textContains("看视频免30分钟").exists()) {
      sleep(800);
      swipe(width / 2 + 300, height / 2, 0, height / 2, 500);
    }
    sleep(random(9000, 12000));
  }
}

// 立即观看视频任务
function handleTaskVideo() {
  let count = 0;
  while (textContains("立即观看").exists()) {
    log("进行观看视频任务");
    textContains("立即观看").findOne().click();
    id("tt_video_ad_close_layout").waitFor();
    // log(id("tt_video_ad_close_layout").findOne().click());
    id("tt_video_ad_close_layout").findOne().click();
    sleep(800);
    count = count + 1;
  }
  log("立即观看任务完成");
}
