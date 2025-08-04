import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllCycles,
  createCycle,
  updateCycle
} from "../api/academicCycle";
import Swal from "sweetalert2";

const Cycle = () => {
  const [cycle, setCycle] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCycle();
  }, []);

  const fetchCycle = () => {
    getAllCycles().then( (res) => setCycle(res.data));
  };

  const onSubmit = async (data) => {
    data.active = JSON.parse(String(data.active));

    if (editId) {
      await updateCycle(editId, data);
      Swal.fire("Modificado", "El ciclo académico fue modificado exitosamente", "success");
    } else {
      await createCycle(data);
      Swal.fire("Creado", "El ciclo académico fue creada exitosamente", "success");
    }

    fetchCycle();
    reset();
    setEditId(null);
};

  return (
    <div className="flex-grow bg-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión del Ciclo Académicos</h1>

      {/* Búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de la ciclo"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-64"
          name="search"
        />
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Nombre:</label>
          <input
            type="text"
            placeholder="Nombre del ciclo académico"
            {...register("name", { required: "Nombre requerido" })}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha de Inicio:</label>
          <input
            type="date"
            placeholder="Facultad"
            {...register("faculty", { required: "Fecha de inicio requerida" })}
            className="border p-2 rounded w-full"
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha de Fin:</label>
          <input
            type="date"
            placeholder="Duración"
            {...register("durationYears", { required: "Fecha de culminación requerida" })}
            className="border p-2 rounded w-full"
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Estado:</label>
          <select
            {...register("active", { required: "Estado requerido" })}
            className="border p-2 rounded w-full"
            defaultValue="true"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          {errors.active && <p className="text-red-500 text-sm">{errors.active.message}</p>}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className={`${
              editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded`}
          >
            {editId ? "Modificar Ciclo Académico" : "Crear Ciclo Académico"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                reset();
                setEditId(null);
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded">
          <thead className="bg-gray-200">
            <tr className="text-left text-blue-600">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Facultad</th>
              <th className="px-4 py-2">Años de duración</th>
              <th className="px-4 py-2">Activo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cycle
              .filter(cycle => cycle.name.toLowerCase().includes(searchName.toLowerCase()))
              .map((cycle) => (
                <tr key={cycle.id} className="border-t border-gray-300">
                  <td className="px-4 py-2">{cycle.name}</td>
                  <td className="px-4 py-2">{cycle.faculty}</td>
                  <td className="px-4 py-2">{cycle.durationYears}</td>
                  <td className="px-4 py-2">{cycle.active ? "SI" : "NO"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(cycle.id);
                        setValue("name", cycle.name);
                        setValue("faculty", cycle.faculty);
                        setValue("durationYears", cycle.durationYears);
                        setValue("active", String(cycle.active));
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Modificar
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

export default Cycle;
