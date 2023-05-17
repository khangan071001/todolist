import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

import {
  createTodo,
  fetchTodos,
  updateTodo,
  removeTodo,
} from "../action/action";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox, FormControlLabel } from "@mui/material";
const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const isLoading = useSelector((state) => state.isLoading);
  const [checkAll, setCheckAll] = useState(false);
  const [addTodo, setAddTodo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    age: "",
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !addTodo.id &&
      addTodo.name.trim() !== "" &&
      addTodo.phone.trim() !== "" &&
      addTodo.address.trim() !== "" &&
      addTodo.email.trim() !== "" &&
      addTodo.age.trim() !== "" &&
      addTodo.age.length <= 2 &&
      addTodo.age > 0
    ) {
      dispatch(
        createTodo({
          name: addTodo.name,
          phone: addTodo.phone,
          address: addTodo.address,
          age: addTodo.age,
          email: addTodo.email,
        })
      );
      setAddTodo({ name: "", phone: "", email: "", address: "", age: "" });
      toast.success("Thêm thành công");
    } else if (
      addTodo.id &&
      addTodo.name.trim() !== "" &&
      addTodo.phone.trim() !== "" &&
      addTodo.address.trim() !== "" &&
      addTodo.email.trim() !== "" &&
      addTodo.age.trim() !== "" &&
      addTodo.age.length <= 2 &&
      addTodo.age > 0
    ) {
      dispatch(
        updateTodo(addTodo.id, {
          id: addTodo.id,
          name: addTodo.name,
          phone: addTodo.phone,
          address: addTodo.address,
          age: addTodo.age,
          email: addTodo.email,
        })
      );
      setAddTodo({ name: "", phone: "", email: "", address: "", age: "" });
      toast.success("Sửa thành công");
    } else {
      toast.error("Nhập đầy đủ thông tin");
    }
  };

  const handleEdit = (todo) => {
    setAddTodo({
      id: todo.id,
      name: todo.name,
      phone: todo.phone,
      address: todo.address,
      age: todo.age,
      email: todo.email,
    });
    setCheckedIds('')
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
    toast.success("Xoá thành công");
  };
  function validateName(name,address) {
    const checkName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm
    if (name) {
      if (name.trim() === "") {
        return "Trường này không được để trống";
      } else if (checkName.test(name)) {
        return "";
      } else {
        return "Tên không hợp lệ";
      }
    }
    if (address) {
      if (address.trim() === "") {
        return "Trường này không được để trống";
      } else if (checkName.test(address)) {
        return "";
      } else {
        return "Địa chỉ không hợp lệ";
      }
    }
  }
  function validateAddress(address) {
    const checkName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm
    if (address) {
      if (address.trim() === "") {
        return "Trường này không được để trống";
      } else if (checkName.test(address)) {
        return "";
      } else {
        return "Địa chỉ không hợp lệ";
      }
    }
  }
  function validateEmail(email) {
    const checkEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
    if (email) {
      if (email.trim() === "") {
        return "Trường này không được để trống";
      } else if (checkEmail.test(email)) {
        return "";
      } else {
        return "Email không hợp lệ";
      }
    }
  }
  function validateAge(age) {
    const maxAge = 2;
    if (age.length === 0) {
      return "";
    } else if (age <= 0) {
      return "Vui lòng nhập đúng số tuổi";
    } else if (age.length > maxAge) {
      return `Nhập tối đa ${maxAge} kí tự`;
    }
  }
  function validatePhone(phone) {
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (phone === "") {
      return "";
    } else {
      if (vnf_regex.test(phone) === false) {
        return "Số điện thoại không đúng định dạng!";
      } else {
        return "";
      }
    }
  }

  const [checkedIds, setCheckedIds] = useState([]);
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setCheckedIds((prevCheckedIds) => [...prevCheckedIds, id]);
    } else {
      setCheckedIds((prevCheckedIds) =>
        prevCheckedIds.filter((checkedId) => checkedId !== id)
      );
    }
  };
  const handleDeleteSelected = (id) => {
    checkedIds.map((id) => dispatch(removeTodo(id)));
    setCheckedIds([]);
    toast.success("Xoá thành công");
  };

  return (
    <form className="form-cha">
      <div className="form">
        <ToastContainer />
        <div className="todolist">
          <h1>Todo List</h1>
          <div className="form-children">
            <div onSubmit={handleSubmit}>
              <div className="form-view">
                <div>
                  <TextField
                    label="Tên"
                    className="input-text"
                    value={addTodo.name}
                    onChange={(e) =>
                      setAddTodo({ ...addTodo, name: e.target.value })
                    }
                    name="name"
                    key={addTodo.id}
                  />
                  {validateName(addTodo.name) !== "" && (
                    <div className="error">{validateName(addTodo.name)}</div>
                  )}
                </div>
                <div>
                  <TextField
                    label="Điện thoại"
                    className="input-text"
                    value={addTodo.phone}
                    type="number"
                    onChange={(e) =>
                      setAddTodo({ ...addTodo, phone: e.target.value })
                    }
                    name="phone"
                    key={addTodo.id}
                  />
                  {validatePhone(addTodo.phone) !== "" && (
                    <div className="error">{validatePhone(addTodo.phone)}</div>
                  )}
                </div>
                <div>
                  <TextField
                    label="Địa chỉ"
                    className="input-text"
                    value={addTodo.address}
                    onChange={(e) =>
                      setAddTodo({ ...addTodo, address: e.target.value })
                    }
                    name="address"
                    key={addTodo.id}
                  />
                  {validateAddress(addTodo.address) !== "" && (
                    <div className="error">{validateAddress(addTodo.address)}</div>
                  )}
                </div>
                <div>
                  <TextField
                    label="email"
                    className="input-text"
                    value={addTodo.email}
                    type="email"
                    onChange={(e) =>
                      setAddTodo({ ...addTodo, email: e.target.value })
                    }
                    name="email"
                    key={addTodo.id}
                  />
                  {validateEmail(addTodo.email) !== "" && (
                    <div className="error">{validateEmail(addTodo.email)}</div>
                  )}
                </div>
                <div>
                  <TextField
                    label="Tuổi"
                    className="input-text"
                    value={addTodo.age}
                    type="number"
                    onChange={(e) =>
                      setAddTodo({ ...addTodo, age: e.target.value })
                    }
                    name="age"
                    key={addTodo.id}
                  />
                  {validateAge(addTodo.age) !== "" && (
                    <div className="error">{validateAge(addTodo.age)}</div>
                  )}
                </div>
                {checkedIds.length > 0 && (
                  <DeleteIcon
                    className="button-xoa-check"
                    onClick={handleDeleteSelected}
                  />
                )}
                <button
                  className="button-css-icon"
                  onClick={handleSubmit}
                  type="submit"
                >
                  <div>
                    {" "}
                    {!addTodo.id ? (
                      <div>
                        Thêm
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    ) : (
                      <div>
                        Sửa <i className="fa-solid fa-pen"></i>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="listtodo">
            {isLoading && (
              <p style={{ textAlign: "center" }}>Đợi tí để load ......</p>
            )}
            {!isLoading && (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <FormControlLabel
                          className="th-1"
                          control={
                            <Checkbox
                              checked={checkAll}
                              onChange={(e) => {
                                const ischeckAll = e.target.checked;
                                if (ischeckAll) {
                                  setCheckedIds(todos.map((item) => item.id));
                                } else {
                                  setCheckedIds([]);
                                }
                                setCheckAll(ischeckAll);
                              }}
                            />
                          }
                        />
                      </th>
                      <th>STT</th>
                      <th>Tên</th>
                      <th>Số điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Tuổi</th>
                      <th>Email</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.map((todo, index) => (
                      <tr key={todo.id}>
                        <td>
                          <Checkbox
                            checked={checkedIds.includes(todo.id)}
                            onChange={(event) =>
                              handleCheckboxChange(event, todo.id)
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </td>
                        <td className="index-text">{index + 1}</td>
                        <td>{todo.name}</td>
                        <td>{todo.phone}</td>
                        <td>{todo.address}</td>
                        <td>{todo.age}</td>
                        <td>{todo.email}</td>
                        <td>
                          <div className="icon-edit-delete">
                            <div>
                              <EditIcon
                                className="editIcon"
                                onClick={() => handleEdit(todo)}
                              />
                            </div>
                            <div>
                              <DeleteIcon
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => handleDelete(todo.id)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default TodoList;
