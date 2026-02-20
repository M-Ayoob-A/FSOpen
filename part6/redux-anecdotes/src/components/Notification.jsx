import { useSelector } from "react-redux"


const Notification = () => {
  const notif = useSelector(state => state.notification.content)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

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