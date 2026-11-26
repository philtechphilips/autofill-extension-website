"use client";

import { motion } from "framer-motion";
import BrowserCtas from "@/components/site/BrowserCtas";
import { Container } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";
import FillStage from "./FillStage";

const tile = (delay: number) => ({
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 1.1, ease: EASE, delay },
});

export default function Hero() {
  return (
    <section className="pt-[84px] md:pt-[92px]">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[38fr_62fr] lg:gap-5">
          {/* Left column */}
          <div className="flex flex-col gap-4 lg:gap-5">
            <motion.div
              {...tile(0.15)}
              className="flex flex-1 flex-col justify-between gap-10 rounded-2xl bg-tile-1 p-7 sm:p-10"
            >
              <motion.h1
                initial={{ opacity: 0.1, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
                className="font-serif-display text-[50px] leading-[0.98] text-ink sm:text-[64px] lg:text-[54px] xl:text-[66px]"
              >
                Every form,
                <br />
                filled for you.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
                className="max-w-[440px] text-[17px] leading-[1.55] text-ink sm:text-[18px]"
              >
                AutoFill AI reads each field the way you would and fills it with your details.
                Job applications, sign-ups and checkouts, done in one click on Chrome and Edge.
              </motion.p>
            </motion.div>

            <motion.div {...tile(0)}>
              <BrowserCtas layout="stack" />
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            {...tile(0.3)}
            className="flex items-center rounded-2xl bg-tile-2 p-4 sm:p-8 lg:p-10"
          >
            <div className="w-full">
              <FillStage />
            </div>
          </motion.div>
        </div>
      </Container>

    </section>
  );
}
