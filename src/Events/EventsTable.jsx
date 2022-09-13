import Table from '../components/Table/Table'

import tableIcons from '../components/Table/MaterialTableIcons';
import TrigIcon from '../components/TrigIcon/TrigIcon'
import './eventsTable.css'
import { EVENTS_TITLES } from '../services/MyProvider'
import EventDetails from '../components/EventDetails/EventDetails'
import { useContext, useEffect } from 'react'
import { MyContext } from '../services/MyProvider'
import FatchDataApi from '../services/FatchDataApi';


function EventsTable({ eventsArr }) {

    const { accessToken, hydrantArr, setHydrantArr } = useContext(MyContext);

    useEffect(() => {
        if (accessToken && !hydrantArr)
            FatchDataApi('hydrants', 'GET', accessToken, setHydrantArr)

    }, [accessToken])


    const title = "אירועים";
    const eventsCols = {
        event_id: 'מספר אירוע',
        trigger_id: 'סוג',
        datetime_created: 'נפתח',
        datetime_updated: 'עודכן',
        value: 'כמות',
        hydrant_id: 'כתובת',
        status: 'סטטוס',
    };
    const options = {
        edit: false,
        lookup: {
            status: { 0: 'חדש', 1: 'בטיפול', 2: 'סגור' },
            trigger_id: { 1: EVENTS_TITLES.trig1, 2: EVENTS_TITLES.trig2, 3: EVENTS_TITLES.trig3, 5: EVENTS_TITLES.trig5, 6: EVENTS_TITLES.trig6, 7: EVENTS_TITLES.trig7 }
        },
        // initialEditValue: {},
        editOptions: {
            disableCols: ['event_id', 'datetime_created', 'datetime_updated', 'hydrant_id', 'alert_id']
        },
        render: {
            value: rowData => rowData.value_type ? rowData.value + '  ' + rowData.value_type : 'ללא',
            trigger_id: rowData =>
                <span className={`eventTrig${rowData.trigger_id}`}>
                    <TrigIcon white={true} style={{ zIndex: "5", right: "calc(var(--Icon-Bar-Offset) - 10px) ", position: "absolute" }} trigger={rowData.trigger_id} />
                    {options.lookup.trigger_id[rowData.trigger_id]}
                </span>,
            hydrant_id: rowData => {
                const hydrant = hydrantArr?.find(hydrant => hydrant.hydrant_id === rowData.hydrant_id)
                return ((hydrant) ? <p>{hydrant.street}&nbsp;{hydrant.number}, {hydrant.city}</p> : <p>-</p>)
            }
        }
    };


    return (
        <>

            <Table
                indexKey="event_id"
                title={title}
                columns={eventsCols}
                options={options}
                data={eventsArr.sort((a, b) => a.status - b.status)}
                onRowClick={(event, rowData, togglePanel) => { togglePanel() }}
                detailPanel={
                    [
                        (rowData) => ({
                            // disabled: rowData.status === 2,
                            icon: tableIcons.DetailPanel,
                            openIcon: tableIcons.OpenIcon,
                            tooltip: (rowData.status !== 2) ? 'טיפול באירוע' : 'פרטי טיפול',
                            render: () =>
                                <>
                                    <p className='HydantId'>{rowData.hydrant_id}</p>
                                    <EventDetails event={rowData} className={`TableHandleWrapper`} showInfo={false} disabledFocus={true}/>
                                </>
                        })
                    ]}
            />
            < div className='cover' ></div >
        </>
    )
}

export default EventsTable