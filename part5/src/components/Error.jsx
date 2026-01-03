const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        }}>
      {message}
    </div>
  )
}

export default Error