import React, { useState, useEffect } from 'react';
import Respuesta from './respuesta';
import configuraciones from './configuracion';

function Mensaje() {
  const [mensaje, setMensaje] = useState('');
  const [respuestas, setRespuestas] = useState(configuraciones.initialMessages || []);

  const enviarMensaje = () => {
    setRespuestas([...respuestas, { texto: mensaje, esUsuario: true }]);
    setMensaje('');

    setTimeout(() => {
      const respuestaChatbot = obtenerRespuesta(mensaje);
      setRespuestas([...respuestas, { texto: mensaje, esUsuario: true }, { texto: respuestaChatbot, esUsuario: false }]);
    }, 1000);
  };

  return (
    <div>
      <link reel="stylesheet" href='../app/page.module.css'></link>
      <h1>Chatbot de Ayuda Estudiantil</h1>
      <div className="chat-container">
        {respuestas.map((respuesta, index) => (
          <Respuesta key={index} texto={respuesta.texto} esUsuario={respuesta.esUsuario} />
        ))}
      </div>

      <input 
        type="text" 
        value={mensaje} 
        onChange={(e) => setMensaje(e.target.value)} 
        placeholder="Escribe tu pregunta..." 
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

function obtenerRespuesta(mensaje) {
  const respuestasFrecuentes = {
    "calendario académico": "El calendario académico está disponible en la página de la universidad. Puedes ingresar al siguiente enlace para más información https://www.udbvirtual.edu.sv/calendario",
    "horario de clases": "Puedes ver tu horario en el portal del estudiante.",
    "inscripción de cursos": "Los períodos de inscripción son anunciados en el portal de la universidad en una hora programada en base a tu facultad y carrera que estudias.",
    "biblioteca": "La biblioteca está ubicada a la par del edificio del Rafael Maza Ayau y su horario es de 8 AM a 6 PM.",
    "servicios estudiantiles": "Puedes contactar al departamento de servicios estudiantiles en el de proyeccion social.",
    "estrés": "Si estás experimentando estrés, puedes acudir al departamento de bienestar estudiantil en el edificio CIVU.",
    "discapacidad": "Tenemos recursos de apoyo para estudiantes con discapacidad, contacta con la oficina de inclusión.",
    "asesoramiento académico": "La tutoría académica está disponible en el centro de asesoramiento, ubicado en el edificio D.",
    "pasantías": "Puedes buscar pasantías en el portal de empleo de la universidad.",
    "cv": "Tenemos un taller de redacción de CV este viernes en el aula 5.",
    "entrevistas de trabajo": "Hay un taller sobre entrevistas de trabajo el próximo lunes.",
    "clubes": "Existen varios clubes estudiantiles, desde deportes hasta arte, puedes obtener más información en la oficina de vida estudiantil.",
    "actividades fin de semana": "Este fin de semana habrá una noche de cine en el campus.",
    "opciones de comida": "Hay varias cafeterías en el campus, puedes elegir entre comida rápida o comida saludable.",
    "hola": "¡Hola! ¿En qué puedo ayudarte hoy?",
    "buenos días": "¡Buenos días! ¿Cómo puedo asistirte?",
    "buenos dias": "¡Buenos días! ¿Cómo puedo asistirte?",
    "buenas tardes": "¡Buenas tardes! ¿En qué necesitas ayuda?",
    "buenas noches": "¡Buenas noches! ¿Cómo puedo ayudarte?",
    "gracias": "¡De nada! ¿Hay algo más en lo que pueda ayudarte?",
    "adiós": "¡Adiós! Que tengas un buen día.",
    "adios": "¡Adiós! Que tengas un buen día.",
    "soporte técnico": "Para soporte técnico, puedes contactar al departamento de TI en el edificio A.",
    "recursos del campus": "Puedes encontrar información sobre los recursos del campus en el portal del estudiante.",
    "eventos": "Puedes ver los próximos eventos en el calendario de la universidad.",
    "deportes": "Hay varios equipos deportivos en los que puedes participar. Visita la oficina de deportes para más información.",
    "arte": "El club de arte se reúne todos los miércoles en el aula 3.",
    "música": "El club de música tiene ensayos los viernes en el auditorio.",
    "tecnología": "El club de tecnología organiza talleres mensuales sobre diferentes temas. Consulta el calendario para más detalles.",
    "soporte técnico en UDB": "El soporte técnico en UDB está disponible para ayudarte con problemas técnicos. Puedes contactar al departamento de TI en el edificio A.",
    "qué es el soporte técnico en UDB": "El soporte técnico en UDB está disponible para ayudarte con problemas técnicos. Puedes contactar al departamento de TI en el edificio A.",
    "inscripción de cursos en UDB": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde está la biblioteca": "La biblioteca está ubicada a la par del edificio del Rafael Maza Ayau y su horario es de 8 AM a 6 PM.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo me inscribo en un curso": "Puedes inscribirte en un curso a través de la plataforma del campus, en la sección de inscripción.",
    "dónde puedo encontrar los recursos del campus": "Los recursos del campus están disponibles en la página principal del portal, bajo la sección 'Recursos'.",
    "cómo puedo solucionar problemas con mi cuenta": "Si tienes problemas con tu cuenta, visita la sección de soporte técnico en el portal o contacta con el soporte a través de correo electrónico.",
    "cuáles son los horarios de clases": "Los horarios de clases pueden ser consultados directamente desde el portal de estudiantes.",
    "cómo puedo contactar con soporte técnico": "Para soporte técnico, por favor dirígete a la página de 'Soporte' o envía un correo a soporte@ejemplo.com.",
    "dónde puedo obtener información sobre becas": "Toda la información sobre becas está disponible en el portal en la sección 'Becas y Oportunidades'.",
    "qué servicios ofrece el centro de desarrollo profesional": "El centro de desarrollo profesional ofrece orientación vocacional, asesoría de carrera y recursos para mejorar tus habilidades profesionales.",
  }
  for (const pregunta in respuestasFrecuentes) {
    if (mensaje.toLowerCase().includes(pregunta)) {
      return respuestasFrecuentes[pregunta];
    }
  }

  return "Lo siento, no entendí tu pregunta. ¿Puedes reformularla?";
}

export default Mensaje;