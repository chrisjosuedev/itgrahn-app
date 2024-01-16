import { IconEdit, IconTrashOff } from '@tabler/icons-react'

export const DataComponent = ({
  id,
  email,
  first_name: firstName,
  last_name: lastName,
  avatar,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className='card col-md-2 col-sm-4 col-lg-2 m-2 text-center'>
      <img className='card-img-top' src={avatar} alt={`avatar-${email}`} />
      <div className='card-body'>
        <h5 className='card-title'>{`${firstName} ${lastName}`}</h5>
        <small className='text-muted'>{email}</small>
      </div>
      <div className='card-footer w-100'>
        <button onClick={() => onUpdate(id, firstName, lastName)} className='btn btn-dark btn-sm'>
          <IconEdit color='white' />
        </button>
        <button
          onClick={() => onDelete(id)}
          className='btn btn-danger btn-sm'
        >
          <IconTrashOff color='white' />
        </button>
      </div>
    </div>
  )
}
