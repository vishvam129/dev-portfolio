import { useEffect } from "react";
import { Masthead } from "@/components/backend/Masthead";
import { StatusBoard } from "@/components/backend/StatusBoard";
import { Topology } from "@/components/backend/Topology";
import { Trace } from "@/components/backend/Trace";
import { ApiPlayground } from "@/components/backend/ApiPlayground";
import { Stack, Contact, BackendFooter } from "@/components/backend/StackContact";

export default function BackendPage() {
  useEffect(() => { document.title = "Vishvam Patel — Backend Engineer · control plane"; window.scrollTo(0, 0); }, []);
  return (
    <main data-skin="backend" className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)", fontFamily: "var(--f-body)" }}>
      <Masthead />
      <StatusBoard />
      <Topology />
      <Trace />
      <ApiPlayground />
      <Stack />
      <Contact />
      <BackendFooter />
    </main>
  );
}
