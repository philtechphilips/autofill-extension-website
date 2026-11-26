import SiteShell from "@/components/site/SiteShell";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = {
    title: "Privacy Policy | AutoFill AI",
    description: "Privacy policy for AutoFill AI.",
};

export default function PrivacyPolicy() {
    return (
        <SiteShell>
            <Navbar />
            <main className="mx-auto max-w-[760px] px-5 pb-28 pt-36 sm:px-8 md:pt-48">
                <h1 className="mb-8 font-serif-display text-[48px] leading-[1.02] text-ink md:text-[72px]">
                    Privacy Policy
                </h1>
                <div className="space-y-12 border-t border-line pt-10 text-[16px] leading-[1.75] text-ink-soft">
                    <section>
                        <p className="mb-4">
                            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                        <p>
                            At AutoFill AI, we prioritize your privacy as a first principle.
                            Since our core function involves processing precise and sensitive form data,
                            we have built our architecture to ensure you maintain total control over your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-[22px] tracking-[-0.02em] text-ink">
                            1. Information We Collect
                        </h2>
                        <p className="mb-4">
                            Our extension leverages Local-First Encryption. The data you provide for filling forms—such as contact details,
                            address, and resume information—is stored locally on your device. AutoFill AI does not transmit this primary data to our servers unless you explicitly opt-in to Encrypted Cloud Sync.
                        </p>
                        <p>
                            If you opt-in to Cloud Sync, your data is encrypted with AES-256 before leaving your device via a zero-knowledge architecture. We cannot read, analyze, or sell your form data.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-[22px] tracking-[-0.02em] text-ink">
                            2. How We Use Your Information
                        </h2>
                        <ul className="list-disc space-y-2 pl-5 marker:text-ink-mute">
                            <li>To provide the core functionality of automating form filling.</li>
                            <li>To sync your profiles securely across multiple devices (when enabled).</li>
                            <li>To improve our AI algorithms. (Only entirely anonymized, opt-in telemetry metadata is used to calculate success rates; personal identifiable data is never shared).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-[22px] tracking-[-0.02em] text-ink">
                            3. Data Security
                        </h2>
                        <p>
                            Security is not an afterthought; it is our foundation. We employ enterprise-grade security protocols,
                            including AES-256 local encryption, and maintain a high-frequency audit schedule on every release.
                            Even if our cloud infrastructure were compromised, user sync data would remain mathematically inaccessible.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-[22px] tracking-[-0.02em] text-ink">
                            4. Changes to This Policy
                        </h2>
                        <p>
                            We may update our Privacy Policy periodically. We will notify you of any structural changes by posting the new
                            Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. We recommend reviewing this policy periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-[22px] tracking-[-0.02em] text-ink">
                            5. Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact our security team at hello@autofillai.com.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </SiteShell>
    );
}
