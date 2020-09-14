console.show();
while (textContains("去进店").exists()) {
  textContains("去进店").findOne().click();
  sleep(5000);
  className("android.widget.FrameLayout")
    .depth(27)
    .untilFind()
    .forEach((child) => {
      const child1 = child.findOne(className("android.view.View").depth(28).desc("立即打开"));
      if (child1 !== null) {
        console.log("点击");
        child.click();
      }
    });

  // back()
  sleep(2000);
}
