import { Navigate, Route, Routes } from "react-router-dom";
import { AppPage } from "../pages/AppPage";
import { ClientsPage } from "../pages/ClientsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { InvoicesPage } from "../pages/InvoicesPage";
import { ApisPage } from "../pages/ApisPage";
import { ConsultasPage } from "../pages/ConsultasPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AppPage />} />
      <Route path='/clientes' element={<ClientsPage />} />
      <Route path='/productos' element={<ProductsPage />} />
      <Route path='/facturas' element={<InvoicesPage />} />
      <Route path='/consultas' element={<ConsultasPage />} />
      <Route path='/apis' element={<ApisPage />} />
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
