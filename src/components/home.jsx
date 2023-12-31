import {data} from "../assets/data"
import { useCallback, useState } from "react";
// import { Chart } from "./chart";
import '../App.css'
import {formJsonObj,formBinaryArray,dataForChart,getResult,modifyDate,getPatternData} from "../helpers/helper"
import{OPTION_FOR_CHART} from "../assets/contants"
import { DATA_1_MIN } from "../assets/1min";
import { DATA_2_MIN } from "../assets/2min";
import { DATA_3_MIN } from "../assets/3min";
import { DATA_5_MIN } from "../assets/5min";
import { DATA_10_MIN } from "../assets/10min";
import { DATA_15_MIN } from "../assets/15min";
import { DATA_30_MIN } from "../assets/30min";
import { DATA_30_MIN_BANK_NIFTY } from "../assets/30minBankNifty";
import { DATA_1_HR } from "../assets/1hr";
import { DAILY } from "../assets/daily";



const Home=()=>{
    const[decimal,setDecimal]=useState([]);
    const[count, setCount] = useState([]);
    const[time,setTime]=useState(DATA_1_MIN)
    const [date, setDate] = useState();
    const [notes,setNotes]=useState(JSON.parse(localStorage.getItem("notes")))
    const [boxTime, setBoxTime] = useState(0)
    const [patternData, setPattern] = useState([]);
    const [script,setScript]=useState("BANKNF")
    const handleChange = useCallback((value, tempTime = time) => {
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
            else    {
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
                value=script=="HDFC"? DATA_30_MIN: DATA_30_MIN_BANK_NIFTY
                break;
            case "1hr":
                value=DATA_1_HR
                break;
            default:
            
        }
        setTime(value)
        handleChange(date,value)
    }
  
    const displayTime = (boxTime) => {
        let d1 = new Date(date + " 9:15");
        let d2 = new Date(d1);
        d2.setMinutes(d1.getMinutes() + boxTime);
        return d2?.toLocaleString().slice(9)
        
    }
    const easyComp = () => (<h3><h3 className="easy-button" onClick={() => {
        
                    handleChange(modifyDate(date,-1))
                }}>{`<`}</h3><h3 onClick={() => {
                        
                    handleChange(modifyDate(date,1))
                }} className="easy-button">{ `>`}</h3></h3>)
    
    const handlePatterChange = (e) => {
        let result = getPatternData(time, e.target.value);
        setPattern(result)
        
    }
    return <>
        <input className="date-input" type="date" value={date} onChange={(e)=>handleChange(e.target.value)}/>
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
        <select className="select" onChange={(e) => {
            if (e.target.value == "HDFC")
            {
                setTime(DATA_30_MIN);
                setScript("HDFC");
                handleChange(date,DATA_30_MIN)
            }
            else {
                setTime(DATA_30_MIN_BANK_NIFTY)
                setScript("BANKNF");
                handleChange(date,DATA_30_MIN_BANK_NIFTY)
            }
        }}>
            <option value="HDFC">HDFC</option>
            <option value="BANKNF">BANK NIFTY</option>
        </select>
        <hr></hr>
        {decimal.length?<div>
            <div className="box">
                {decimal?.map((item, index) => {
                    return <div onMouseEnter={()=>{setBoxTime((375/decimal.length)*index)}}  className={[3, 5, 6, 7].includes(item) ? "box-green" : "box-red"} key={Math.random()}>{item}<span className="time"></span></div>
                })}
            </div>
            { <div>{`Time: ${displayTime(boxTime)} to ${displayTime(boxTime + (375 / decimal.length))}`}</div>}
            <br />
            <div style={{ display: "flex" }}><span style={{ border: "1px solid grey", padding: "10px" }}>{
                Object.entries(count)?.map((item) => {
                    return <li style={{ listStyle: "none" }} key={Math.random()}><span style={{ color: "red" }}>{item[0]}</span>{`=${item[1]}    `}</li>
                })}</span>
                <span>
                    <table className="table">
                    
                        <tr className="tr"><td className="td">Sum</td><td className="td">{decimal?.reduce((t, i) => t + i, 0)}</td></tr>
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
                <div className="pattern">
                    <div>
                   {easyComp()}
               
                  <span>Pattern : </span>  <input type="text" onChange={handlePatterChange} />
                    </div>
                    <div className="pattern-data">
                        {patternData.length && patternData.map((item,index) => {
                            return <div onClick={()=>handleChange(item.date)} className="pattern-item">{` ${index}  .  `}<span style={{ marginRight: "15px" }}>{item.date}</span><span style={{display:"flex"}}>{item.binary.map((i) => <span className={[0,1,2,4].includes(i)?"box-red":"box-green"}>{i}</span>)}</span></div>
               })}
                    </div>
                    </div>
                    <h4 style={{ marginBottom: "10px" }}>Notes:</h4>
                <textarea className="notes" value={notes} onChange={(e) => { localStorage.setItem("notes", JSON.stringify(e.target.value));setNotes(e.target.value) }}>

                </textarea>
            </div>
        </div> : <><h3>No Data Found</h3>
                <h3 style={{marginTop:"250px"}}>{easyComp()}</h3>
        </>}
    </> 
}

export default Home