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
      <div className="chat-container">
        {respuestas.map((respuesta, index) => (
          <Respuesta key={index} texto={respuesta.texto} esUsuario={respuesta.esUsuario} />
        ))}
      </div>

      <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Escribe tu pregunta..." 
      />
      <br></br>
      <br></br>
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
    "servicios estudiantiles": "Puedes contactar al departamento de servicios estudiantiles en el edificio de proyeccion social.",
    "estrés": "Si estás experimentando estrés, puedes acudir al departamento de bienestar estudiantil en el edificio CIVU.",
    "discapacidad": "Tenemos recursos de apoyo para estudiantes con discapacidad, contacta con la oficina de inclusión.",
    "asesoramiento académico": "La tutoría académica está disponible en el centro de asesoramiento, ubicado en el edificio D.",
    "pasantías": "Puedes buscar pasantías en el portal de empleo de la universidad. Dentro de ese apartado puedes encontrar pasantias en base a tu carrera.",
    "cv": "Tenemos un taller de redacción de CV este viernes en el aula 5.",
    "entrevistas de trabajo": "Hay un taller sobre entrevistas de trabajo el próximo lunes.",
    "clubes": "Existen varios clubes estudiantiles, desde deportes hasta arte, puedes obtener más información en la oficina de vida estudiantil.",
    "actividades fin de semana": "Dentro del fin de semana, se realizan algunos eventos por la noche por parte del observatorio Micro Macro al público.",
    "opciones de comida": "Hay varias cafeterías en el campus, puedes elegir entre comida rápida o comida saludable.",
    "hola": "¡Hola! ¿En qué puedo ayudarte hoy?",
    "buenos días": "¡Buenos días! ¿Cómo puedo asistirte?",
    "buenos dias": "¡Buenos días! ¿Cómo puedo asistirte?",
    "buenas tardes": "¡Buenas tardes! ¿En qué necesitas ayuda?",
    "buenas noches": "¡Buenas noches! ¿Cómo puedo ayudarte?",
    "gracias": "¡De nada! ¿Hay algo más en lo que pueda ayudarte?",
    "adiós": "¡Adiós! Que tengas un buen día.",
    "adios": "¡Adiós! Que tengas un buen día.",
    "soporte técnico": "Para soporte técnico, puedes contactar al departamento de TI en el edificio 5.",
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
    "grupos de extension": "Son un espacio para el desarrollo de tus habilidades y talentos, permiten hacer más integral tu formación. Esta incluye coro, danza y teatro",
    "horas sociales":"",
    "actividades ofrece el Departamento de Arte y Cultura": "El DAC organiza eventos culturales, exposiciones, presentaciones artísticas y actividades que fomentan la identidad cultural y la creatividad.",
    "que servicios brinda el Departamento de Arte y Cultura": "El DAC ofrece instrumentos musicales, escenografía, mobiliario, vestuario, herramientas y otros recursos para apoyar actividades académicas y artísticas.",
    "donde se encuentra la Pinacoteca": "La Pinacoteca está en la segunda planta del Centro Cultural Rafael Meza Ayau, junto a la Biblioteca.",
    "grupos de extensión": "Son espacios para desarrollar habilidades artísticas y fortalecer la formación integral. Incluyen Coro, Danza Contemporánea y Teatro.",
    "programas de formación ofrece el DAC": "El DAC ofrece cursos, talleres y diplomados en disciplinas como piano, violín, guitarra, dibujo, pintura, modelado y danza.",
    "como puedo participar en el voluntariado cultural": "Puedes inscribirte como promotor cultural y colaborar en eventos y proyectos del DAC para fomentar el acceso a la cultura.",
    "actividades del DAC": "Puedes registrarte en los cursos y actividades del DAC a través de su plataforma en línea o directamente en sus oficinas.",
    "cuantas horas sociales debo completar para graduarme": "Las horas sociales varían según la carrera: 300 horas para carreras técnicas y profesorados, 500 horas para licenciaturas e ingenierías, y 100 horas para maestría y doctorado.",
    "dónde puedo realizar mis horas sociales": "Puedes realizar tus horas sociales en proyectos comunitarios, instituciones sin fines de lucro y programas avalados por la UDB.",
    "como puedo inscribirme para realizar horas sociales": "Debes consultar en el departamento correspondiente de tu facultad o en la oficina de proyección social de la UDB.",
    "puedo realizar mis horas sociales en una empresa privada": "Las horas sociales deben realizarse en proyectos con impacto social, por lo que se recomienda consultar con la UDB si una empresa privada es una opción válida.",
    "qué sucede si no completo mis horas sociales a tiempo": "El cumplimiento de las horas sociales es un requisito de graduación, por lo que debes completarlas antes de finalizar tu carrera.",
    "puedo dividir mis horas sociales en diferentes proyectos": "Sí, puedes completar tus horas en distintos proyectos siempre que estén aprobados por la UDB.",
    "existe algún reconocimiento por realizar más horas de las requeridas": "Algunos programas pueden otorgar certificaciones o reconocimientos por horas adicionales, consulta con la oficina de proyección social para más información.",
    "requisitos de graduación en la UDB": "Para graduarte en la UDB debes completar todas las materias de tu plan de estudios, cumplir con las horas sociales requeridas, tener un CUM arriba de 7.0 y presentar tu trabajo de graduación si aplica.",
    "graduacion": "Para graduarte en la UDB debes completar todas las materias de tu plan de estudios, cumplir con las horas sociales requeridas, tener un CUM arriba de 7.0 y presentar tu trabajo de graduación si aplica.",
    "obligatorio realizar horas sociales para graduarme": "Sí, las horas sociales son un requisito obligatorio de graduación y varían según la carrera: 300 horas para carreras técnicas y profesorados, 500 horas para licenciaturas e ingenierías, y 100 horas para maestrías y doctorados.",
    "examen de egreso": "Es una evaluación que mide los conocimientos adquiridos durante la carrera y es un requisito obligatorio para la graduación.",
    "necesito presentar un trabajo de graduación": "Depende de la carrera. Algunas carreras requieren tesis, proyecto de graduación o práctica profesional supervisada. Consulta con tu facultad para más información.",
    "verificar mi avance en los requisitos de graduación": "Puedes revisar tu estado académico en el portal de estudiantes o consultar con la coordinación de tu carrera.",
    "falta un requisito para graduarme": "Debes ponerte en contacto con tu facultad o el departamento de registro para conocer las opciones y plazos disponibles.",
    "cuanto tiempo tarda el proceso de graduación": "El tiempo varía según el cumplimiento de requisitos y trámites administrativos. Se recomienda iniciar el proceso con anticipación para evitar retrasos.",
    "cómo puedo llegar a la UDB en bus": "Puedes llegar a la UDB utilizando rutas de transporte público que pasan cerca del campus, como la ruta 44 para el campus de Antiguo Cuscatlan, mientras que para el de Soyapango puede ser la 19, la 140 y en raras ocaciones la 41-E o 43, ambas buses.",
    "qué rutas de buses pasan cerca de la UDB": "Las rutas de buses que pasan cerca de la UDB incluyen la 42, 29 y 201. Se recomienda verificar los recorridos y horarios con el sistema de transporte público.",
    "la UDB ofrece transporte para estudiantes": "Sí, la UDB cuenta con servicios de transporte en rutas específicas. Para más información sobre disponibilidad y horarios, consulta en la oficina de servicios estudiantiles.",
    "existe un parqueo para estudiantes en la UDB": "Sí, la UDB dispone de parqueo para estudiantes. Se recomienda llegar temprano para asegurar un espacio.",
    "cómo puedo saber los horarios del transporte de la UDB": "Puedes consultar los horarios y rutas del transporte universitario en la oficina de servicios estudiantiles o en el portal de la UDB.",
    "la UDB ofrece transporte nocturno para estudiantes": "Dependiendo de la demanda y disponibilidad, la UDB puede ofrecer transporte nocturno. Se recomienda consultar directamente con la administración.",
    "hay transporte especial para prácticas o actividades fuera del campus": "Para actividades académicas fuera del campus, la UDB puede gestionar transporte especial. Consulta con tu facultad o el departamento organizador del evento."
  
  }
  for (const pregunta in respuestasFrecuentes) {
    if (mensaje.toLowerCase().includes(pregunta)) {
      return respuestasFrecuentes[pregunta];
    }
  }

  return "Lo siento, no entendí tu pregunta. ¿Puedes reformularla?";
}

export default Mensaje;