var height = device.height;
var width = device.width;
setScreenMetrics(width, height);
console.show();
while (textContains("去进店").exists()) {
  textContains("去进店").findOne().click();
  sleep(5000);

  for (let index = 1; index < 20; index++) {
    swipe(width / 2, height - 200, width / 2, 0, 500);
    className("android.widget.FrameLayout")
      .depth(27)
      .untilFind()
      .forEach((child) => {
        const child1 = child.findOne(className("android.view.View").depth(28).desc("立即打开"));
        if (child1 !== null) {
          console.log("点击");
          child.click();
          break;
        }
      });

    sleep(1000);
  }

  console.log("完成");

  // back()
  sleep(2000);
}
