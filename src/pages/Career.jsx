import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllCareer,
  createCareer,
  updateCareer
} from "../api/careerService";
import Swal from "sweetalert2";

const Career = () => {
  const [career, setCareer] = useState([]);
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
    fetchCareer();
  }, []);

  const fetchCareer = () => {
    getAllCareer().then( (res) => setCareer(res.data));
  };

  const onSubmit = async (data) => {
    data.active = JSON.parse(String(data.active));

    if (editId) {
      await updateCareer(editId, data);
      Swal.fire("Modificado", "La carrera fue modificada exitosamente", "success");
    } else {
      await createCareer(data);
      Swal.fire("Creado", "La carrera fue creada exitosamente", "success");
    }

    fetchCareer();
    reset();
    setEditId(null);
};

  return (
    <div className="flex-grow bg-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Carreras</h1>

      {/* Búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de la carrera"
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
            placeholder="Nombre de la carrera"
            {...register("name", { required: "Nombre requerido" })}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Facultad:</label>
          <input
            type="text"
            placeholder="Facultad"
            {...register("faculty", { required: "Facultad requerida" })}
            className="border p-2 rounded w-full"
          />
          {errors.faculty && <p className="text-red-500 text-sm">{errors.faculty.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Años de Duración:</label>
          <input
            type="text"
            placeholder="Duración"
            {...register("durationYears", { required: "Años de duración requerida" })}
            className="border p-2 rounded w-full"
          />
          {errors.durationYears && <p className="text-red-500 text-sm">{errors.durationYears.message}</p>}
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
            {editId ? "Modificar Carrera" : "Crear Carrera"}
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
            {career
              .filter(career => career.name.toLowerCase().includes(searchName.toLowerCase()))
              .map((career) => (
                <tr key={career.id} className="border-t border-gray-300">
                  <td className="px-4 py-2">{career.name}</td>
                  <td className="px-4 py-2">{career.faculty}</td>
                  <td className="px-4 py-2">{career.durationYears}</td>
                  <td className="px-4 py-2">{career.active ? "SI" : "NO"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(career.id);
                        setValue("name", career.name);
                        setValue("faculty", career.faculty);
                        setValue("durationYears", career.durationYears);
                        setValue("active", String(career.active));
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

export default Career;
