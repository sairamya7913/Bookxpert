import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
];

const EmployeeForm = ({ show, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm(editData);
      setPreview(editData.image);
    }
  }, [editData]);

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Name is required";
    if (!form.gender) err.gender = "Gender is required";
    if (!form.dob) err.dob = "DOB is required";
    if (!form.state) err.state = "State is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
    setErrors({});
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? "Edit Employee" : "Create Employee"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              isInvalid={errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Gender *</Form.Label>
            <Form.Select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              isInvalid={errors.gender}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>DOB *</Form.Label>
            <Form.Control
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              isInvalid={errors.dob}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>State *</Form.Label>
            <Form.Select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              isInvalid={errors.state}
            >
              <option value="">Select State</option>
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" onChange={handleImage} />
            {preview && (
              <img src={preview} alt="" width="80" className="mt-2 rounded" />
            )}
          </Form.Group>

          <Form.Check
            className="mt-2"
            type="switch"
            label="Active"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeForm;
