"use client";

import {
  Briefcase,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  House,
  Layers,
  Mail,
  Plane,
  ShieldCheck,
  ShoppingBag,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import Marquee from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";

type Item = { icon: LucideIcon; label: string };

const rowOne: Item[] = [
  { icon: Briefcase, label: "Job applications" },
  { icon: UserPlus, label: "Sign-up forms" },
  { icon: ShoppingBag, label: "Checkout pages" },
  { icon: House, label: "Rental applications" },
  { icon: Plane, label: "Travel & visa forms" },
  { icon: GraduationCap, label: "Scholarship portals" },
];

const rowTwo: Item[] = [
  { icon: CalendarCheck, label: "Event registrations" },
  { icon: ClipboardList, label: "Surveys" },
  { icon: ShieldCheck, label: "Insurance quotes" },
  { icon: Layers, label: "Multi-step wizards" },
  { icon: Mail, label: "Contact forms" },
  { icon: Briefcase, label: "Company portals" },
];

const tones = ["bg-tile-3", "bg-tile-2", "bg-tile-warm-soft", "bg-tile-1"];

function Chip({ icon: Icon, label, tone }: Item & { tone: string }) {
  return (
    <span
      className={`inline-flex items-center gap-3 rounded-xl py-2 pl-2 pr-5 text-[15.5px] text-ink ${tone}`}
    >
      <span className="grid size-9 place-items-center rounded-lg bg-white">
        <Icon className="size-[18px]" strokeWidth={1.5} />
      </span>
      {label}
    </span>
  );
}

/** Two gently drifting rows of the kinds of forms AutoFill handles. */
export default function FormTypes() {
  return (
    <section className="pt-16 md:pt-24">
      <Reveal>
        <p className="mb-8 text-center text-[17px] text-ink">Built for the forms you fill every week</p>
      </Reveal>
      <div className="space-y-3">
        <Marquee duration={60}>
          {rowOne.map((item, i) => (
            <Chip key={item.label} {...item} tone={tones[i % tones.length]} />
          ))}
        </Marquee>
        <Marquee duration={70} reverse>
          {rowTwo.map((item, i) => (
            <Chip key={item.label} {...item} tone={tones[(i + 2) % tones.length]} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
