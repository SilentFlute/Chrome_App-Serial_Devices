var serial=chrome.serial;
var dropDown =document.querySelector("#port_list");
var conBtn=document.querySelector("#connect_button");
var input_Box=document.querySelector("#input_box");
var buffer_Box =document.querySelector("#buffer_box");
var out_Btn=document.querySelector("#out_btn");
var refre_Btn=document.querySelector("#refresh_button");
var res=document.querySelector("#res");
var res_Val=document.querySelector("#res_val");




//获得可用端口的列表
var onGetDevices=function(ports){
    //当没有串口设备,检测不到端口的时候
    if(ports.length===0){
        log("未检测到可用端口,请检查串口设备是否连接");
        return;
    }
    
    //清除当前选项
    dropDown.innerHTML = "";
    //添加可用端口
    ports.forEach(function(port){
        var displayName = port.displayName+"("+port.path+")";
        if (!displayName) displayName = port.path;
        
        var newOption = document.createElement("option");
        newOption.text = displayName;
        newOption.value = port.path;
        dropDown.appendChild(newOption);
    });
};
serial.getDevices(onGetDevices);

//点击刷新按钮的时候刷新端口列表
refre_Btn.onclick=function(){
    serial.getDevices(onGetDevices);
};

//输出函数
function log(msg) {
    buffer_Box.innerHTML=msg;
}

//连接按钮
conBtn.addEventListener("click",function(){
    
        //得到下拉菜单中选中的端口
        var devicePath = dropDown.selectedOptions[0].value;
    
        //连接
        serial.connect(devicePath,function(connectionInfo){
            if (!connectionInfo) {
                log("连接失败,请重试!");
                serial.getDevices(onGetDevices);
            } else {
                log("连接成功,连接到了" + devicePath);
                input_Box.style.display = "block";
    
                var connectionId = connectionInfo.connectionId;
                
                //清除缓存
                // serial.flush(connectionId,function(result){
                //     console.log(result);
                // });
    
                //向串行端口发送数据
                out_Btn.addEventListener("click",function () {
                    
                    //清除缓存
                    // serial.flush(connectionId,function(result){
                    //     console.log(result);
                    // });
                    
                    var input_Num = document.querySelector("#input_num");
                    var str = input_Num.value;
                    //将字符串转换为 ArrayBuffer
                    var convertStringToArrayBuffer = function (str) {
                        //输入123
                        var buf = new ArrayBuffer(str.length);
                        //buf是个对象,有一个byteLength属性,值和str.length一样
                        //ArrayBuffer{"byteLength":3}
                        var bufView = new Uint8Array(buf);
                        //bufView也是一个对象,key和byteLength一样,是长度,比如0,1,2
                        //value是字符的Unicode
                        //Uint8Array{"0":49,"1":50,"2":51}
                        for (var i = 0; i < str.length; i++) {
                            bufView[i] = str.charCodeAt(i);
                            //字符串每一位的Unicode赋值给bufView[i]
                            //bufView[i] 49 50 51
                        }
                        return buf;
                    };
                    serial.send(connectionId, convertStringToArrayBuffer(str), function (sendInfo) {
                        if (sendInfo.error) {
                            log("发送失败,请重试!");
                        } else {
                            log("发送成功,发送了" + sendInfo.bytesSent + "字节的数据");
                            res.style.display = "block";
                        }
                    });
                });
                
                
                //读取串口数据
                var stringReceived = '';
    
                //转换函数
                function convertArrayBufferToString(buf) {
                    //将串口接收到的buffer数据转化成字符串
                    var bufView = new Uint8Array(buf);
                    var encodedString = String.fromCharCode.apply(null, bufView);
                    return encodedString;
                }
                var onReceiveCallback = function(info) {
                    var str = convertArrayBufferToString(info.data);
                    if (str.charAt(str.length-1) === '\n') {
                        stringReceived += str.substring(0, str.length-1);
                        res_Val.innerHTML=stringReceived;
                        stringReceived = '';
                    } else {
                        stringReceived += str;
                        res_Val.innerHTML=stringReceived;
                    }
                };
                serial.onReceive.addListener(onReceiveCallback)
            }
        });
});




