import { useEffect, type ComponentType } from "react";
import { useParams } from "react-router-dom";
import { Cursor } from "@/components/fx/Cursor";
import { AiSections } from "@/components/ai/sections";
import { VariantSwitcher } from "@/components/VariantSwitcher";
import { HeroMotion } from "@/components/variants/HeroMotion";
import { HeroLoud } from "@/components/variants/HeroLoud";
import { HeroCalm } from "@/components/variants/HeroCalm";
import { HeroPlay } from "@/components/variants/HeroPlay";
import { VARIANT_MAP, type VariantId } from "@/data/variants";

const HEROES = {
  motion: HeroMotion,
  loud: HeroLoud,
  calm: HeroCalm,
  play: HeroPlay,
} satisfies Record<VariantId, ComponentType>;

export default function VariantPage() {
  const { variant } = useParams();
  const id = (variant && variant in VARIANT_MAP ? variant : "motion") as VariantId;
  const Hero = HEROES[id];

  useEffect(() => { document.title = `Vishvam Patel — AI Engineer · ${VARIANT_MAP[id].name}`; window.scrollTo(0, 0); }, [id]);

  return (
    <main data-variant={id} className="min-h-screen pb-28" style={{ background: "var(--bg)" }}>
      {id === "motion" && <Cursor />}
      <Hero />
      <AiSections />
      <VariantSwitcher current={id} />
    </main>
  );
}
