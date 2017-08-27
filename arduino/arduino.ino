String comdata = "";
int num;
void setup() 
{ 
  Serial.begin(9600); //设置波特率为9600，一般是这个波特率
} 
void loop()
{
    while (Serial.available()>0)//如果串口有数据进入的话
    //Serial.available()是当前串口缓冲池的数据量
    {
        comdata += char(Serial.read());
        //Serial.read()是读缓冲池(串口数据)的语句,每次只能读一个字节,是ASCII码的
        delay(2);
        //delay(2)不能删掉，否则串口缓冲区不够时间接受数据
    }
    if (comdata.length() > 0)
    {
        num=comdata.toInt();
        Serial.print(++num);//输出接收到的数据到串口
        Serial.print("\n");
        comdata = "";
    }
}
