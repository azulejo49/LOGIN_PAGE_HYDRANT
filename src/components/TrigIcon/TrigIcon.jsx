import { EVENT_ICONS,EVENTS_TITLES,ICON_FILTER } from '../../services/MyProvider';
import colorfilterGenerator from '../../services/colorFilterGenerator'
import { useMemo } from 'react';


export default function TrigIcon({ trigger, style, white = false, className = '' }) {

  //   console.log(`color ${i} - ${colorfilterGenerator(EVENT_COLORS[`trig${i}`])}`)
  const getFilter = useMemo(() => ICON_FILTER[`trig${trigger}`], [trigger])
  const tempStyle = { width: '25px', height: '25px', margin: "0 10px", ...style }
  if (!white) tempStyle.filter = getFilter
  return (<img className={className} src={EVENT_ICONS[`trig${trigger}`]} style={tempStyle} alt={EVENTS_TITLES[`trig${trigger}`]} />)
}
