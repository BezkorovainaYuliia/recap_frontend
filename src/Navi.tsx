import {Link} from "react-router-dom";

export default function Navi(){
    return (
        <>
            <Link to={"/"}>Home</Link><br/>
            <Link to={"/open"}>Open</Link><br/>
            <Link to={"/in_progress"}>In Progress</Link><br/>
            <Link to={"/Done"}>Done</Link>
        </>
    )
}