import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../api/userService";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getAllUsers().then((res) => setUsers(res.data));
  };

  const handleSearch = () => {
    if (!searchName) return;
    getUserByName(searchName).then((res) => {
      if (res.data) setFormData(res.data);
    });
  };

  const handleCreate = async () => {
    await createUser(formData);
    fetchUsers();
    setFormData({ id: "", name: "", email: "", password: "", role: "" });
  };

  const handleUpdate = async () => {
    await updateUser(formData.id, formData);
    fetchUsers();
    setFormData({ id: "", name: "", email: "", password: "", role: "" });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(id);
        fetchUsers();
        Swal.fire("Eliminado", "El usuario fue eliminado correctamente", "success");
      }
    });
  };

  return (
    <div className="flex-grow bg-white p-6 rounded-lg min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Usuarios</h1>

      {/* Búsqueda */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {/* Formulario */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Rol"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Usuario
        </button>
        {formData.id && (
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Modificar Usuario
          </button>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded">
          <thead className="bg-gray-200">
            <tr className="text-left text-blue-600">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Activo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-300">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.enable ? "Sí" : "No"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setFormData(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
