export const formJsonObj=(rawData)=>{

    return rawData.candles.map((item,index)=>{
        let binary =index!=0 && ((rawData.candles[index][4]-rawData.candles[index-1][4])*100/(rawData.candles[index-1][4]))>0?1:0;

        let obj={
        date:item[0],
        open:item[1],
        high:item[2],
        low:item[3],
        close:item[4],
        volume:item[5],
        closePer:rawData.candles[index-1]?(rawData.candles[index-1][4]-rawData.candles[index][4])*100/(rawData.candles[index-1][4]):0,
        binary:binary
        };
        
        return obj
        })
}

export const formBinaryArray=(jsonData,date)=>{
    let arr =[]
    jsonData.map((data,index)=>{
        if(data.date.includes(date))
        {
            return arr.push(data.binary)
        }
    })
    return arr;
}