import { useContext } from 'react'
import Table from '../components/Table/Table'
import MyNotification from '../services/MyNotification'
import { MyContext } from '../services/MyProvider'
import FatchDataApi from '../services/FatchDataApi';
import EditAddressComp from './EditAddressComp'
import UploadFile from '../components/buttons/UploadFile';
import { MTableEditField } from "@material-table/core";

function HydrantsTable({ handleAddHydrant }) {

    const { hydrantArr, setHydrantArr, accessToken } = useContext(MyContext);


    const title = 'ברזי כיבוי אש';
    const hydrantCols = {
        // hydrant_id: 'מזהה ברז כיבוי',
        phone: 'מספר פלאפון',
        sim: 'מספר סים',
        status: 'סטטוס',
        date_installed: 'תאריך התקנה',
        city: 'עיר',
        street: 'רחוב',
        number: 'מספר',
        lat: 'קו רוחב',
        lng: 'קו אורך',
        //  picture_url: 'תמונה'
    };
    const options = {
        edit: true,
        lookup: { status: { 1: 'פעיל', 0: 'לא פעיל' } },
        initialEditValue: { status: 0 },
        editOptions: {
            delete: handleDelete, update: handleUpdate, add: handleAdd,
            disableCols: ['hydrant_id', 'date_installed', 'status'],
            editableOnUpdate: ['status'],
            // customEditCols: ['city', 'street', 'number', 'lat', 'lng'],
            // customCancelComponent: (e) => { console.log(e) },
            customEditComponent: { city: EditAddressComp, street: EditAddressComp, number: EditAddressComp, lat: EditAddressComp, lng: EditAddressComp, status: (props) => <MTableEditField {...props} disabled={!props.rowData.status} /> },

        },
        render: { phone: rowData => <>{rowData.phone} <p className="HydantId">{rowData.hydrant_id} </p> </> },
        type: {}
    };

    function handleAdd(newData) {

        if ((newData.status === 0 || newData.phone) && (newData.sim && newData.city && newData.street && newData.number && newData.lat && newData.lng)) {
            handleAddHydrant({ phone: newData.phone, sim: newData.sim, status: newData.status, city: newData.city, street: newData.street, number: newData.number, lat: newData.lat, lng: newData.lng, picture_url: newData.picture_url });
            return true
        }
        else {
            MyNotification("darkblue", 'שגיאה', 'חובה למלא את כל השדות');
            return false
        }
    }

    function handleUpdate(newData) {

        function updateHydrant(response) {
            setHydrantArr([...hydrantArr.map(hydrant => (hydrant.hydrant_id !== response.updatedHydrant.hydrant_id) ? hydrant : response.updatedHydrant)]);
            MyNotification('light', "עדכון ברז כיבוי אש", `ברז כיבוי אש ${response.updatedHydrant.hydrant_id} עודכן בהצלחה`);
        }
        if ((newData.status === 0 || newData.phone) && (newData.sim && newData.city && newData.street && newData.number && newData.lat && newData.lng)) {
            FatchDataApi('hydrants/update', 'PUT', accessToken, updateHydrant, { payload: newData, errorMsgTitle: "שגיאה בעדכון ברז כיבוי אש", onReject: () => { setHydrantArr([...hydrantArr]) } });
            return true
        } else {
            MyNotification("darkblue", 'שגיאה', 'חובה למלא את כל השדות');
            return false
        }
    }

    function handleDelete(oldData) {
        function deleteHydrant(responseHydrant) {
            const tempData = hydrantArr.filter(hydrant => hydrant.hydrant_id !== responseHydrant.deletedHydrant.hydrant_id)
            setHydrantArr(tempData);
            MyNotification('light', 'מחיקת ברז כיבוי אש', `ברז כיבוי ${responseHydrant.deletedHydrant.hydrant_id} נמחק בהצלחה`);
        }
        FatchDataApi('hydrants/delete', 'DELETE', accessToken, deleteHydrant, { payload: { "hydrant_id": oldData.hydrant_id }, errorMsgTitle: "שגיאה במחיקת ברז כיבוי אש", onReject: () => { setHydrantArr([...hydrantArr]) } });
    }

    function handleSendCSV(resposne) {
        const newHydrants = resposne.response_list.filter((item) => item.newHydrant).map((item) => item.newHydrant)
        const failed = resposne.response_list.filter((item) => item.hydrant)
        setHydrantArr(prev => [...newHydrants, ...prev])
        if (newHydrants.length > 0)
            if (newHydrants.length === 1)
                MyNotification("light", 'הוספת ברזי כיבוי אש מקובץ', `ברז כיבוי אש ${newHydrants[0].hydrant_id} נוסף בהצלחה`);
            else
                MyNotification("light", 'הוספת ברזי כיבוי אש מקובץ', `נוספו ${newHydrants.length} ברזי כיבוי אש`);

        if (failed.length > 0) {
            MyNotification("darkblue", 'בעיה בהוספת ברזי כיבוי אש מקובץ', failed.map((item, idx) => <div>{item.msg}<br />ברז כיבוי אש:{item.hydrant.hydrant_id}<br /></div>));

        }




    }




    return (
        <Table
            indexKey="hydrant_id"
            title={title}
            columns={hydrantCols}
            options={options}
            data={hydrantArr}
            actions={[
                {
                    // icon: () => UploadFile({ target: 'hydrants/UploadCsv', callback: handleSendCSV, successCodes: [201, 207] }),
                    icon: () => <UploadFile target={'hydrants/UploadCsv'} callback={handleSendCSV} successCodes={[201, 207]} />,
                    tooltip: 'העלת קובץ אקסל',
                    isFreeAction: true,

                }
            ]}
        />
    )
}

export default HydrantsTable