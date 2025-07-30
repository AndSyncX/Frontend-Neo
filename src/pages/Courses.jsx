import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllCourses,
  createCourse,
  updateCourse,
} from "../api/courseService";
import { 
  getUserById,
  getAllTeachers
} from "../api/userService";
import Swal from "sweetalert2";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
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
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = () => {
    getAllCourses().then((res) => setCourses(res.data));
  };

  const fetchTeachers = () => {
    getAllTeachers().then((res) => setTeachers(res.data));
  };

  const onSubmit = async (data) => {
    if (editId) {
      await getUserById(data.userId);
      await updateCourse(editId, data);
      Swal.fire("Modificado", "El curso fue modificado exitosamente", "success");
    } else {
      await createCourse(data);
      Swal.fire("Creado", "El curso fue creado exitosamente", "success");
    }

    fetchCourses();
    reset();
    setEditId(null);
  };

  return (
    <div className="flex-grow bg-white p-6 rounded-lg min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Cursos</h1>

      {/* Búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre del curso"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-64"
          name="search"
        />
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Nombre del Curso"
            {...register("name", { required: "Nombre requerido" })}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Descripción"
            {...register("description", { required: "Descripción requerida" })}
            className="border p-2 rounded w-full"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <select
          {...register("userId", { required: "Docente requerido" })}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccione un docente</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={String(teacher.id)}>
              {String(teacher.name)}
            </option>
          ))}
        </select>

        <div>
          <input
            type="date"
            placeholder="Fecha de Inicio"
            {...register("startDate", { required: "Fecha de inicio requerida" })}
            className="border p-2 rounded w-full"
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
        </div>

        <div>
          <input
            type="date"
            placeholder="Fecha de Fin"
            {...register("endDate", { required: "Fecha de fin requerida" })}
            className="border p-2 rounded w-full"
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className={`${
              editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded`}
          >
            {editId ? "Modificar Curso" : "Crear Curso"}
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
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Docente</th>
              <th className="px-4 py-2">Inicio</th>
              <th className="px-4 py-2">Fin</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses
              .filter(course => course.name.toLowerCase().includes(searchName.toLowerCase()))
              .map((course) => (
                <tr key={course.id} className="border-t border-gray-300">
                  <td className="px-4 py-2">{course.name}</td>
                  <td className="px-4 py-2">{course.description}</td>
                  <td className="px-4 py-2">{course.userFullName}</td>
                  <td className="px-4 py-2">{course.startDate}</td>
                  <td className="px-4 py-2">{course.endDate}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(course.id);
                        setValue("name", course.name);
                        setValue("description", course.description);
                        setValue("userId", String(course.userId));
                        setValue("startDate", course.startDate);
                        setValue("endDate", course.endDate);
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

export default Courses;
