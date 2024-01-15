import { generateId } from "../../../plugins/id.plugin";
import { Table } from "../Table";
import { Actions } from "./Actions";

const columns = [
  {
    header: "# Factura",
    accessorKey: "id"
  },
  {
    header: "Fecha",
    accessorKey: "date",
  },
  {
    header: "Cliente",
    accessorKey: "customer",
  },
  {
    header: "Tipo",
    accessorKey: "payment",
  },
  {
    header: "",
    accessorKey: generateId(),
    cell: (props) => {
      const { id } = props.row.original;
      return (<Actions values={id} />)
    }
  }
];

export const InvoicesTable = ({ data }) => {
  return (
    <Table
      data={data}
      columns={columns}
      filterBy={"Cliente, # Factura, Fecha..."} />
  )
}
