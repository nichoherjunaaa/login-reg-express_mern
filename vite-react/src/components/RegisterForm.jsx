import React, { useState } from "react";
import "../styles/loginReg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

const RegisterForm = () => {

  const [newUser, setNewUser] = useState({
    emailOrPhone: "",
    username: "",
    password: "",
  });

  const [confirmPassword, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newUser.password !== confirmPassword) {
      return alert("Password tidak cocok");
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", newUser);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    if(e.target.name === "confirmPassword") {
      setConfirmPass(e.target.value);
    }
    else{
      setNewUser({
        ...newUser,
        [e.target.name]: e.target.value,
      });
    }
  };



  return (
    <div className="container-register">
    <div className="logo">
      <span>LEARNIFY</span>
      <img
        alt="LEARNIFY logo"
        height="24"
        src="/logo.png"
        width="24"
      />
    </div>
    <h1>Halo!</h1>
    <h2>Selamat Datang!</h2>
    <p className="subtitle">Ayo bergabung dan mulai belajar bersama LEARNIFY!</p>
    <input placeholder="Email atau Nomor Telepon" type="text" value={newUser.emailOrPhone} onChange={handleChange} name="emailOrPhone"/>
    <div className="input-container">
          <input type="text" placeholder="Nama Lengkap" value={newUser.username} onChange={handleChange} name="username"/>
        </div>
        <div className="input-container">
          <input type="password" placeholder="Kata Sandi" value = {newUser.password} onChange = {handleChange} name="password"/>
          <i className="fas fa-eye"></i>
        </div>
          <p className="text-alert">Harus terdapat angka dan minimal 6 karakter</p>
        <div className="input-container">
          <input type="password" placeholder="Konfirmasi Kata Sandi" value = {confirmPassword} onChange = {handleChange} name="confirmPassword"/>
          <i className="fas fa-eye"></i>
        </div>
          <p className="text-alert">Harus terdapat angka dan minimal 6 karakter</p>
        <div className="checkbox-container">
      <label>
        <input type="checkbox" />
        Saya telah membaca dan setuju dengan <a href="">Syarat dan Ketentuan</a> serta <a href="">Kebijakan Privasi</a>
      </label>
    </div>
    <button className="btn" onClick={handleSubmit}>Daftar</button>
    <div className="social-login">
      <p>Daftar Menggunakan</p>
      <div className="image-login">
        <img src="/icons8-google-48.png" alt="" />
        <img src="/icons8-facebook-48.png" alt="" />
      </div>
    </div>
    <div className="register">
      Sudah bergabung dengan LEARNIFY ?<Link to={"/login"}>Masuk</Link>
    </div>
  </div>
  );
};

export default RegisterForm;
