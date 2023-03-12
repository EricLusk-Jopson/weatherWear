import { React, useState } from "react";

const ActivityModal = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    start: -1,
    duration: 1,
    intensity: "active",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-filter">
      <div className="modal-window">
        <h1>Add a new activity</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              placeholder="Enter a title for your activity"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              placeholder="Enter a description for your activity"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="startTime"
              value={formData.start}
              placeholder="Enter a starting hour for your activity"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="duration"
              value={formData.duration}
              placeholder="Enter a duration for your activity"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <select onChange={onChange} required>
              <option value="active">Active</option>
              <option value="static">Static</option>
            </select>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;
