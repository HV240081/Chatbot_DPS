// Desarrolla la interaccion entre usuario y chatbot
import React from 'react';

function Respuesta({ texto, esUsuario }) {
  return (
    <div className={esUsuario ? 'respuesta-usuario' : 'respuesta-chatbot'}>
      <p>{texto}</p>
    </div>
  );
}

export default Respuesta;
