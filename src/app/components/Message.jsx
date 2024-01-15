export const Message = ({ message, type }) => {
  return (
    <div className={`bg-${type} rounded`}>
      <div
        className={`card-body text-center ${type !== 'light' ? 'text-white' : 'text-dark'}`}
      >
        {message}
      </div>
    </div>
  )
}
