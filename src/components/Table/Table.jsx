import { useState, useEffect, createRef } from 'react'
// import PropTypes from 'prop-types'
import MaterialTable from "@material-table/core";
import { ExportCsv } from '@material-table/exporters'
import tableIcons from "./MaterialTableIcons";
import './table.css'


// the props to pass to the component are the following: 
// 1. title - string - name of the page and the table, also used as file name when exporting.
// 2. data - an array of objects that contain the data to display.
// 3. columns -an object with key-value pairs, where the key is the key of the value to be displayed from the data prop
//    and the value is the displayed name of the column.
// 4. options - an object containing key-value pairs where the key is the name of the option, and the value is a boolean.
//    available options:
//                      edit - false by default. set to true if required
//                      lookup - when the column value is a lookup of the value to be displayed, pass the column key as key, and the lookup as an object with key-value pairs.
//                      editOptions - an object containing the callback functions that manipulate data. the keis are: "add", "edit", "delete".
//                      disableColumns - an array of column keys that will not be able to be added or edited
//                      initialEditValue - Initial value on add new row
//                      render - Render a custom node for cell. Parameter is rowData and return value must be ReactElement
//                      type - Data type: 'boolean', 'numeric', 'date', 'datetime', 'time', 'currency'
//                      cellStyle -Cell cellStyle
//                      headerStyle -Header cell style for all headers




function Table({ title, data, columns, options, indexKey, isLoading = true, onRowClick, detailPanel, actions = [] }) {

    const tableRef = createRef(null)

    const [displayColumns, setDisplayColumns] = useState([]);
    const [pageSizeOptions, setPageSizeOptions] = useState([data?.length, 15, 50, 100].sort((a, b) => a - b))
    const [loading, setloading] = useState(isLoading)
    const editable = {};
    if (options.editOptions.add)
        editable.onRowAdd = (newData) => {
            setloading(true)
            return new Promise((resolve, reject) => {
                if (options.editOptions.add(newData)) {
                    resolve();
                } else {
                    reject();
                    setloading(false);

                }
                // setloading(false)
            });
        }
    if (options.editOptions.update)
        editable.onRowUpdate = (newData) => {
            setloading(true)
            return new Promise((resolve, reject) => {
                if (options.editOptions.update(newData)) {
                    resolve();
                }
                else {
                    reject();
                    setloading(false);
                }
            });
        }
    if (options.editOptions.delete)

        editable.onRowDelete = (oldData) => {
            setloading(true)
            return new Promise((resolve, reject) => {
                options.editOptions.delete(oldData);
                resolve();
                // setloading(false)
            });
        }


    //adjust paging options to data length
    useEffect(() => {

        if (data) {
            setloading(false);
            tableRef.current.dataManager.changePageSize((data.length < 15) ? data.length : 15)
        }

        if (!data || data.length >= 15)
            setPageSizeOptions([15, 50, 100])
        else
            setPageSizeOptions([data.length, 15, 50, 100].sort((a, b) => a - b))

    }, [data])


    // on component load
    useEffect(() => {
        let temp = [];
        for (const column in columns) {

            temp.push({
                title: columns[column],
                field: column,
                initialEditValue: ('initialEditValue' in options) ? options.initialEditValue[column] : null,
                lookup: ('lookup' in options) ? options.lookup[column] : null,
                render: ('render' in options) ? options.render[column] : null,
                type: ('type' in options) ? options.type[column] : null,
                cellStyle: { textAlign: 'start', padding: "0px 16px", height: "60px" },
                headerStyle: { textAlign: 'center', fontSize: '1.2rem' },
            });


            if (options.edit) {
                if (options.editOptions.disableCols?.includes(column)) {

                    temp[temp.length - 1].editable = (options.editOptions.editableOnUpdate?.includes(column)) ? "onUpdate" : "never";

                }
                if (options.editOptions?.customEditComponent && options.editOptions.customEditComponent[column]) {
                    temp[temp.length - 1].editComponent = options.editOptions.customEditComponent[column];
                }


            }
        }
        setDisplayColumns(temp);
    }
        , [columns, options]);

    return (
        //<div className="table-container">
        <MaterialTable
            tableRef={tableRef}
            icons={tableIcons}
            title={title}
            columns={displayColumns}
            data={data}
            onRowClick={onRowClick}
            detailPanel={detailPanel}
            totalCount={data?.length}
            editable={editable}
            isLoading={loading}
            actions={actions}
            options={
                {
                    sorting: true,
                    detailPanelColumnAlignment: 'right',
                    padding: 'dense',
                    detailPanelType: "single",
                    idSynonym: indexKey,
                    showTitle: false,
                    addRowPosition: "first",
                    // toolbar: false - T.B.D enable after adding search & export to header
                    exportMenu: [
                        //     {
                        //     label: 'PDF יצא כקובץ',
                        //     exportFunc: (displayColumns, data) => ExportPdf(displayColumns, data, title)
                        //   },
                        {
                            label: 'יצא כקובץ אקסל',
                            exportFunc: (displayColumns, data) => ExportCsv(displayColumns, data, title)
                        }],
                    actionsColumnIndex: -1,
                    exportAllData: true,
                    pageSizeOptions: pageSizeOptions,
                    pageSize: (data?.length < 15) ? data.length : 15,
                    emptyRowsWhenPaging: false,
                    // paginationType: 'stepped',  
                    maxBodyHeight: 'calc(100vh - 155px - var(--nav-height) - var(--Screen-Header-Height))',
                    headerStyle: {
                        direction: 'rtl',
                        position: 'sticky',
                        zIndex: 1,
                        top: 0
                    },
                    rowStyle: {
                        direction: 'rtl',
                        position: "relative",
                        fontSize: "1.2rem",
                        color: "var(--textColor)",


                    },
                    searchFieldStyle: { flexDirection: 'row-reverse' }
                }}
            localization={{
                body: {
                    emptyDataSourceMessage: 'אין נתונים להצגה',
                    addTooltip: 'הוספה',
                    deleteTooltip: 'מחיקה',
                    editTooltip: 'עריכה',
                    editRow: {
                        deleteText: 'האם אתה בטוח שאתה רוצה למחוק את השורה הזאת?',
                        cancelTooltip: 'ביטול',
                        saveTooltip: 'שמירה'
                    }
                },
                header: {
                    actions: 'פעולות'
                },
                pagination: {
                    labelDisplayedRows: '{to}-{from} מתוך {count}',
                    labelRowsSelect: 'שורות',
                    labelRowsPerPage: 'מספר שורות בעמוד:',
                    firstAriaLabel: 'עמוד ראשון',
                    firstTooltip: 'עמוד ראשון',
                    previousAriaLabel: 'עמוד קודם',
                    previousTooltip: 'עמוד קודם',
                    nextAriaLabel: 'עמוד הבא',
                    nextTooltip: 'עמוד הבא',
                    lastAriaLabel: 'עמוד אחרון',
                    lastTooltip: 'עמוד אחרון'
                },
                toolbar: {
                    exportTitle: 'ייצוא',
                    exportAriaLabel: 'ייצוא המידע לקובץ',
                    exportName: 'ייצוא כקובץ אקסל',
                    searchTooltip: 'חיפוש',
                    searchPlaceholder: 'חיפוש'
                }
            }}
        />
        //</div>
    )
}

// Table.propTypes = {}

export default Table
