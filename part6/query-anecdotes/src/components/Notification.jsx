import { useContext } from "react"
import NotifContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { notifObject } = useContext(NotifContext)

  return (
    <>
      {
      notifObject.notif ? <div style={style}>{notifObject.notif}</div>
            : <></>
      }
    </>
  )
}

export default Notification
