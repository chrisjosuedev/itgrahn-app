export const UserRegisterCard = ({id, token }) => {
  return (
    <div className='card col-md-4 m-2 text-center'>
    <div className='card-body'>
      <h5 className='card-title'>{`ID: ${id}`}</h5>
      <small className='text-muted'>{`Token: ${token}`}</small>
    </div>
  </div>
  )
}
