export const UserUpdateCard = ({ name = '', job = '', updatedAt }) => {
  return (
    <div className='card col-md-4 m-2 text-center'>
      <div className='card-body'>
        <h5 className='card-title'>{name ?? `Nombre: ${name}`}</h5>
        <h5 className='card-title'>{job ?? `Trabajo: ${name}`}</h5>
        <small className='text-muted'>{`updatedAt: ${updatedAt}`}</small>
      </div>
    </div>
  )
}
