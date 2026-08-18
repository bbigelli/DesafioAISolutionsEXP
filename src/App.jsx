import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Home } from './pages/Home'
import { Login } from './components/auth/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import { ListaClientes } from '../components/dashboard/Clientes/ListaClientes'
import { Configuracoes } from '../components/dashboard/Configuracoes'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Carregando...</div>
  return user ? children : <Navigate to="/login" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }>
        <Route index element={<ListaClientes />} />
        <Route path="clientes" element={<ListaClientes />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App