import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import reqApi from '../../api/reqApi'
import Swal from 'sweetalert2'
import { IconEdit, IconMinus, IconPlus, IconSend } from '@tabler/icons-react'
import { alertInfo, alertSuccess } from '../../helpers/SweetAlertProps'
import { DataComponent } from '../components/apis/DataComponent'
import { Message } from '../components/Message'
import { UserRegisterCard } from '../components/apis/UserRegisterCard'
import { UserUpdateCard } from '../components/apis/UserUpdateCard'

export const ApisView = () => {
  const { register, handleSubmit, reset } = useForm()
  const {
    register: updateForm,
    handleSubmit: handleUpdate,
    setFocus,
    setValue,
    reset: resetUpdate,
  } = useForm()

  const [users, setUsers] = useState([])
  const [id, setId] = useState(null)
  const [registered, setRegistered] = useState(null)
  const [updated, setUpdated] = useState(null)
  const [counterPage, setCounterPage] = useState(1)
  const [pages, setPages] = useState(1)

  useEffect(() => {
    onLoadUsers()
  }, [counterPage])

  // Control Plus
  const onAdd = () => {
    setCounterPage(counterPage + 1)
  }

  // Control Minus
  const onMinus = () => {
    if (counterPage === 1) return
    setCounterPage(counterPage - 1)
  }

  // Get Users
  const onLoadUsers = async () => {
    try {
      const {
        data: { data: usersData, total_pages },
      } = await reqApi.get(`/users?page=${counterPage}`)
      if (usersData.length === 0) {
        setCounterPage(counterPage - 1)
        return
      }
      setPages(total_pages)
      setUsers(usersData)
    } catch (error) {
      const successInfo = alertSuccess('Error.', 'error')
      Swal.fire(successInfo)
    }
  }

  // Add User
  const onHandlePost = async ({ email, password }) => {
    try {
      const { data } = await reqApi.post(`/register`, { email, password })

      // Set Registered data from API
      setRegistered(data)
      reset()

      // Clean State Component
      setTimeout(() => {
        setRegistered(null)
      }, 7000)

      const successInfo = alertSuccess('Usuario registrado con éxito.', 'success')
      Swal.fire(successInfo)
    } catch (error) {
      const {
        response: {
          data: { error: postError },
        },
      } = error
      const successInfo = alertSuccess(`Error en el servidor: ${postError}`, 'error')
      Swal.fire(successInfo)
    }
  }

  // Update User
  const onHandlePut = async ({ name, job }) => {
    if (!id) {
      const successInfo = alertSuccess('Seleccione ID.', 'error')
      Swal.fire(successInfo)
      return
    }
    if (!name && !job) {
      const successInfo = alertSuccess('Complete los datos requeridos.', 'error')
      Swal.fire(successInfo)
      return
    }
    try {
      const { data } = await reqApi.put(`/api/users/${id}`, { name, job })

      // Set Updated data from API
      setUpdated(data)
      resetUpdate()

      // Clean State Component
      setTimeout(() => {
        setUpdated(null)
      }, 7000)

      // Update State Users if Name exists
      if (name) {
        setUsers((prev) =>
          prev.map((user) => {
            if (user.id === id) {
              user.first_name = name.trim().split(' ')[0]
              user.last_name = name.trim().split(' ')[1] ?? ''
            }
            return user
          })
        )
      }

      // Set ID to Null
      setId(null)
      const successInfo = alertSuccess('Usuario actualizado con éxito.', 'success')
      Swal.fire(successInfo)
    } catch (error) {
      const successInfo = alertSuccess(
        `Surgió un error al actualizar usuario con id: ${id}.`,
        'error'
      )
      Swal.fire(successInfo)
    }
  }

  // Delete Users
  const onDelete = (id) => {
    try {
      const logoutInfo = alertInfo(
        `¿Seguro que desea eliminar el item con id: ${id}?`,
        'info',
        'Si'
      )
      Swal.fire(logoutInfo).then(async (result) => {
        if (result.isConfirmed) {
          await reqApi.delete(`/users/${id}`)
          const successInfo = alertSuccess('Usuario eliminado', 'success')
          Swal.fire(successInfo)
          setUsers((prev) => prev.filter((user) => user.id !== id))
        }
      })
      // Update State
    } catch (error) {
      const successInfo = alertSuccess(`Surgió un error al eliminar.`, 'error')
      Swal.fire(successInfo)
    }
  }

  // Update Users
  const onUpdate = async (id, firstName, lastName) => {
    setValue('name', `${firstName} ${lastName}`)
    setFocus('name')
    setId(id)
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-12 p-4'>
          <h1 className='view-title'>APIs</h1>
          <small>
            Ver documentación en:{' '}
            <code>
              <a href='https://reqres.in/' target='_blank' rel='noreferrer'>
                https://reqres.in/
              </a>
            </code>
            <br />
            La API no altera información (POST, PUT, DELETE) solo da código de éxito y fallo en
            caso contrario.
          </small>
        </div>
        <div className='col-md-12'>
          <code>
            <h3>POST</h3>
          </code>
          <hr />
          <form className='mt-2' onSubmit={handleSubmit(onHandlePost)}>
            <div className='row'>
              <div className='col'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Email'
                  {...register('email')}
                />
              </div>
              <div className='col'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='Password'
                  {...register('password')}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                <IconSend color='white' /> POST
              </button>
            </div>
          </form>
          <small className='text-muted'>
            Nota: Puede agregar cualquier email de la lista obtenida <a href='#get'>(GET)</a>.
          </small>
          <div className='mt-2'>
            {registered && (
              <>
                <p>Respuesta: </p>
                <UserRegisterCard id={registered?.id} token={registered?.token} />
              </>
            )}
          </div>
        </div>
        <div className='col-md-12 mt-4'>
          <code>
            <h3>PUT</h3>
          </code>
          <hr />
          <form className='mt-2' onSubmit={handleUpdate(onHandlePut)}>
            {id && (
              <div className='p-2'>
                <strong>ID: </strong>
                {id}
              </div>
            )}
            <div className='row'>
              <div className='col'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Nombre'
                  {...updateForm('name')}
                />
              </div>
              <div className='col'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Job'
                  {...updateForm('job')}
                />
              </div>
              <button type='submit' className='btn btn-primary'>
                <IconSend color='white' /> PUT
              </button>
            </div>
          </form>
          <small className='text-muted'>
            Nota: Para actualizar, de click en {'  '}
            <code>
              <IconEdit color='black' />
            </code>
            de cada perfil para obtener el ID. <a href='#get'>(GET)</a>.
          </small>
          <div className='mt-2'>
            {updated && (
              <>
                <p>Respuesta: </p>
                <UserUpdateCard {...updated} />
              </>
            )}
          </div>
        </div>
        <div className='col-md-12 mt-4'>
          <hr />
          <code>
            <h3 id='get'>GET | DELETE</h3>
          </code>
          <hr />
          <small>Total de Páginas: {pages}</small>
          <div className='row'>
            {users.length === 0 && (
              <div className='col-md-12'>
                <Message message='No hay usuarios que mostrar. 🚀' type='light' />
              </div>
            )}
            {users.map((user, index) => (
              <DataComponent
                key={index}
                {...user}
                onDelete={onDelete}
                onUpdate={() => onUpdate(user.id, user.first_name, user.last_name)}
              />
            ))}
          </div>
        </div>
        <div className='col-md-12 p-4 text-center'>
          <button onClick={onMinus} className='btn btn-outline-dark mr-2 btn-sm'>
            <IconMinus />
          </button>
          <button onClick={onAdd} className='btn btn-dark btn-sm'>
            <IconPlus />
          </button>
        </div>
      </div>
    </div>
  )
}
