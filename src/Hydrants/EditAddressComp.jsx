import { addressToCord, CordToAddress } from "../services/geoCode";

export default function EditAddressComp(props) {

    const handleChange = (e) => {

        props.rowData[props.columnDef.field] = e.target.value;
        props.onRowDataChange(props.rowData)
        if (['lat', 'lng'].includes(props.columnDef.field))
            getAddress(props.rowData.lat, props.rowData.lng)
        if (['city', 'street', 'number'].includes(props.columnDef.field))
            getGeoCord(props.rowData.city, props.rowData.street, props.rowData.number)


    }


    function getGeoCord(city, street, number) {
        if (city && city !== "" && street && street !== "") {

            addressToCord(city, street, number)
                .then(geo => {
                    if (geo?.partAddress) {
                        props.rowData['geoAddress'] = `${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`;
                        if (geo.partAddress.city.includes(city) && geo.partAddress.street.includes(street)) {
                            props.rowData.lat = geo.geometry.lat();
                            props.rowData.lng = geo.geometry.lng();
                        }
                    }
                    else
                        props.rowData['geoAddress'] = "כתובת לא זוהתה";
                    props.onRowDataChange(props.rowData)

                })
                .catch(err => {
                    props.rowData['geoAddress'] = "כתובת לא זוהתה";
                    props.onRowDataChange(props.rowData)

                })
        }
        // else (console.log(city, street, number))

    }





    //Callback Func to set address from lat&lng cord
    function getAddress(lat, lng) {
        if (lat && lat !== "" && lng && lng !== "") {
            CordToAddress(lat, lng)
                .then(geo => {
                    if ('partAddress' in geo) {
                        props.rowData.city = geo.partAddress.city;
                        props.rowData.street = geo.partAddress.street;
                        props.rowData.number = geo.partAddress.number;
                        props.rowData['geoAddress'] = `${geo.partAddress.street} ${geo.partAddress.number} ,${geo.partAddress.city}`
                    }
                    else
                        props.rowData['geoAddress'] = "לא זוהתה כתובת בקורדינטות"
                    props.onRowDataChange(props.rowData)

                })
                .catch(err => {
                    props.rowData['geoAddress'] = "לא זוהתה כתובת בקורדינטות"
                    props.onRowDataChange(props.rowData)

                })
        }
    }




    return (

        <>
            <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl">
                <input
                    className='MuiInputBase-input MuiInput-input'
                    type={props.columnDef.field === "number" ? "number" : "text"}
                    placeholder={props.columnDef.title}
                    value={props.value}
                    onChange={handleChange}
                />
            </div>
            {(props.columnDef.field === 'city') && props.rowData.geoAddress && <p style={{ position: "absolute" }}><i>{props.rowData.geoAddress}</i></p>}
        </>
    )
}
