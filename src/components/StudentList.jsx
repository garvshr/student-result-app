import { api } from "../api";

export default function StudentList({ students, fetchStudents, setEditingStudent }) {
  const handleDelete = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">Student List</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Roll</th>
            <th>Section</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b">
              <td>{s.name}</td>
              <td>{s.roll}</td>
              <td>{s.section}</td>
              <td>{s.result}</td>
              <td className="space-x-2">
                <button
                  onClick={() => setEditingStudent(s)}
                  className="px-2 py-1 bg-yellow-400 rounded m-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded m-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
