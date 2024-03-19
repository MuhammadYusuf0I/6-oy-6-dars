import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { validate, getUsers } from "./utilits/Functions";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [nat, setNat] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [UpdateId, setUpdateId] = useState("");

  useEffect(() => {
    let u = getUsers;
    setUsers(u);
  }, []);

  function handleRadio(value) {
    setNat(value);
  }

  function handleClick(e) {
    e.preventDefault();
    const isValid = validate(name, age, email, nat, pass);
    if (isValid) {
      const user = {
        name: name,
        age: age,
        email: email,
        nat: nat,
        pass: pass,
        id: nanoid(),
        visible: false,
      };
      let copied = JSON.parse(JSON.stringify(users));
      copied.push(user);
      localStorage.setItem("users", JSON.stringify(copied));
      setName("");
      setAge(0);
      setEmail("");
      setPass("");
      setNat("");
    }
  }

  function handleShow(order, user) {
    let copied = JSON.parse(JSON.stringify(users));

    copied = copied.map((el) => {
      if (el.id == user.id && order == "show") {
        el.visible = true;
      }
      if (el.id == user.id && order == "hide") {
        el.visible = false;
      }
      return el;
    });
    setUsers(copied);
  }
  function handleUpdate() {
    if (UpdateId) {
      const isValid = validate(name, age, email, nat, pass);
      if (isValid) {
        const user = {
          name: name,
          age: age,
          email: email,
          nat: nat,
          pass: pass,
          id: UpdateId,
          visible: false,
        };
        let copied = JSON.parse(JSON.stringify(users));
        copied = copied.map((el) => {
          if (el.id == UpdateId) {
            el = user;
          }
          return el;
        });
        setUsers(copied);
        localStorage.getItem("users"), JSON.stringify(copied);
        setIsUpdate(false);
        setName("");
        setAge(0);
        setEmail("");
        setPass("");
        setNat("");
      }
    }
  }
  function handleUpdateItem(user) {
    setIsUpdate(true);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setPass(user.pass);
    setNat(user.nat);

    setUpdateId(user.id);
  }

  return (
    <>
      <div className="container">
        <div className="container-form  mt-4 shadow-lg p-3 mb-5  w-50">
          <h1 className="text-center">Users</h1>
          <div className="users-form   mt-4 shadow-lg p-3 mb-5  w-100">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  placeholder="0"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  placeholder="Enter password"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </div>
              <div className="form-nat mt-4 rounded px-3 border border-2 pb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nat"
                    id="uzbek"
                    value="uzbek"
                    checked={nat == "uzbek" ? true : false}
                    onChange={(e) => {
                      handleRadio(e.target.value);
                    }}
                  />
                  <label className="form-check-label" htmlFor="uzbek">
                    Uzbek
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nat"
                    id="english"
                    value="english"
                    checked={nat == "english" ? true : false}
                    onChange={(e) => {
                      handleRadio(e.target.value);
                    }}
                  />
                  <label className="form-check-label" htmlFor="english">
                    English
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nat"
                    id="russian"
                    value="russian"
                    checked={nat == "russian" ? true : false}
                    onChange={(e) => {
                      handleRadio(e.target.value);
                    }}
                  />
                  <label className="form-check-label" htmlFor="russian">
                    Russian
                  </label>
                </div>
              </div>

              {!isUpdate && (
                <button
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary mt-4 w-100"
                >
                  SAVE
                </button>
              )}
              {isUpdate && (
                <button
                  onClick={handleUpdate}
                  type="button"
                  className="btn btn-secondary mt-4 w-100"
                >
                  Update
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="container-table">
          <table className="table table-striped border border-4 mt-4 shadow-lg p-3 mb-5 bg-body rounded w-100">
            <thead>
              <tr>
                <th>N_%</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Password</th>
                <th>Nationality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="d-flex gap-3">
                          <span>{user.visible ? user.pass : "****"}</span>
                          <span>
                            {user.visible ? (
                              <FaEye
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleShow("hide", user);
                                }}
                              ></FaEye>
                            ) : (
                              <FaEyeSlash
                                onClick={() => {
                                  handleShow("show", user);
                                }}
                                style={{ cursor: "pointer" }}
                              ></FaEyeSlash>
                            )}
                          </span>
                        </div>
                      </td>
                      <td>{user.nat}</td>
                      <td>
                        <div className="icons d-flex gap-3">
                          <FaTrashCan
                            style={{ cursor: "pointer", fontSize: "20px" }}
                          />
                          <FaEdit
                            onClick={() => {
                              handleUpdateItem(user);
                            }}
                            style={{ cursor: "pointer", fontSize: "20px" }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
