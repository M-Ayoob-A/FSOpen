import { useDispatch } from "react-redux"
import { filterActionCreator } from "../reducers/filterReducer"

const Filter = () => {
  
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(filterActionCreator(event.target.value))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter