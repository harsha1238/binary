import {data} from "../assets/data"
import {useState} from "react";
import '../App.css'
import {formJsonObj,formBinaryArray} from "../helpers/helper"
import {JUL_31_29_AUG_1_MIN,JULY_30_MIN} from "../assets/raw"
const Home=()=>{
    const[decimal,setDecimal]=useState([]);
    const [count,setCount]=useState([])
const handleChange=(value)=>{
let temp =formJsonObj(JULY_30_MIN)
console.log(temp);

let data =formBinaryArray(temp,value)
console.log(data)
    let rawData= data;
  let arr = rawData[0]?.data
    let res=data?.map((item,index)=>{
        if(index%3==0)
        {
            return data?.slice(index,3+index)
        }
    }).filter((item)=>item).map((item,index)=>{
    return ((item[0]!==undefined?item[0]:0)*4)+((item[1]!==undefined?item[1]:0)*2)+((item[2]!==undefined?item[2]:0)*1)
    })
    setDecimal(res);
    let obj ={};
    let count=res.map((item,index)=>{
        if(!obj.hasOwnProperty(item))
        {
            obj[item]=1
        }
        else{
            obj[item]=obj[item]+1  
        }
    })
    setCount(obj)
}
    return<>
    <input type="date" onChange={(e)=>handleChange(e.target.value)}/>
    {` Count : `}<input type="text"/>
    <hr></hr>
    <div className="box">
        {decimal?.map((item,index)=>{
            return <div className={[3,5,6,7].includes(item)?"box-green":"box-red"} key={Math.random()}>{item}</div>
        })}
    </div>
    
    <div>{
    Object.entries(count)?.map((item)=>{
        return <span key={Math.random()}><span style={{color:"red"}}>{item[0]}</span>{`=${item[1]}    `}</span>
    })}</div>
    {decimal ? <span> Sum : {decimal?.reduce((t,i)=>t+i,0)}</span>:""}
    </> 
}

export default Home