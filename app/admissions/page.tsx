import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { CheckCircle, Phone, Mail, MapPin } from "lucide-react";

export const metadata = { title: "Admissions – PCPS College" };

const steps = [
  { n: "01", title: "Choose Your Programme", desc: "Browse our four UK-accredited programmes and select the one that aligns with your career goals." },
  { n: "02", title: "Submit Application", desc: "Fill out the online application form at apply.patancollege.edu.np with your academic documents." },
  { n: "03", title: "Entrance Assessment", desc: "Attend a brief aptitude assessment and interview with our admissions team." },
  { n: "04", title: "Receive Offer Letter", desc: "Successful applicants receive a formal offer letter within 5 working days." },
  { n: "05", title: "Complete Enrolment", desc: "Pay the registration fee, submit final documents, and secure your place." },
  { n: "06", title: "Begin Your Journey", desc: "Attend orientation week and start your UK degree education at PCPS College." },
];

const requirements = [
  "SEE / SLC Certificate with minimum GPA 2.0",
  "+2 / A-Level / Equivalent (Grade 10+2)",
  "English proficiency (IELTS 5.5 equivalent or college test)",
  "Passport-sized photographs (4 copies)",
  "Copy of citizenship / passport",
  "Character certificate from previous institution",
];

export default function AdmissionsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white py-24 px-5 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Admissions</p>
          <h1 className="text-5xl font-black mb-5">Start Your UK Degree Journey</h1>
          <p className="text-white/60 text-lg mb-8">Applications are open for January and September intake. Limited seats available.</p>
          <Button href="https://apply.patancollege.edu.np" external size="lg">Apply Online Now</Button>
        </div>
      </div>

      {/* Steps */}
      <div className="mx-auto max-w-5xl px-5 py-20">
        <SectionHeader eyebrow="Admission Process" title="How to Apply" center />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border border-gray-200 rounded-2xl p-6">
              <div className="text-3xl font-black text-red-100 mb-3">{s.n}</div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-gray-50 py-20 px-5">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="Requirements" title="What You Need to Apply" />
          <ul className="space-y-3">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 text-gray-700">
                <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact */}
      <div className="mx-auto max-w-5xl px-5 py-20">
        <SectionHeader eyebrow="Contact" title="Get in Touch" center />
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            { icon: <Phone size={22}/>, label: "Phone", value: "+977 9801102235", href: "tel:+9779801102235" },
            { icon: <Mail size={22}/>, label: "Email", value: "info@patancollege.edu.np", href: "mailto:info@patancollege.edu.np" },
            { icon: <MapPin size={22}/>, label: "Location", value: "Kandevatashan, Lalitpur, Nepal", href: "https://maps.app.goo.gl/vF9zxmb8cZT41HTS6" },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">{icon}</div>
              <div className="font-bold text-gray-900">{label}</div>
              <div className="text-sm text-gray-500">{value}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
