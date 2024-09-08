introJs().setOptions({
    steps: [
    {
        title: 'Bienvenido a UTASK', //TITULO BIENVENIDA
        intro: 'Esta guía te ayudara a saber como utilizar la plataforma de UTASK para poder llevar a cabo una'+
        ' mejor gestión de tus proyectos académicos en equipo' //CONTENIDO
    },
    {
        element: '#home', //ID DEL ELEMENTO AL QUE APUNTARA LA GUIA
        intro: 'Pagina principal donde puedes crear, unirte y ver tus proyectos'// CONTENIDO
    },
    {
        element: '#calendario',
        intro: 'Calendario para poder observar las fechas de tus tareas pendientes a lo largo del proyecto'
    },
    {
        element: '#tarea',
        intro: 'Aquí podras ver las tareas que se han realizado y siguen en curso dentro del proyecto'
    },
    {
        element: '#notif',
        intro: 'Notificaciones que la plataforma te enviara si se acerca la fecha limite de la realización de una tarea o proyecto'
    },
    {
        element: '#info',
        intro: 'Información adicional sobre UTASK'
    },
    {
        element: '#email',
        intro: 'Aquí podras buscar los proyectos en los que estes trabajando'
    },
    {
        element: '#btnCrearProyecto',
        intro: 'El boton "Crear Proyecto" te permite registrar un nuevo proyecto. Para esto necesitas ingresar los '+
        'datos del nombre del proyecto, nombre del curso, fecha de inicio y fecha limite'
    },
    {
        element: '#btnUnirseProyecto',
        intro: 'El boton "Unirte a Proyecto" te permite unirte a un proyecto existente a través de un código. '+
        'Asimismo, puedes observar las últimas peticiones que otros estudiantes te ofrecen para unirte a sus proyectos'
    },
    {
        element: '#projectCard',
        intro: 'Aqui podras visualizar algunos datos importantes sobre tus proyectos como el nombre del curso, tareas'+
        ' pendientes, integrantes, a que avance pertenece y la fecha de finalización'
    },
    {
        element: '#trabajoFechaCard',
        intro: 'Finalmente, aqui podras ver las fechas limites mas cercanas de los trabajos designados para los distintos proyectos'
    }
    
]
}).start();