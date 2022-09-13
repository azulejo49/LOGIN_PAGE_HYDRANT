import { useEffect, useContext, useState } from "react";
import { MyContext } from "../../services/MyProvider";
import FatchDataApi from '../../services/FatchDataApi';
import HandleHistoryRow from "./HandleHistoryRow/HandleHistoryRow";
import PropTypes from 'prop-types';
import './eventHistoryHandles.css';

export default function EventHistoryHandles({ event_id, invoke }) {

    const { accessToken } = useContext(MyContext);
    const [handlesHistory, setHandlesHistory] = useState();

    useEffect(() => {
        // clean up controller
        let isSubscribed = true;
        const loadHistoryResponse = (data) => {
            if (isSubscribed) setHandlesHistory(data.handlings);
        }
        accessToken && FatchDataApi(`history_handlings/${event_id}`, 'GET', accessToken, loadHistoryResponse);
        // remove callback subscription 
        return () => { isSubscribed = false }
    }, [event_id, invoke])

    const handleHistoryRow = handlesHistory?.map((handle, idx) =>
        <HandleHistoryRow handle={handle} key={idx} />
    )


    return (
        <div className="eventHistory">
            <h4>טיפולים לאירוע</h4>
            <div className="eventHistoryGridHeader">
                <h5>אופן&nbsp;טיפול</h5 >
                <h5>מבצע</h5 >
                <h5>סטטוס</h5 >
            </div>
            <hr style={{ margin: "0 1rem" }} />
            <div className="eventHistoryGridWraper">
                {handleHistoryRow}
            </div>
        </div>
    )
}

EventHistoryHandles.propTypes = {
    event_id: PropTypes.number,
    invoke: PropTypes.number
}
