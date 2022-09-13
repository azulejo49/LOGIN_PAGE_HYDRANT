import { useEffect, useState, useContext } from 'react'
import { MyContext } from '../../services/MyProvider'
import soundMessage from '../../assets/sounds/reverse.m4a'
import MyNotification from '../../services/MyNotification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import warning from '../../assets/icons/warning.svg'
import './reverseWarning.css'

//create audio warning Obj from recording
const audio = new Audio(soundMessage);
export default function ReverseWarning({ event }) {
  //loop audio when playing
  audio.loop = true;

  const { hydrantArr, setIsMuted, setFocusedEvent } = useContext(MyContext);

  // Hydrant with reverse flow event
  const hydrant = hydrantArr?.find(hydrant => hydrant.hydrant_id === event.hydrant_id);
  const [isPlaying, setIsPlaying] = useState(!audio.paused)


  // Activate warning on first load , if fails show notification (componentDidMount)
  useEffect(() => {
    setFocusedEvent()
    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(e => { MyNotification('red', 'זרימה הפוכה', `לא ניתן להשמיע אזעקה`); setIsPlaying(false) });
    }
    return (() => {
      audio.pause();
      // audio.currentTime = 0;
    })
  }, [])

  // Function to active sound
  const PlaySoundMessage = () => {
    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(e => { console.log(e); setIsPlaying(false) });
    }
  }
  // on every render chack if we are playing warning , of no start playing, console log failure (componentDidUpdate)
  useEffect(() => {
    PlaySoundMessage();
    return (() => {
      audio.pause();
      // audio.currentTime = 0;
    })
  })
  //callback to mute sound and focuse on event on button click
  function hanleClick() {
    setFocusedEvent(event);
    audio.pause();
    audio.currentTime = 0;
    setIsMuted(true);
  }

  return (
    <div className='background-reverse'>
      <div className='reverseWarning' onClick={PlaySoundMessage}>
        <img src={warning} />
        <h1 >זרימה&nbsp;הפוכה&nbsp;!</h1>
        <p>כמות&nbsp;: {event?.value}&nbsp;{event?.value_type}</p>
        {hydrant && <p>{hydrant.street}&nbsp;{hydrant.number}, {hydrant.city}</p>}
        <div className='btnContainer'>
          <button className='btn'
            disabled={!isPlaying}
            onClick={hanleClick}>טיפול&nbsp;באירוע&nbsp;
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
      </div>
    </div>
  )
}
