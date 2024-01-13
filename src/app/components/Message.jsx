export const Message = ({ message, type }) => {
  return (
    <div className={`bg-${type} rounded`}>
      <div className='card-body text-center text-white'>{message}</div>
    </div>
  )
}
