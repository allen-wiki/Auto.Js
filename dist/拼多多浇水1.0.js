/*
 * @Description: 拼多多浇水
 * @Author: Allen
 * @Date: 2020-09-16 16:57:39
 * @LastEditors: Allen
 * @LastEditTime: 2020-09-17 14:25:23
 */

console.show();
sleep(1000);
let count = 0;
const count2 = 100000;
let centerX = 0;
let centerY = 0;

log("正在获取运行参数!");
handleGetCount();
log("开始执行浇水任务!");

var thread = threads.start(function () {
  //在子线程执行的定时器
  setInterval(function () {
    handleGetCount();
  }, 2000);
});

//等待子线程启动
thread.waitFor();

for (let index = 1; index <= count2; index++) {
  if (count >= 1) {
    click(centerX, centerY);
  } else {
    log("任务结束");
    thread.interrupt();
    exit();
    break;
  }
}

function handleGetCount() {
  className("android.view.View")
    .depth(16)
    .untilFind()
    .forEach((element) => {
      const text = element.text();
      const indexInParent = element.indexInParent();
      if (text !== "" && text !== null && indexInParent == 2) {
        if (text.indexOf("g") !== -1) {
          count = parseInt(Number(text.replace(/[^0-9]/gi, "")) / 10);
          log(count);
          centerX = element.bounds().centerX();
          centerY = element.bounds().centerY() - 40;
          log("获取到运行参数", "总次数" + count, "坐标" + centerX + "," + centerX);
        }
      }
    });
}
