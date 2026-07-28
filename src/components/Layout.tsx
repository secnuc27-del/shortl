import { Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Menu, X, MapPin, Instagram, Facebook, Clock, PartyPopper } from "lucide-react";
import logoTransparente from "../assets/logo-transparente.png";
import { isSchoolAnniversary, getSchoolAge } from "@/lib/school";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/a-escola", label: "A Escola" },
  { to: "/turmas", label: "Turmas" },
  { to: "/clubes", label: "Clubes" },
  { to: "/eventos", label: "Eventos" },
  { to: "/tutorias", label: "Tutorias" },
  { to: "/galeria", label: "Galeria" },
  { to: "/equipe", label: "Equipe" },
] as const;

function Logo({ size = 44, white = false }: { size?: number; white?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoTransparente}
        alt="Logo Escola de Tempo Integral"
        style={{
          height: size,
          width: "auto",
          filter: white ? "brightness(0) invert(1)" : undefined,
        }}
        className="shrink-0 object-contain drop-shadow-sm"
      />
    </div>
  );
}

function AnniversaryBanner() {
  if (!isSchoolAnniversary()) return null;
  return (
    <div className="bg-gradient-to-r from-accent to-[oklch(0.6_0.25_30)] text-white px-4 py-2.5 text-center text-sm font-bold shadow-md flex items-center justify-center gap-3 relative z-[60] animate-[fade-down_0.5s_ease-out]">
      <PartyPopper size={18} className="animate-bounce" />
      <span>Hoje a Escola KJK comemora {getSchoolAge()} anos de história e dedicação! 🎉</span>
      <PartyPopper size={18} className="animate-bounce hidden sm:block" />
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnniversaryBanner />
      <header className="relative z-50 border-b border-border bg-background">
        <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-2 lg:grid-cols-[auto_1fr_auto]">
          <Link to="/" className="min-w-0">
            <Logo size={70} />
          </Link>

          <nav className="hidden items-center justify-center gap-0.5 lg:flex">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link text-[13px]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/contato" className="btn-accent text-sm">
              Fale conosco
            </Link>
          </div>

          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="container-x flex flex-col gap-1 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  activeProps={{ className: "rounded-lg px-3 py-2.5 text-sm font-semibold text-primary bg-primary-soft" }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contato"
                onClick={() => setOpen(false)}
                className="mt-2 btn-accent text-center text-sm"
              >
                Fale conosco
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

type ModalType = "sobre" | "privacidade" | "termos" | null;

function FooterModal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    if (type) {
      requestAnimationFrame(() => setVisible(true));
      const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handler);
        document.body.style.overflow = "";
      };
    } else {
      setVisible(false);
    }
  }, [type, handleClose]);

  if (!type) return null;

  const content = {
    sobre: {
      title: "Sobre o Site",
      body: (
        <>
          <p>Este é o portal oficial da <strong>Escola Estadual de Ensino Médio em Tempo Integral Kairala José Kairala</strong>, localizada em Brasiléia, Acre.</p>
          <p className="mt-4">Desenvolvido para aproximar a escola da comunidade escolar, o portal reúne informações sobre turmas, clubes de protagonismo, eventos, equipe, tutorias e muito mais.</p>
          <p className="mt-4">Nossa missão é oferecer uma educação de qualidade, formando jovens protagonistas com projeto de vida sólido e preparação para o futuro.</p>
          <p className="mt-4 text-sm text-muted-foreground">Desenvolvido por <strong>Kaelvora Studios</strong> em parceria com a escola.</p>
        </>
      ),
    },
    privacidade: {
      title: "Política de Privacidade",
      body: (
        <>
          <p>A Escola Kairala José Kairala valoriza e respeita a privacidade dos seus usuários.</p>
          <h3 className="mt-5 font-bold">Coleta de Dados</h3>
          <p className="mt-2">Este site não coleta dados pessoais dos visitantes. Nenhuma informação é armazenada, vendida ou compartilhada com terceiros.</p>
          <h3 className="mt-5 font-bold">Conteúdo</h3>
          <p className="mt-2">Todo o conteúdo publicado neste portal é de caráter institucional e informativo, relacionado às atividades e eventos da escola.</p>
          <h3 className="mt-5 font-bold">Cookies</h3>
          <p className="mt-2">Este site pode usar cookies técnicos essenciais para o funcionamento correto das páginas, sem fins de rastreamento.</p>
          <h3 className="mt-5 font-bold">Contato</h3>
          <p className="mt-2">Em caso de dúvidas, entre em contato através da página de contato do site.</p>
        </>
      ),
    },
    termos: {
      title: "Termos de Uso",
      body: (
        <>
          <p>Ao acessar e utilizar este portal, você concorda com os seguintes termos e condições de uso.</p>
          <h3 className="mt-5 font-bold">Uso do Conteúdo</h3>
          <p className="mt-2">Todo o conteúdo deste site — textos, imagens e materiais multimídia — é de propriedade da Escola Kairala José Kairala. É vedada a reprodução sem autorização expressa.</p>
          <h3 className="mt-5 font-bold">Responsabilidade</h3>
          <p className="mt-2">A escola se reserva o direito de atualizar informações a qualquer momento. Não nos responsabilizamos por eventuais erros ou omissões no conteúdo publicado.</p>
          <h3 className="mt-5 font-bold">Conduta</h3>
          <p className="mt-2">O uso indevido deste portal, incluindo tentativas de acesso não autorizado ou distribuição de conteúdo prejudicial, está sujeito às sanções cabíveis.</p>
          <p className="mt-5 text-sm text-muted-foreground">Última atualização: {new Date().getFullYear()}.</p>
        </>
      ),
    },
  }[type];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
      onClick={handleClose}
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-250"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl transition-all duration-250"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">{content.title}</h2>
          <button
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-white"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-5 max-h-[60vh] overflow-y-auto text-sm leading-relaxed text-muted-foreground pr-2">
          {content.body}
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const [modal, setModal] = useState<ModalType>(null);
  return (
    <>
      <FooterModal type={modal} onClose={() => setModal(null)} />
      <footer className="relative mt-20 overflow-hidden bg-[var(--primary-deep)] text-primary-foreground border-t-[3px] border-accent">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[80px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/10 blur-[60px]" />

        <div className="container-x relative z-10 py-10">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end lg:grid-cols-[1.2fr_auto_auto]">

            <div className="max-w-xs">
              <Logo size={140} white />
              <p className="mt-5 text-sm leading-relaxed text-white/60">
                Há mais de {getSchoolAge()} anos formando jovens com ensino de
                excelência, protagonismo e vivência escolar em tempo integral.
              </p>
            </div>

            <div className="hidden lg:block w-px self-stretch bg-white/10" />

            <div className="flex flex-col gap-8 sm:flex-row sm:gap-12 md:gap-10">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">Contato</h4>
                <ul className="space-y-4 text-sm text-white/70">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white/90">Endereço</div>
                      <div className="mt-0.5 leading-snug">R. Kairala José Kairala, 340<br />Brasiléia - AC, 69932-000</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Clock size={14} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white/90">Funcionamento</div>
                      <div className="mt-0.5">Segunda a Sexta • 7h às 15h</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/50">Redes Sociais</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/kairalaoficial"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#E1306C] hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram size={17} className="text-white" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1JCU92B6Hd/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#1877F2] hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook size={17} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 bg-black/20">
          <div className="container-x flex flex-col items-center gap-3 py-5 text-xs text-white/40 sm:flex-row sm:justify-between">
            <div>© {new Date().getFullYear()} Escola Kairala José Kairala. Todos os direitos reservados.</div>
            <nav className="flex flex-wrap items-center justify-center gap-4 text-[13px] font-medium text-white/60">
              <button onClick={() => setModal("sobre")} className="transition-colors hover:text-white">Sobre</button>
              <button onClick={() => setModal("privacidade")} className="transition-colors hover:text-white">Privacidade</button>
              <button onClick={() => setModal("termos")} className="transition-colors hover:text-white">Termos</button>
              <Link to="/contato" className="transition-colors hover:text-white">Contato</Link>
            </nav>
            <div className="text-white/40">
              Desenvolvido por <span className="font-semibold text-white/60">Kaelvora Studios</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="animate-[page-enter_0.35s_cubic-bezier(0.25,0.8,0.25,1)_both]">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-soft)" }}
      />
      <div
        className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
      />
      <div className="container-x py-14 md:py-24">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {eyebrow}
          </div>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function LayoutRoot() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}
