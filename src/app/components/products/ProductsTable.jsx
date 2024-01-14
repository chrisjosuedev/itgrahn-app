import { generateId } from "../../../plugins/id.plugin"
import { Table } from '../Table'
import { Actions } from './Actions'

const columns = [
  {
    header: 'Código',
    accessorKey: 'id',
  },
  {
    header: 'Producto',
    accessorKey: 'productName',
  },
  {
    header: 'Precio',
    accessorKey: 'price',
    cell: (props) => `L. ${props.getValue().toFixed(2)}`,
  },
  {
    header: 'Stock',
    accessorKey: 'stock',
  },
  {
    header: '',
    accessorKey: generateId(),
    cell: (props) => {
      const { id } = props.row.original
      return <Actions values={id} />
    },
  },
]

export const ProductsTable = ({ data }) => {
  return (
    <Table data={data} columns={columns} filterBy={'Nombre del Producto, Precio, Stock...'} />
  )
}
