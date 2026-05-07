/**
 * SOLUTECH — data.js
 * Fuente única de verdad para todos los datos del sitio.
 * Edita aquí para actualizar precios, testimonios, servicios, etc.
 */
const SOLUTECH = {

    brand: {
        name:     'Solutech',
        tagline:  'Especialistas IT',
        phone:    '684 248 465',
        email:    'hola@solutech.shop',
        location: 'Almería & Murcia — Soporte Nacional Remoto',
        mission:  'Que la tecnología de tu negocio funcione siempre, sin que tengas que preocuparte por ella.',
    },

    social: {
        instagram: 'https://www.instagram.com/xavi.solutech/',
        linkedin:  'https://www.linkedin.com/in/xaviaerox',
        whatsapp:  'https://wa.me/34684248465',
        youtube:   'https://www.youtube.com/@solutech-it',
    },

    founder: {
        name: 'Xavi Alonso',
        role: 'Fundador & Técnico Superior de Sistemas',
        bio:  'Llevo años metido en infraestructura, redes y seguridad. He trabajado en proyectos de todo tipo — desde el cableado estructurado de un edificio hasta la securización de entornos con datos sensibles. En algún momento decidí que prefería trabajar directamente con las empresas, sin capas de por medio. Así nació Solutech: sin socios, sin subcontratas, sin call centers. Cuando contratas soporte, hablas conmigo. Cuando hay un problema, lo resuelvo yo.',
        values: [
            'Trato directo — sin intermediarios ni delegaciones',
            'Precio cerrado antes de empezar — sin sorpresas en la factura',
            'Diagnóstico honesto — si no lo necesitas, te lo digo',
            'Presencia física en el Levante, remoto avanzado a nivel nacional',
        ],
    },

    pricing: [
        {
            id:        'esencial',
            name:      'Esencial',
            price:     '149€',
            period:    '/mes',
            target:    'Autónomos y pequeños negocios',
            highlight: false,
            features: [
                'Soporte remoto ilimitado (horario laboral)',
                'Antivirus gestionado en todos los equipos',
                'Backup automático en la nube (50 GB)',
                'Revisión preventiva trimestral',
                'Respuesta &lt; 24 h',
            ],
            cta: 'Empezar con Esencial',
        },
        {
            id:        'profesional',
            name:      'Profesional',
            price:     '299€',
            period:    '/mes',
            target:    'Empresas de 5 a 20 empleados',
            highlight: true,
            badge:     'Más elegido',
            features: [
                'Todo lo del plan Esencial, más:',
                'Soporte presencial y remoto prioritario',
                'Backup híbrido ilimitado (local + nube)',
                'Auditoría de seguridad trimestral con informe',
                'Gestión de actualizaciones y parches',
                'Respuesta &lt; 4 h',
                'Asesoramiento en compras de tecnología',
            ],
            cta: 'Elegir Profesional',
        },
        {
            id:        'blindaje',
            name:      'Blindaje Total',
            price:     '499€',
            period:    '/mes',
            target:    'Empresas con datos sensibles',
            highlight: false,
            features: [
                'Todo lo del plan Profesional, más:',
                'Seguridad por capas (firewall, cifrado, accesos)',
                'Cumplimiento RGPD: auditoría + documentación',
                'Plan de recuperación ante desastres (DRP)',
                'Formación en seguridad para empleados',
                'Respuesta prioritaria &lt; 2 h',
                'Informe mensual de estado para gerencia',
            ],
            cta: 'Solicitar Blindaje Total',
        },
    ],

    services: [
        {
            icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
            color:       'bg-orange-500/15 text-orange-500',
            title:       'Soporte y Mantenimiento',
            description: 'Mantenimiento preventivo y correctivo. Windows, Mac, Linux, redes WiFi, periféricos.',
        },
        {
            icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
            color:       'bg-blue-500/15 text-blue-400',
            title:       'Ciberseguridad',
            description: 'Antivirus gestionado, protección ransomware, cifrado de discos, control de accesos.',
        },
        {
            icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>`,
            color:       'bg-emerald-500/15 text-emerald-400',
            title:       'Backup y Recuperación',
            description: 'Copias automáticas, recuperación de datos, almacenamiento seguro en la nube.',
        },
        {
            icon: `<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
            color:       'bg-purple-500/15 text-purple-400',
            title:       'Consultoría IT',
            description: 'Asesoramiento en compras, digitalización, auditorías de red, formación de equipo.',
        },
    ],

    // Casos reales de trabajo — sin reseñas inventadas
    portfolio: [
        {
            tag:         'Redes',
            label:       'Instalación',
            client:      'Edificio Residencial — Almería',
            title:       'Infraestructura de Red Estructural',
            description: 'Instalación integral de cableado estructurado en edificio de 4 plantas. Habilitación de tomas de alta velocidad en todas las estancias, centralización de rack de comunicaciones y optimización de cobertura WiFi total.',
            image:       'assets/img/redes-rack.png',
        },
        {
            tag:         'Software',
            label:       'Producto',
            client:      'Stockflow Electrodomésticos',
            title:       'UX/UI para Software de Gestión',
            description: 'Diseño y maquetación de plataforma de gestión de inventario para empresa de climatización. Optimización de flujos de trabajo para almacén y control de stock en tiempo real.',
            image:       'assets/img/software-ui.png',
        },
        {
            tag:         'Seguridad',
            label:       'Sistemas',
            client:      'Residencial Particular',
            title:       'Videovigilancia IP y Fusión de Fibra',
            description: 'Instalación de sistema de videovigilancia IP de alta definición y despliegue de fibra óptica doméstica. Configuración de perímetros de seguridad electrónica y acceso remoto seguro.',
            image:       'assets/img/cctv-fiber.png',
        },
    ],

    blog: [
        {
            slug:    'posts/it-murcia-almeria.html',
            tag:     'Informe Sectorial',
            date:    '7 May 2026',
            title:   'Radiografía IT: Pymes en Murcia y Almería',
            excerpt: 'Análisis de la obsolescencia tecnológica y los riesgos de ciberseguridad en el sector agrícola y logístico del sureste.',
            readTime: '10 min',
            image:   'assets/img/it-murcia-almeria.png',
        },
        {
            slug:    'posts/soporte-reactivo-coste.html',
            tag:     'Estrategia IT',
            date:    '13 Abr 2026',
            title:   '¿Por qué el soporte reactivo te cuesta dinero?',
            excerpt: 'Cuando la IT solo aparece cuando algo se rompe, pagas mucho más de lo que crees. Descubre el coste oculto del modelo reactivo.',
            readTime: '6 min',
            image:   'assets/img/blog-it.png',
        },
    ],
};
