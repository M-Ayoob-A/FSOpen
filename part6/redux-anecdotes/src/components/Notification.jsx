import { useSelector } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const Notification = () => {
  const notif = useSelector(state => state.notification)

  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notificationLength = 5000

  useEffect(() => {
    
    const id = setTimeout(() => {
      dispatch(removeNotification())
    }, notificationLength)
    console.log("reset timer started")

    return () => {
      clearTimeout(id)
    }
  }, [dispatch, notif])

  return (
    <>
      {
      notif ? <div style={style}>{notif}</div>
            : <></>
      }
    </>
  )
}

export default Notification