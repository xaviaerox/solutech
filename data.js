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
        linkedin:  'https://linkedin.com/company/solutech-it',
        whatsapp:  'https://wa.me/34684248465',
        youtube:   'https://www.youtube.com/@solutech-it',
    },

    founder: {
        name: 'Xavi Alonso',
        role: 'Fundador & Técnico Superior de Sistemas',
        bio:  'Técnico superior informático especializado en infraestructura y seguridad. Fundé Solutech con un objetivo claro: que las empresas pequeñas y los profesionales tengan acceso al mismo nivel de atención técnica que una gran corporación, pero con el trato directo y la honestidad de alguien que se juega su nombre en cada trabajo.',
        values: [
            'Trato directo — sin call centers, sin intermediarios',
            'Precio cerrado — sabes cuánto cuesta antes de empezar',
            'Sin tecnicismos — te explico todo en lenguaje normal',
            'Presencia real — estoy aquí, no en una oficina remota',
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

    testimonials: [
        {
            initial: 'A',
            name:    'Antonio R.',
            role:    'Empresario — Almería',
            text:    'Xavi nos da la tranquilidad de saber que si algo falla, él estará aquí para solucionarlo. Llevamos 8 meses con el plan Profesional y no hemos tenido ni un solo día de parada.',
        },
        {
            initial: 'L',
            name:    'Lucía M.',
            role:    'Autónoma — Murcia',
            text:    'Servicio honesto. Me explicó qué fallaba sin tecnicismos y el precio fue exactamente el presupuestado. Ahora tengo mis copias de seguridad automatizadas y duermo tranquila.',
        },
        {
            initial: 'C',
            name:    'Carlos D.',
            role:    'Director de Asesoría — Almería',
            text:    'Necesitábamos cumplir con el RGPD y no sabíamos por dónde empezar. Xavi nos hizo la auditoría, implementó todo y nos dejó la documentación lista para cualquier inspección.',
        },
    ],

    blog: [
        {
            slug:    'posts/soporte-reactivo-coste.html',
            tag:     'Estrategia IT',
            date:    '13 Abr 2026',
            title:   '¿Por qué el soporte reactivo te cuesta dinero?',
            excerpt: 'Cuando la IT solo aparece cuando algo se rompe, pagas mucho más de lo que crees. Descubre el coste oculto del modelo reactivo.',
            readTime: '6 min',
        },
    ],
};
