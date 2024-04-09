import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Header = () => {
  const [_currentUser, setCurrentUser] = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser({ token: "" });
    navigate("/");
  };

  const user = localStorage.getItem("user");
  let data = "";
  if (user) {
    const userData = JSON.parse(user);
    data = userData.name;
  }

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events/download", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tabla.xlsx"); 
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error amb la descarrega:", error);
    }
  };

  const handleUpload = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/events/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Archivo Excel subido correctamente.");
    } catch (error) {
      console.error("Error al subir el archivo Excel:", error);
      alert("Error en pujar el fitxer Excel");
    }
  };

  return (
    <>
      <header className="bg-purple-700 p-4 flex w-full items-center justify-between">
        <img src="./Icon.svg" alt="logo" className="w-[240px]" />
        <div className="flex gap-5">
          <Link to="../form" className="flex items-center gap-1">
            <img src="./formulari.svg" alt="logo" className="w-[15px] h-[12px] ml-6" />
            <span className="font-semibold text-lg text-[#ffffff]">
              Formulari
            </span>
          </Link>
          <Link to="../dashboard" className="flex items-center gap-1">
            <img src="./dashboard.svg" alt="logo" className="w-[15px] h-[15px] ml-6" />
            <span className="font-semibold text-lg text-[#f4f5f5]">
              Dashboard
            </span>
          </Link>
          <button className="flex items-center gap-1"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <img src="/pujar.svg" alt="logo" className="w-[15px] h-[15px] ml-6" />
            <span className="font-semibold text-lg text-[#ffffff]">
              Pujar Excel
            </span>
          </button>
          <input
            type="file"
            accept=".xlsx"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpload}
          />{" "}
          {/* Input oculto para subir archivos */}
          <button className="flex items-center gap-1" onClick={handleDownload}>
            <img src="./descarregar.svg" alt="logo" className="w-[15px] h-[15px] ml-6" />
            <span className="font-semibold text-lg text-[#ffffff]">
              Descarregar
            </span>
          </button>
        </div>
        <Link to="/register" className="mr-[-220px] text-white block text-sm" > Registre d'un nou usuari</Link>
        <div>
          <p className={`text-[#fdfdfd] text-xl `}>{"Benvingut/da " + data}</p>
          <button
            type="button"
            onClick={handleLogOut}
            className="font-semibold"
          >
            Tancar Sessió
          </button>
        </div>
      </header>
    </>
  );
};
