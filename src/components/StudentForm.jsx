import { useState, useEffect } from "react";
import { api } from "../api";

export default function StudentForm({ fetchStudents, editingStudent, setEditingStudent }) {
  
  const initialForm = {
    name: "",
    roll: "",
    section: "A",
    result: ""
  };

  const [student, setStudent] = useState(initialForm);
  const [error, setError] = useState("");

 
  useEffect(() => {
    if (editingStudent) {
      setStudent({ ...editingStudent }); 
    }
  }, [editingStudent]);

  
  const onChange = (e) => {
    const { name, value, type } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };


  const validate = () => {
    if (!student.name.trim()) return "Name is required.";
    if (!student.roll.trim()) return "Roll number is required.";
    if (isNaN(student.result) || student.result < 0 || student.result > 100)
      return "Result must be between 0 and 100.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (editingStudent) {
        await api.put(`/students/${student.id}`, student);
        setEditingStudent(null);
      } else {
        await api.post("/students", student);
      }

      fetchStudents();
      setStudent(initialForm);
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error("Submit Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-4">

      <h2 className="text-xl font-semibold">
        {editingStudent ? "Update Student" : "Add Student"}
      </h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-sm mb-1">Student Name</label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Roll Number</label>
        <input
          type="text"
          name="roll"
          value={student.roll}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Section</label>
        <select
          name="section"
          value={student.section}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          {["A", "B", "C", "D"].map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Result (Marks)</label>
        <input
          type="number"
          name="result"
          value={student.result}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {editingStudent ? "Update" : "Add"}
      </button>

    </form>
  );
}
