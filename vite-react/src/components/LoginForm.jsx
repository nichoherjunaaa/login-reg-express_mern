import React, { useState, useEffect } from "react";
import "../styles/loginReg.css";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [users, setUsers] = useState([]);
  const [emailOrPhoneOrUsername, setEmailOrPhoneOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan kesalahan
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/users");
        setUsers(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    const foundUser = users.find(
      (user) =>
        (user.username === emailOrPhoneOrUsername || user.emailOrPhone === emailOrPhoneOrUsername) && // Perbaiki logika dengan tanda kurung
        user.password === password
    );

    if (foundUser) {
      console.log(foundUser);
      alert("Login success");
      setErrorMessage(""); 
    } else {
      setErrorMessage("Username, Email, atau Kata Sandi salah!"); 
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-login">
      <div className="logo">
        <span>LEARNIFY</span>
        <img alt="LEARNIFY logo" height="24" src="/logo.png" width="24" />
      </div>
      <h1>Hi!</h1>
      <h2>Sobat Learnify!</h2>
      <p>Ayo mulai berlatih dan belajar bersama LEARNIFY!</p>
      <input
        placeholder="Username, Email atau Nomor Telepon"
        type="text"
        value={emailOrPhoneOrUsername}
        onChange={(e) => setEmailOrPhoneOrUsername(e.target.value)}
      />
      <div className="input-container">
        <input
          placeholder="Kata Sandi"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={togglePasswordVisibility}></i>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Menampilkan pesan kesalahan */}
      <div className="checkbox-container">
        <label>
          <input type="checkbox" />
          Ingat Saya
        </label>
        <a href="#">Lupa Kata Sandi ?</a>
      </div>
      <button className="btn" onClick={handleSubmit}>Masuk</button>
      <div className="social-login">
        <p>Masuk Menggunakan</p>
        <div className="image-login">
          <img src="/icons8-google-48.png" alt="" />
          <img src="/icons8-facebook-48.png" alt="" />
        </div>
      </div>
      <div className="register">
        Belum bergabung dengan LEARNIFY ?<Link to={"/register"}>Daftar</Link>
      </div>
    </div>
  );
};

export default LoginForm;
