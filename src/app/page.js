/* Archivo que se encarga de mostrar la visualizacion a la hora de correr el comando de npm run dev */
'use client'; 

import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import configuracionChatbot from "../components/configuracion";
import AnalizadorMensajes from "../components/respuesta";
import ProveedorAcciones from "../components/mensajes";

function App() {
  return (
    <div>
        <h1 className="titulo">Chatbot UDB</h1>
      <br></br>
      <Chatbot config={configuracionChatbot} messageParser={AnalizadorMensajes} actionProvider={ProveedorAcciones} 
      />
    </div>
  );
}

export default App;
