import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { MyContext } from '../../../services/MyProvider';
import FatchDataApi from '../../../services/FatchDataApi';

export default function HandleHistoryRow({ handle }) {

    const { handleTypes, handleUsers, setHandleTypes, setHandleUsers, accessToken } = useContext(MyContext);
    const handler = handleUsers?.find(user => user.user_id === handle?.handler_id)
    const user = handleUsers?.find(user => user.user_id === handle?.user_id)
    const handleType = handleTypes?.find(type => type.type_id === handle?.handling_type_id)

    useEffect(() => {
        if (accessToken) {
            if (!handleTypes) FatchDataApi('handling_types', 'GET', accessToken, setHandleTypes)
            if (!handleUsers) FatchDataApi('handling_users', 'GET', accessToken, setHandleUsers)
        }
    }, [])

    return (

        <label title="פרטים נוספים" htmlFor={`handle_${handle?.handle_id}`}>
            {/* checkbox for Hide /Show User Details */}
            <input
                type='checkbox'
                style={{ 'display': 'none' }}
                className='showInfo'
                id={`handle_${handle?.handle_id}`} />
            <div className="HandleHistoryRow">
                <p>{(handleType)? handleType.name : "סגירה ידנית"}</p>
                {(handle?.authoriser)? <p>{user?.first_name} {user?.last_name}</p> :<p>{handler?.first_name} {handler?.last_name}</p>}
                <p>{(handle?.status) ? "בוצע" : "חדש"}</p>
                <div className='handleInfoBox'>
                    <div className='handleInfoBoxGrid'>
                        <p>תאריך&nbsp;עדכון:</p>
                        <p>{handle?.datetime_updated}</p>
                        {handle?.authoriser &&
                            <>
                                <p>גורם מורשה:</p>
                                <p>{handle?.authoriser}</p>
                            </>
                        }
                        <p>משתמש&nbsp;מפנה:</p>
                        <p>{user?.first_name} {user?.last_name}</p>
                        <p>הערות&nbsp;לטיפול:</p>
                        <p>{handle?.comment}</p>
                    </div>
                </div>
            </div>

        </label>

    )
}

HandleHistoryRow.propTypes = {
    handle: PropTypes.object
};
