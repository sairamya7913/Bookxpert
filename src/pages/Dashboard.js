import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

import EmployeeForm from "../components/EmployeeForm";

const Dashboard = () => {
    const dummyEmployees = [
        {
            id: 1,
            name: "Rahul Sharma",
            gender: "Male",
            dob: "1995-04-12",
            state: "Telangana",
            active: true,
            image: ""
        },
        {
            id: 2,
            name: "Anjali Verma",
            gender: "Female",
            dob: "1997-09-22",
            state: "Karnataka",
            active: false,
            image: ""
        },
        {
            id: 3,
            name: "Suresh Kumar",
            gender: "Male",
            dob: "1993-01-18",
            state: "Tamil Nadu",
            active: true,
            image: ""
        },
        {
            id: 4,
            name: "Pooja Singh",
            gender: "Female",
            dob: "1998-06-05",
            state: "Maharashtra",
            active: false,
            image: ""
        },
        {
            id: 5,
            name: "Vikram Reddy",
            gender: "Male",
            dob: "1992-11-30",
            state: "Andhra Pradesh",
            active: true,
            image: ""
        }
    ];

    const [employees, setEmployees] = useState(dummyEmployees);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    const saveEmployee = (data) => {
        if (editData) {
            setEmployees((prev) =>
                prev.map((e) => (e.id === editData.id ? data : e))
            );
            toast.success("Employee updated");
        } else {
            setEmployees([...employees, { ...data, id: uuid() }]);
            toast.success("Employee added");
        }
        setEditData(null);
    };

    const deleteEmployee = (id) => {
        if (window.confirm("Are you sure?")) {
            setEmployees(employees.filter((e) => e.id !== id));
            toast.success("Employee deleted");
        }
    };

    const filteredEmployees = employees.filter((e) => {
        return (
            e.name.toLowerCase().includes(search.toLowerCase()) &&
            (gender ? e.gender === gender : true) &&
            (status ? (status === "active" ? e.active : !e.active) : true)
        );
    });

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">
                <h4>Employee Dashboard</h4>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    Create Employee
                </button>
            </div>

            {/* Filters */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Employee Table */}
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Profile</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>State</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="text-center">
                                Loading employees...
                            </td>
                        </tr>
                    ) : filteredEmployees.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center text-muted">
                                No employees found
                            </td>
                        </tr>
                    ) : (
                        filteredEmployees.map((e) => (
                            <tr
                                key={e.id}
                                className={!e.active ? "table-secondary" : ""}
                            >

                                <td>
                                    {e.image ? (
                                        <img
                                            src={e.image}
                                            alt=""
                                            width="40"
                                            height="40"
                                            className="rounded-circle"
                                        />
                                    ) : (
                                        <span className="text-muted">N/A</span>
                                    )}
                                </td>

                                <td>{e.name}</td>
                                <td>{e.gender}</td>
                                <td>{e.dob}</td>
                                <td>{e.state}</td>
                                <td>
                                    <span
                                        className={`badge ${e.active ? "bg-success" : "bg-secondary"
                                            }`}
                                    >
                                        {e.active ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                <td>
                                    <FaEdit
                                        className="me-3 text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setEditData(e);
                                            setShowForm(true);
                                        }}
                                    />

                                    <FaTrash
                                        className="me-3 text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => deleteEmployee(e.id)}
                                    />

                                    <FaPrint
                                        style={{ cursor: "pointer" }}
                                        onClick={() => window.print()}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <EmployeeForm
                show={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditData(null);
                }}
                onSave={saveEmployee}
                editData={editData}
            />
        </div>
    );
};

export default Dashboard;
