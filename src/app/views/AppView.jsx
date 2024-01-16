import { useEffect } from 'react'
import { useDataStore } from '../../hooks/useDataStore'
import { DoughnutChart } from '../components/charts/DoughnutChart'
import { Message } from '../components/Message'

export const AppView = () => {
  const { startLoadingAnalitics, paymentAnalitica } = useDataStore()

  useEffect(() => {
    startLoadingAnalitics()
  }, [])

  return (
    <div className='container mt-4'>
      <div className='row mb-4'>
        <div className='col-md-12'>
          <h1 className='view-title'>DASHBOARD</h1>
          <hr />
          <p className='text-muted'> Analítica de Ventas Crédito/Efectivo</p>
        </div>
        {paymentAnalitica ? (
          <div className='col-md-6 mx-auto'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Ventas Crédito/Efectivo</h5>
                <hr />
                <DoughnutChart data={paymentAnalitica} />
              </div>
            </div>
          </div>
        ) : (
          <div className='col-md-12'>
            <Message message='No hay datos para visualizar la gráfica. 🚀' type='light' />
          </div>
        )}
      </div>
    </div>
  )
}
