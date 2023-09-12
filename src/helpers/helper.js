import { DAILY } from "../assets/daily";

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

export const getResult = (date) => {
    let result =0
    DAILY.candles.sort().map((item,index) => {
        if (item[0]?.includes(date))
        {
            result = ((item[4])-(DAILY.candles[index-1]?.[4]))/(DAILY.candles[index-1]?.[4])
        }
    })
    return result * 100;
}
export const removeDuplicates=(data)=>{
    let tempArr=[];
    let dataArray=[]
    data.map((item)=>{
        if(!tempArr.includes(item.date))
        {
            tempArr.push(item.date);
            dataArray.push(item)
        }
    })

    return dataArray
}

export const dataForChart = (arr, date) => {
    let result =[]
    arr.candles.map((item, index) => {
        if (item[0]?.includes(date))
        {
            result.push({x: new Date(item[0]),
            y: [...item.slice(1,5)]})
            }
    })
    return result;
}