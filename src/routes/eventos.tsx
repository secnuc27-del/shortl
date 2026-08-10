import { createFileRoute } from "@tanstack/react-router";
import { Page, PageHero } from "@/components/Layout";
import { Wrench } from "lucide-react";

export const Route = createFileRoute("/eventos")({
  component: Eventos,
});

function Eventos() {
  return (
    <Page>
      <PageHero
        eyebrow="Agenda viva"
        title={<>Uma escola que <span className="gradient-text">acontece</span>.</>}
        subtitle="A Kairala realiza eventos durante todo o ano — momentos que celebram aprendizagem, cultura e comunidade."
      />

      <section className="section-y">
        <div className="container-x flex flex-col items-center justify-center py-20 text-center gap-6">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full"
            style={{ background: "var(--gradient-brand)" }}
          >
            <Wrench size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black md:text-4xl">Em desenvolvimento</h2>
          <p className="max-w-md text-muted-foreground text-lg">
            Esta página está sendo preparada. Em breve você encontrará aqui todos os eventos e a agenda completa da escola.
          </p>
        </div>
      </section>
    </Page>
  );
}
