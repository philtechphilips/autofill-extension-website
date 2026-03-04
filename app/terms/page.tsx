import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata = {
    title: "Terms of Service | AutoFill AI",
    description: "Terms of Service for AutoFill AI.",
};

export default function TermsOfService() {
    return (
        <main className="relative w-full overflow-hidden min-h-screen">
            <Navbar />
            <div className="pt-40 pb-32 px-6 max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-8">
                    Terms of Service
                </h1>
                <div className="space-y-8 text-black/70 dark:text-white/90 font-light leading-relaxed">
                    <section>
                        <p className="mb-4">
                            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                        <p>
                            Welcome to AutoFill AI. By accessing our extension or website, you agree to be bound by these Terms of Service
                            and to use our tools responsibly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing and using AutoFill AI ("the Service"), you agree to comply with and be bound by the following Terms of Service.
                            If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight mb-4">
                            2. Description of Service
                        </h2>
                        <p>
                            AutoFill AI is a precision-driven form automation tool designed to accelerate data entry for professionals
                            via AI interpretation of web forms. We maintain the right to modify, suspend, or discontinue the Service at
                            any time with or without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight mb-4">
                            3. User Conduct and Responsibilities
                        </h2>
                        <p className="mb-4">As a user of our Service, you agree to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide accurate information when using basic form capabilities if required by the target platform.</li>
                            <li>Not use the Service for any illicit, fraudulent, or malicious activities (e.g., spamming, credential stuffing, scraping).</li>
                            <li>Maintain the security and confidentiality of any credentials associated with your AutoFill AI account/sync.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight mb-4">
                            4. Credit and Payment Terms
                        </h2>
                        <p>
                            AutoFill AI utilizes a credit-based pricing model. All credit purchases are generally non-refundable unless
                            mandated by local consumer protection laws. Unused credits assigned to an active account remain valid indefinitely
                            unless specifically associated with a temporary trial tier.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight mb-4">
                            5. Intellectual Property
                        </h2>
                        <p>
                            All branding, code, design, features, and intellectual property associated with AutoFill AI belongs entirely to AutoFill Labs Inc.
                            You may not reverse-engineer, decompile, or replicate the extension architecture.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight mb-4">
                            6. Limitation of Liability
                        </h2>
                        <p>
                            AutoFill AI fundamentally automates inputs based on user-provided templates. We are not liable for any consequences
                            arising from incorrect data submission, rejected applications, or account penalties on third-party platforms resulting
                            from the use of this tool. Use the "Safe Undo" features and confirm your inputs manually when necessary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight mb-4">
                            7. Contact Information
                        </h2>
                        <p>
                            For legal inquiries regarding these Terms of Service, please contact hello@autofillai.com.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
