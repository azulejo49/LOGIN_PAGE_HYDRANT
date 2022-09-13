import Table from '../components/Table/Table'
import FatchDataApi from '../services/FatchDataApi';
import MyNotification from '../services/MyNotification';
import { MTableEditField } from '@material-table/core';
import TrigIcon from '../components/TrigIcon/TrigIcon';


function ParameterTable({ data, accessToken, setData }) {


    const title = 'פרמטרים';
    const parameterCols = {
        name: 'פרמטר',
        value_type: 'יחידות מידה',
        min_value: 'ערך מינימלי',
        max_value: 'ערך מקסימלי',
        time_delta: 'חריגה בשעות',

    };
    const options = {
        edit: true,
        type: { time_delta: 'numeric', min_value: 'numeric', max_value: 'numeric' },
        editOptions: {
            update: (rowData) => updateParameter(rowData),
            disableCols: ['name', 'value_type'],
            customEditComponent: {
                time_delta: props =>
                    <MTableEditField {...props}
                        type="numeric"
                        value={Number(props.value.split(':')[0])}
                        onChange={e => props.onChange(`${e}:00:00`)}
                    />,
                min_value: (props) => ([5, 7].includes(props.rowData.trigger_id)) ? <MTableEditField {...props}/> : '-',
                max_value: (props) => ([1, 7].includes(props.rowData.trigger_id)) ? <MTableEditField {...props}/> : '-',
            }
        },
        render: {
            time_delta: (rowData) => Number(rowData.time_delta.split(':')[0]),
            min_value: (rowData) => ([5, 7].includes(rowData.trigger_id)) ? rowData.min_value : '-',
            max_value: (rowData) => ([1, 7].includes(rowData.trigger_id)) ? rowData.max_value : '-',
            name: rowData =>
                <span>
                    {rowData.name}
                    <TrigIcon white={false} style={{ zIndex: "5", right: "calc(var(--Icon-Bar-Offset) - 10px)", position: "absolute" }} trigger={rowData.trigger_id} />
                </span>

        }
    };

    function updateParameter(parameterData) {
        //Handles Updating parameter on Server
        function upateParameterCallback(data) {
            setData(oldData => oldData.map(parmeter => (parmeter.parameter_id === data.updatedParameter.parameter_id) ? data.updatedParameter : parmeter));
            MyNotification("light", "פרמטרים עודכנו", `פרמטר ${data.updatedParameter.name} עודכן`);
        }

        FatchDataApi(`parameters/update`, 'PUT', accessToken, upateParameterCallback, { payload: parameterData, errorMsgTitle: "שגיאה בעדכון פרמטרים" })
    }



    return (
        <Table
            indexKey="parameter_id"
            title={title}
            columns={parameterCols}
            options={options}
            data={data}
        />
    )
}

export default ParameterTable