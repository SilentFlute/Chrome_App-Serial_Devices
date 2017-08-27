# Chrome_App-Serila_Devices
用Chrome App的形式实现与Arduino进行串口通信
- ***crx文件为chrome app目录下的文件打包之后所生成的文件***
- Chrome App是Chrome浏览器一种构建本地GUI程序的方法,使用HTML JS CSS来完成程序的界面和逻辑,Chrome App可以获得一些普通前端程序所不具备的模块权限,此次尝试串口通信
- 使用Chrome App的方式完成一个与串口通信相关的程序,控制Arduino实现串口的试验:每次在Chrome App里输入一个数字,就可以通过串口发送给Arduino,然后Arduino负责把这个数字+1后返回,并在Chrome App里显示
- 此程序中包含Arduino的程序文件

# 参考文献
[什么是 Chrome 应用?](https://crxdoc-zh.appspot.com/apps/about_apps) *Chrome App官方开发文档*

[chrome.serial](https://crxdoc-zh.appspot.com/apps/serial) *chrome.serial API*

# 执行应用
1. 启用标志
- 进入chrome://flags
- 找到“Experimental Extension APIs”，并单击“启用”
- 重启chrome浏览器

2. 加载应用
- 点击chrome右上角的设置按钮,选择"工具">"扩展程序"或者进入chrome://extensions/ 打开应用和扩展程序管理页面
- 确保开发者模式复选框已选中
- 单击"加载正在开发的扩展程序"按钮，浏览至您的应用文件夹并单击"确定"
- 如果需要打包成crx文件,请点击"打包扩展程序",点击"扩展程序根目录"右侧的"浏览"按钮,选择应用所在位置并点击"确定"

# 调试&开发工具
可以选择Chrome网上应用店里面的"Chrome Apps & Extensions Developer Tool"
