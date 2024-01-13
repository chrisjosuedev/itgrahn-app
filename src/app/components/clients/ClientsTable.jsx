import { Table } from '../Table'
import { Actions } from './Actions'

const columns = [
  {
    header: 'RTN',
    accessorKey: 'rtn',
  },
  {
    header: 'Cliente',
    accessorKey: 'fullName',
  },
  {
    header: 'Dirección',
    accessorKey: 'address',
    cell: (props) =>
      props.getValue().length > 40
        ? `${props.getValue().substring(0, 40)}...`
        : props.getValue(),
  },
  {
    header: '',
    accessorKey: 'id',
    cell: (props) => <Actions values={props.getValue()} />,
  },
]

export const ClientsTable = ({ data }) => {
  return <Table data={data} columns={columns} filterBy={'Nombre, Direccion...'} />
}
