import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { P, SITE_MAX, SITE_PX } from '../design/tokens';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[rgba(0,0,0,0.08)] py-10 last:border-b-0">
      <h2 className="mb-5 text-xl font-bold tracking-tight text-[#0a0a0a]">{title}</h2>
      <div className="space-y-4 text-[15px] leading-7 text-[#6e6e73]">{children}</div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[15px] font-semibold text-[#0a0a0a]">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-inside list-disc space-y-1.5 pl-0">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function EmailLink() {
  return (
    <a
      href="mailto:support@memryloop.com"
      className="font-semibold transition-opacity hover:opacity-75"
      style={{ color: P }}
    >
      support@memryloop.com
    </a>
  );
}

export function PrivacyPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Privacy Policy — MemryLoop';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className={`${SITE_MAX} mx-auto ${SITE_PX} py-16 md:py-20`}>
        <div className="mx-auto max-w-[720px]">
          <p className="mb-3 text-sm font-medium text-[#6e6e73]">Last Updated: June 2026</p>
          <h1 className="mb-4 text-[40px] font-bold leading-[1.1] tracking-tight text-[#0a0a0a] md:text-[44px]">
            Privacy Policy
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-[#6e6e73]">
            How MemryLoop collects, uses, and protects your information.
          </p>

          <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] px-8 py-2 md:px-10">
            <Section title="Introduction">
              <p>
                MemryLoop (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
                privacy. This Privacy Policy explains what information we collect, how we use it, and
                your rights regarding your data when using the MemryLoop Chrome Extension and related
                services.
              </p>
              <p>By using MemryLoop, you agree to the practices described in this Privacy Policy.</p>
            </Section>

            <Section title="Information We Collect">
              <Subsection title="Account Information">
                <p>When you create an account, we may collect:</p>
                <BulletList
                  items={['Email address', 'Account identifier', 'Subscription status']}
                />
              </Subsection>

              <Subsection title="Usage Information">
                <p>When you use MemryLoop, we may collect:</p>
                <BulletList
                  items={[
                    'Video URLs and video metadata necessary to generate AI Notes',
                    'AI-generated notes and summaries',
                    'Library content saved by you',
                    'Feature usage statistics',
                    'Error logs and diagnostic information',
                  ]}
                />
              </Subsection>

              <Subsection title="Payment Information">
                <p>Payments are processed by PayPal.</p>
                <p>We do not store:</p>
                <BulletList
                  items={[
                    'Credit card numbers',
                    'Bank account information',
                    'PayPal passwords',
                  ]}
                />
                <p>
                  Payment information is handled directly by PayPal according to its own privacy
                  policy.
                </p>
              </Subsection>
            </Section>

            <Section title="How We Use Information">
              <p>We use collected information to:</p>
              <BulletList
                items={[
                  'Generate AI Notes',
                  'Save notes to your Library',
                  'Provide subscription features',
                  'Improve service quality',
                  'Monitor performance and reliability',
                  'Prevent abuse and fraud',
                  'Provide customer support',
                ]}
              />
            </Section>

            <Section title="AI Processing">
              <p>
                To generate AI Notes, portions of video transcripts and related content may be sent to
                third-party AI service providers.
              </p>
              <p>
                These providers process data solely for the purpose of generating requested outputs.
              </p>
            </Section>

            <Section title="Data Storage">
              <p>We store user data on secure cloud infrastructure.</p>
              <p>Stored data may include:</p>
              <BulletList
                items={[
                  'Account information',
                  'Saved Library notes',
                  'AI-generated content',
                  'Subscription status',
                ]}
              />
              <p>
                We retain data only as long as necessary to provide the service or comply with legal
                obligations.
              </p>
            </Section>

            <Section title="Data Sharing">
              <p>We do not sell personal information.</p>
              <p>
                We may share limited information with trusted service providers that help us operate
                MemryLoop, including:
              </p>
              <BulletList
                items={[
                  'AI providers',
                  'Cloud hosting providers',
                  'Authentication providers',
                  'Payment providers',
                ]}
              />
              <p>
                These providers are only given access to information necessary to perform their
                services.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>You may:</p>
              <BulletList
                items={[
                  'Access your account information',
                  'Request correction of inaccurate information',
                  'Request deletion of your account and associated data',
                  'Contact us regarding privacy concerns',
                ]}
              />
              <p>
                To exercise these rights, contact: <EmailLink />
              </p>
            </Section>

            <Section title="Security">
              <p>
                We implement reasonable technical and organizational measures to protect user
                information.
              </p>
              <p>
                However, no internet transmission or storage system can be guaranteed to be completely
                secure.
              </p>
            </Section>

            <Section title="Children's Privacy">
              <p>MemryLoop is not intended for children under the age of 13.</p>
              <p>We do not knowingly collect personal information from children.</p>
            </Section>

            <Section title="Changes to This Policy">
              <p>We may update this Privacy Policy from time to time.</p>
              <p>
                Updated versions will be posted on our website with a revised effective date.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                If you have questions about this Privacy Policy, please contact: <EmailLink />
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
