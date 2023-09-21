import { DAILY } from "../assets/daily";

export const formJsonObj=(rawData)=>{
let sortedData= sortByDate(rawData.candles)
    return sortedData.map((item,index)=>{
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
            result.push([new Date(item[0],item[3],item[1],item[4],item[2])])
            }
    })
    return result;
}

export const sortByDate = (date) => {

    let result = date.sort((a, b) => {

        return new Date(a.date)-new Date(b.date)
    })
    console.log(result)
    return result;
}

export const modifyDate = (date, value) => {
    let temp = new Date(date);
    temp.setDate(temp.getDate() + value);
    return  temp.toISOString().slice(0,10)

}

export const getPatternData = (tempTime,regexText) => {
    let temp = formJsonObj(tempTime);
    let tempData=[]
     temp.map((item,
        index) => {
        if (!tempData.includes(item.date.slice(0,10)))
        {
            tempData.push( item.date.slice(0,10));
            }
        })
    let resultArr = [];
    tempData.map((item, index) => {
        let data =formBinaryArray(temp,item)   
       resultArr.push({binary :data?.map((item,index)=>{
            if(index%3==0)
        {
            return data?.slice(index,3+index)
        }
            }).filter((item)=>item).map((item,index)=>{
                return ((item[0]!==undefined?item[0]:0)*4)+((item[1]!==undefined?item[1]:0)*2)+((item[2]!==undefined?item[2]:0)*1)
            }),date:item})
        
    })
    let regex = new RegExp("^"+regexText)
    let finalResult = resultArr.map((item) => {
        if (regex.test(item.binary.join(""))) {
            return item
        }
        
    
    }).filter((item)=>item);
   return finalResult
        
       
    
       
    
}