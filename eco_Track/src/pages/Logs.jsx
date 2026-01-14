import {logs} from "../data/logs.js"

const Logs = () => {

    const highCarbon = logs.filter(log => log.carbon >= 4);
    const lowCarbon = logs.filter(log => log.carbon < 4 && log.carbon != 0);
    return (
        <div>
            <h1 style={{color: "#e0c32f"}}>High Carbon activity</h1>
            <ul style={{color : "#ff0000"
}}>
                {highCarbon.map(log => (
                    <li> key = {(log.id)}
                        {log.activity} = {log.carbon} Kg
                    </li>
                ))}
            </ul>
            <hr />
            <h1 style={{color: "#e4c527"}}>Low Carbon activity</h1>
            <ul style={{color: "#2e7d32"}}>
                {lowCarbon.map(log => (
                    <li> key = {(log.id)}
                        {log.activity} = {log.carbon} Kg
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Logs
