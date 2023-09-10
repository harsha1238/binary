import {data} from "../assets/data"
import {useCallback, useState} from "react";
import '../App.css'
import {formJsonObj,formBinaryArray,removeDuplicates,getResult} from "../helpers/helper"
import { DATA_1_MIN } from "../assets/1min";
import { DATA_2_MIN } from "../assets/2min";
import { DATA_3_MIN } from "../assets/3min";
import { DATA_5_MIN } from "../assets/5min";
import { DATA_10_MIN } from "../assets/10min";
import { DATA_15_MIN } from "../assets/15min";
import { DATA_30_MIN } from "../assets/30min";
import { DATA_1_HR } from "../assets/1hr";
import { DAILY } from "../assets/daily";

const Home=()=>{
    const[decimal,setDecimal]=useState([]);
    const[count, setCount] = useState([]);
    const[time,setTime]=useState(DATA_1_MIN)
    const [date, setDate] = useState();
    const [notes,setNotes]=useState(JSON.parse(localStorage.getItem("notes")))
    
const handleChange=useCallback((value,tempTime=time)=>{
let temp =formJsonObj(tempTime);

setDate(value)
let data =formBinaryArray(temp,value)
console.log(data)
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
    },[time])
    const handleTime = (e) => {

        let value=""
        switch (e.target.value) {
            case "1min":
                value=DATA_1_MIN
                break;
            case "2min":
                value=DATA_2_MIN
                break;
            case "3min":
                value=DATA_3_MIN
                break;
            case "5min":
                value=DATA_5_MIN
                break;
            case "10min":
                value=DATA_10_MIN
                break;
            case "15min":
                value=DATA_15_MIN
                break;
            case "30min":
                value=DATA_30_MIN
                break;
            case "1hr":
                value=DATA_1_HR
                break;
            default:
            
        }
        setTime(value)
        handleChange(date,value)
    }
    return <>
    <input className="date-input" type="date" onChange={(e)=>handleChange(e.target.value)}/>
    <select className="select" onChange={(e)=>handleTime(e)}>
             <option value={"1min"}>1 MIN</option>
             <option value={"2min"}>2 MIN</option>
             <option value={"3min"}>3 MIN</option>
             <option value={"5min"}>5 MIN</option>
             <option value={"10min"}>10 MIN</option>
             <option value={"15min"}>15 MIN</option>
             <option value={"30min"}>30 MIN</option>
             <option value={"1hr"}>1 Hr</option>
   </select>
        <hr></hr>
        {decimal.length?<div>
            <div className="box">
                {decimal?.map((item, index) => {
                    return <div className={[3, 5, 6, 7].includes(item) ? "box-green" : "box-red"} key={Math.random()}>{item}</div>
                })}
            </div>
            <br />
            <div style={{ display: "flex" }}><span style={{ border: "1px solid grey", padding: "10px" }}>{
                Object.entries(count)?.map((item) => {
                    return <li style={{ listStyle: "none" }} key={Math.random()}><span style={{ color: "red" }}>{item[0]}</span>{`=${item[1]}    `}</li>
                })}</span>
                <span>
                    <table className="table">
                    
                        {/* <tr className="tr"><td className="td">Sum</td><td className="td">{decimal?.reduce((t, i) => t + i, 0)}</td></tr> */}
                        <tr className="tr">
                            <td className="td">Gain</td>
                            <td className="td">{(decimal?.reduce((t, i) => t + i, 0) / (decimal.length * 7) * 100).toString().slice(0, 4)}%</td>
                        </tr>
                        <tr className="tr"><td className="td">Result</td><td className={getResult(date) > 0 ? "td-green" : "td-red"}>{getResult(date)?.toString()?.slice(0, 4)}%</td></tr>
                    </table>
                </span>
            </div>
            <br />
            <div>
                <h4 style={{marginBottom:"10px"}}>Notes:</h4>
                <textarea className="notes" value={notes} onChange={(e) => { localStorage.setItem("notes", JSON.stringify(e.target.value));setNotes(e.target.value) }}>

                </textarea>
            </div>
        </div>:<h3>No Data Found</h3>}
    </> 
}

export default Home