/**
 * SOLUTECH — solutech.js
 * Motor principal del sitio. Inicializa UI, animaciones y componentes.
 * Zero dependencias externas. Zero polling. Zero APIs en tiempo real.
 */

'use strict';

const Solutech = {

    /* ─── Init ─────────────────────────────────────────────── */
    init() {
        document.body.style.visibility = 'visible';
        this.initNav();
        this.initReveal();
        this.renderPage();
    },

    /* ─── Navbar ────────────────────────────────────────────── */
    initNav() {
        const btn    = document.getElementById('nav-mobile-btn');
        const mobile = document.getElementById('nav-mobile');
        if (btn && mobile) {
            btn.addEventListener('click', () => {
                mobile.classList.toggle('hidden');
            });
        }

        // Scroll → glass effect
        const nav = document.getElementById('nav-wrapper');
        if (nav) {
            window.addEventListener('scroll', () => {
                nav.style.paddingTop = window.scrollY > 20 ? '12px' : '24px';
            }, { passive: true });
        }
    },

    /* ─── Scroll Reveal ─────────────────────────────────────── */
    initReveal() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('active');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });

        // Small delay so styles are applied before observation
        setTimeout(() => {
            document.querySelectorAll('.reveal, .reveal-group').forEach(el => io.observe(el));
        }, 60);
    },

    /* ─── Page Router ───────────────────────────────────────── */
    renderPage() {
        const page = document.body.dataset.page;
        if (!page || typeof SOLUTECH === 'undefined') return;

        const renderers = {
            'index':    () => this.renderIndex(),
            'servicios':() => this.renderPricing(),
            'nosotros': () => this.renderNosotros(),
            'blog':     () => this.renderBlogIndex(),
        };

        if (renderers[page]) renderers[page]();
    },

    /* ─── Index Page ────────────────────────────────────────── */
    renderIndex() {
        this._renderServices('services-grid');
        this._renderPortfolio('portfolio-grid');
    },

    _renderServices(containerId) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = SOLUTECH.services.map(s => `
            <div class="glass p-8 rounded-[28px] card-hover reveal">
                <div class="w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mb-6">
                    ${s.icon}
                </div>
                <h3 class="text-lg font-bold mb-2">${s.title}</h3>
                <p class="text-white/40 text-sm leading-relaxed font-light">${s.description}</p>
            </div>
        `).join('');
        this.initReveal();
    },

    _renderPortfolio(containerId) {
        const el = document.getElementById(containerId);
        if (!el || !SOLUTECH.portfolio) return;
        el.innerHTML = SOLUTECH.portfolio.map(p => `
            <div class="glass rounded-[28px] overflow-hidden card-hover reveal">
                <div class="relative h-48 overflow-hidden">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-500">
                    <div class="absolute top-4 left-4 flex gap-2">
                        <span class="text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white px-3 py-1 rounded-full">${p.tag}</span>
                        <span class="text-[9px] font-black uppercase tracking-widest bg-white/10 text-white/70 px-3 py-1 rounded-full">${p.label}</span>
                    </div>
                </div>
                <div class="p-7">
                    <p class="text-white/30 text-xs uppercase tracking-widest mb-2">${p.client}</p>
                    <h3 class="text-lg font-bold mb-3 tracking-tight">${p.title}</h3>
                    <p class="text-white/40 text-sm leading-relaxed">${p.description}</p>
                </div>
            </div>
        `).join('');
        this.initReveal();
    },

    /* ─── Pricing Page ──────────────────────────────────────── */
    renderPricing() {
        const el = document.getElementById('pricing-grid');
        if (!el) return;
        el.innerHTML = SOLUTECH.pricing.map(plan => `
            <div class="glass p-10 rounded-[40px] border ${plan.highlight ? 'border-orange-500/30' : 'border-white/5'} flex flex-col relative overflow-hidden card-hover reveal">
                ${plan.highlight ? `<div class="absolute top-0 right-0 bg-orange-500 text-black font-black text-[9px] px-6 py-2 rounded-bl-2xl uppercase tracking-widest">${plan.badge}</div>` : ''}
                <p class="text-white/30 text-xs mb-4 uppercase tracking-widest">${plan.target}</p>
                <h3 class="text-2xl font-bold mb-2">${plan.name}</h3>
                <div class="flex items-baseline gap-1 mb-8">
                    <span class="text-4xl font-black">${plan.price}</span>
                    <span class="text-white/30 text-sm italic">${plan.period}</span>
                </div>
                <ul class="space-y-3 mb-8 flex-grow">
                    ${plan.features.map(f => `
                        <li class="flex items-start gap-3 text-sm text-white/60 font-light">
                            <svg class="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                            </svg>
                            ${f}
                        </li>
                    `).join('')}
                </ul>
                <a href="soporte.html"
                   class="${plan.highlight ? 'btn-primary' : 'glass border border-white/10 hover:bg-white/5 font-bold text-white text-sm py-4 rounded-xl text-center block transition-all'} ${plan.highlight ? 'w-full py-4 rounded-xl text-center block text-sm' : ''}">
                    ${plan.cta}
                </a>
            </div>
        `).join('');
        this.initReveal();
    },

    /* ─── Nosotros Page ─────────────────────────────────────── */
    renderNosotros() {
        const f = SOLUTECH.founder;
        const nameEl = document.getElementById('founder-name');
        const roleEl = document.getElementById('founder-role');
        const bioEl  = document.getElementById('founder-bio');
        const valsEl = document.getElementById('founder-values');

        if (nameEl) nameEl.textContent = f.name;
        if (roleEl) roleEl.textContent = f.role;
        if (bioEl)  bioEl.textContent  = f.bio;
        if (valsEl) {
            valsEl.innerHTML = f.values.map(v => `
                <li class="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                    <svg class="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>${v}</span>
                </li>
            `).join('');
        }
    },

    /* ─── Blog Index ────────────────────────────────────────── */
    renderBlogIndex() {
        const el = document.getElementById('blog-grid');
        if (!el) return;
        el.innerHTML = SOLUTECH.blog.map(post => `
            <a href="${post.slug}" class="block rounded-[28px] overflow-hidden card-hover reveal" style="background:rgba(30,30,30,0.5);border:1px solid rgba(255,255,255,0.07);">
                ${ post.image ? `
                <div class="relative h-48 overflow-hidden">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover opacity-80 hover:opacity-95 transition-opacity duration-500" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span class="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest text-white bg-orange-500 px-3 py-1 rounded-full">${post.tag}</span>
                </div>` : '' }
                <div class="p-8">
                    <div class="flex items-center gap-3 mb-4 ${ post.image ? '' : '' }">
                        ${ !post.image ? `<span class="text-[9px] font-black uppercase tracking-widest text-orange-500 border border-orange-500/30 px-3 py-1 rounded-full">${post.tag}</span>` : '' }
                        <span class="text-white/30 text-xs">${post.date}</span>
                    </div>
                    <h3 class="text-xl font-bold mb-3 leading-tight text-white">${post.title}</h3>
                    <p class="text-white/50 text-sm leading-relaxed mb-5">${post.excerpt}</p>
                    <span class="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold uppercase tracking-wider">
                        Leer artículo
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                        <span class="text-white/20 font-normal normal-case tracking-normal">${post.readTime}</span>
                    </span>
                </div>
            </a>
        `).join('');
        this.initReveal();
    },

};

/* ─── Bootstrap ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => Solutech.init());

// Back/Forward cache — re-initialize after navigation
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.style.visibility = 'visible';
        Solutech.init();
    }
});
