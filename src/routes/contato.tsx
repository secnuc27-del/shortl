import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { MapPin, Instagram, Facebook, Clock, Send, Map, Camera, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute("/contato")({
  component: Contato,
});

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

const contactSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter ao menos 2 caracteres")
    .max(100, "Nome muito longo (máx. 100 caracteres)")
    .transform(stripHtmlTags),
  email: z
    .string()
    .email("E-mail inválido")
    .max(254, "E-mail muito longo")
    .transform((v) => v.toLowerCase().trim()),
  assunto: z
    .string()
    .max(150, "Assunto muito longo (máx. 150 caracteres)")
    .transform(stripHtmlTags)
    .optional()
    .or(z.literal("")),
  mensagem: z
    .string()
    .min(10, "Mensagem deve ter ao menos 10 caracteres")
    .max(2000, "Mensagem muito longa (máx. 2000 caracteres)")
    .transform(stripHtmlTags),
});

type ContactFormData = z.infer<typeof contactSchema>;

const RATE_LIMIT_KEY = "kjk_contact_last_sent";
const RATE_LIMIT_MS = 60_000;

function checkRateLimit(): { allowed: boolean; remainingMs: number } {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return { allowed: true, remainingMs: 0 };
  const elapsed = Date.now() - parseInt(last, 10);
  if (elapsed >= RATE_LIMIT_MS) return { allowed: true, remainingMs: 0 };
  return { allowed: false, remainingMs: RATE_LIMIT_MS - elapsed };
}

const contactCards = [
  { icon: MapPin, label: "Endereço", value: "R. Kairala José Kairala, 340\nBrasiléia - AC, 69932-000", colorClass: "bg-primary-soft text-primary" },
  { icon: Instagram, label: "Instagram", value: "@kairalaoficial", href: "https://www.instagram.com/kairalaoficial", colorClass: "bg-[#E1306C]/15 text-[#E1306C]" },
  { icon: Facebook, label: "Facebook", value: "Página Oficial", href: "https://www.facebook.com/share/1JCU92B6Hd/", colorClass: "bg-[#1877F2]/15 text-[#1877F2]" },
  { icon: Clock, label: "Funcionamento", value: "Seg a Sexta\n7h às 15h", colorClass: "bg-primary-soft text-primary" },
];

const cardClasses = "card-soft flex flex-col items-center justify-center gap-2 p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group w-[calc(50%-8px)] sm:w-[200px] sm:flex-auto sm:max-w-[260px]";

function Contato() {
  const [sent, setSent] = useState(false);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"street" | "map">("street");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    const { allowed, remainingMs } = checkRateLimit();
    if (!allowed) {
      const secs = Math.ceil(remainingMs / 1000);
      setRateLimitMsg(`Aguarde ${secs}s antes de enviar novamente.`);
      return;
    }
    setRateLimitMsg(null);

    // TODO: integrate with Formspree or EmailJS here
    // Ex: await fetch("https://formspree.io/f/YOUR_ID", { method: "POST", body: JSON.stringify(data) })
    void data;

    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
    setSent(true);
    reset();
  }

  return (
    <Page>
      <PageHero
        eyebrow="Fale com a escola"
        title={<>Estamos prontos para <span className="gradient-text">conversar</span>.</>}
        subtitle="Tire dúvidas, agende uma visita ou deixe sua mensagem."
      />

      <section className="section-y pb-0">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-4">
            {contactCards.map((c) => {
              const inner = (
                <>
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl group-hover:scale-110 transition-transform duration-300 ${c.colorClass}`}>
                    <c.icon size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">{c.label}</div>
                    <div className="mt-1.5 text-sm font-semibold leading-snug text-foreground whitespace-pre-line">{c.value}</div>
                  </div>
                </>
              );

              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className={cardClasses}>{inner}</a>
              ) : (
                <div key={c.label} className={cardClasses}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="card-soft overflow-hidden p-0 border border-border/50 shadow-sm">
            <div className="grid lg:grid-cols-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="p-6 sm:p-8 lg:p-12 bg-card"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-black sm:text-3xl">Envie uma mensagem</h2>
                  <p className="mt-2 text-muted-foreground">Preencha o formulário e responderemos o mais breve possível.</p>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-semibold">Nome <span className="text-red-500">*</span></span>
                      <input
                        {...register("nome")}
                        maxLength={100}
                        autoComplete="name"
                        className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-shadow bg-background/50 ${
                          errors.nome
                            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                            : "border-border focus:border-accent focus:ring-accent/20"
                        }`}
                      />
                      {errors.nome && (
                        <span className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} /> {errors.nome.message}
                        </span>
                      )}
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold">E-mail <span className="text-red-500">*</span></span>
                      <input
                        {...register("email")}
                        type="email"
                        maxLength={254}
                        autoComplete="email"
                        className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-shadow bg-background/50 ${
                          errors.email
                            ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                            : "border-border focus:border-accent focus:ring-accent/20"
                        }`}
                      />
                      {errors.email && (
                        <span className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} /> {errors.email.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-semibold">Assunto</span>
                    <input
                      {...register("assunto")}
                      maxLength={150}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-shadow"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold">Mensagem <span className="text-red-500">*</span></span>
                    <textarea
                      {...register("mensagem")}
                      rows={5}
                      maxLength={2000}
                      className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-shadow bg-background/50 ${
                        errors.mensagem
                          ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                          : "border-border focus:border-accent focus:ring-accent/20"
                      }`}
                    />
                    {errors.mensagem && (
                      <span className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} /> {errors.mensagem.message}
                      </span>
                    )}
                  </label>

                  {rateLimitMsg && (
                    <div className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-700 border border-amber-200 flex items-center gap-2">
                      <AlertCircle size={16} /> {rateLimitMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-accent w-full sm:w-auto mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                  </button>

                  {sent && (
                    <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700 border border-green-200 flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      Obrigado! Recebemos sua mensagem e responderemos em breve.
                    </div>
                  )}
                </div>
              </form>

              <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-full bg-muted">
                <iframe
                  title="Mapa"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={
                    mapView === "street"
                      ? "https://www.google.com/maps/embed?pb=!4v1785270714069!6m8!1m7!1ssyA1bbleVgbCbVuxb08t1A!2m2!1d-11.01243462944847!2d-68.74115804394849!3f138.2634!4f0!5f0.7820865974627469"
                      : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3456809676277!2d-68.74351432511286!3d-11.012669723509617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x917eb735a040590d%3A0x7b908d2cd88657d5!2sR.%20Kairala%20Jos%C3%A9%20Kairala%2C%20340%2C%20Brasil%C3%A9ia%20-%20AC%2C%2069932-000!5e0!3m2!1spt-BR!2sbr!4v1785270278913!5m2!1spt-BR!2sbr"
                  }
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
                <button
                  type="button"
                  onClick={() => setMapView(mapView === "street" ? "map" : "street")}
                  className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-primary shadow-lg hover:bg-white hover:scale-105 transition-all"
                >
                  {mapView === "street" ? (
                    <><Map size={18} /> Ver no Mapa</>
                  ) : (
                    <><Camera size={18} /> Ver Fachada</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
