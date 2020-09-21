const height = device.height;
const width = device.width;
setScreenMetrics(width, height);
// console.show();
sleep(2000);

swipe(width / 2, height - 200, width / 2, 0, 500);
toast("hudd");

sleep(3000);
swipe(width / 2, 300, width / 2, height, 800);
toast("hudd111");
