import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../../services/MyProvider";


export default function NotFound() {

    const navigate = useNavigate();
    const {setIsLoading} = useContext(MyContext);

    useEffect(() => {
        setIsLoading(false)
    },[])

    return (
        <div className="canvas">
            <div style={{ margin: "5rem auto" }}>
                <h1 style={{textAlign:"center"}}>404</h1>
                <h4>אופס.. לא היית אמור להגיע לכאן</h4>
                <div className="btnContainer" style={{marginTop:"1rem"}}>
                    <button 
                    onClick={()=>{navigate(-1)}}
                    className="btn">חזור&nbsp;אחורה&nbsp;
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button 
                    onClick={()=>{navigate('/')}}
                    className="btn">לדף&nbsp;הראשי&nbsp;
                        <FontAwesomeIcon icon={faHomeUser} />
                    </button>
                </div>
            </div>
        </div>
    )
}
