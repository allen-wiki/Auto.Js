//56724

const height = device.height;
const width = device.width;

// 执行我的里面的去赚钱
// handleMyTask();

handleWatchVideo();

// 观看视频
function handleWatchVideo() {
  for (let index = 1; index <= 1000; index++) {
    toast("观看第" + index);
    let delayTime = random(8000, 12000);         
    sleep(delayTime); //模仿人类随机时间
    index++;
    swipe(width / 2, height - 200, width / 2, 0, 700);
  }
}

function handleMyTask() {
  launchApp("京东极速版");
  sleep(2000);
  click(width - 40, height - 40);
  sleep(1000);
  while (textContains("去赚钱").exists()) {
    toast("存在" + "去赚钱");
    textContains("去赚钱").findOne().click();
    sleep(1000);
    for (let index = 1; index <= 5; index++) {
      swipe(width / 2, height - 200, width / 2, 0, 500);
      sleep(2000);
    }
    sleep(1000);
    back();
    sleep(2000);
  }
  toast("完成任务");
}
