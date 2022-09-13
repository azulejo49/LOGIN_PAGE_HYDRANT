/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/
import "./loading.css"

export default function Loading() {
    return (
        <div className="lds-wrapper">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            < h3 style={{ textAlign: "center", color:"var(--textActiveColor)" }}>טוען..</h3>
        </div>

    )
}
