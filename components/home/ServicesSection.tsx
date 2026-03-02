import Image from "next/image";
import { ServicesBadge } from "./ServicesBadge";

const services = [
  {
    title: "Outstanding Standing solutions",
    description:
      "Expertise in staff augmentation, dedicated teams, EOR (Employer of Record), and PEO (Professional Employer Organization) models.",
    icon: "/images/services/laptop.png",
    iconWidth: 97,
    iconHeight: 95,
  },
  {
    title: "Custom Solutions for Unique Needs",
    description:
      "Bespoke IT and software solutions designed to address specific challenges and goals. Emphasis on scalability, innovation, and alignment with business strategies.",
    icon: "/images/services/bars-chart.png",
    iconWidth: 156,
    iconHeight: 173,
  },
  {
    title: "Software Testing Services",
    description:
      "Comprehensive QA and testing services to ensure robust, high-performance, and error-free software. Specialized in manual, automated, and performance testing for diverse industries.",
    icon: "/images/services/building.png",
    iconWidth: 87,
    iconHeight: 95,
  },
  {
    title: "Cost Efficiency",
    description:
      "Save on recruitment and operational costs without compromising on quality.",
    icon: "/images/services/terminal.png",
    iconWidth: 72,
    iconHeight: 71,
  },
];

const borderRadiusValue = "36px";

const conicBorder: React.CSSProperties = {
  borderRadius: borderRadiusValue,
  background:
    "conic-gradient(from 179.78deg at 50% 50%, rgba(255,255,255,0.07) -54.98deg, #397D4F 52.13deg, rgba(255,255,255,0.04) 125.06deg, #FFFFFF 235.09deg, rgba(255,255,255,0.07) 305.02deg, #397D4F 412.13deg)",
};

const bentoCardStyle: React.CSSProperties = {
  borderRadius: borderRadiusValue,
  background: "rgba(6, 10, 6, 1)",
  boxShadow: "0px 16px 64px 0px rgba(57,125,79,0.5)",
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: "clamp(14px, 1.1vw, 18px)",
  lineHeight: "1.4em",
  color: "white",
};

const cardBodyStyle: React.CSSProperties = {
  fontSize: "clamp(12px, 0.9vw, 14px)",
  lineHeight: "1.6em",
  color: "rgba(255,255,255,0.6)",
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}

function ServiceCard({ title, description, icon, iconWidth, iconHeight }: ServiceCardProps) {
  return (
    <div className="p-[1px] h-full" style={conicBorder}>
      <div
        className="relative flex flex-col p-8 h-full"
        style={{ ...bentoCardStyle, minHeight: "280px" }}
      >
        <Image
          src={icon}
          alt=""
          width={iconWidth}
          height={iconHeight}
          className="mb-auto"
          style={{ width: "80px", height: "auto" }}
        />
        <div className="mt-6">
          <h3 className="mb-2" style={cardTitleStyle}>
            {title}
          </h3>
          <p style={cardBodyStyle}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(40px, 5vw, 80px)",
        paddingBottom: "clamp(40px, 5vw, 80px)",
        background: "transparent",
      }}
    >
      <div
        className="relative z-10 mx-auto px-4 sm:px-6"
        style={{ maxWidth: "min(1200px, 96vw)" }}
      >
        {/* Header: badge → title → subtitle (top-to-bottom) */}
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 3.2vw, 50px)",
            lineHeight: "1.3em",
            letterSpacing: "-0.0506em",
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 12%, rgba(37,93,0,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          What are we offering?
        </h2>

        <p
          className="text-center text-white mx-auto"
          style={{
            marginBottom: "clamp(32px, 5vw, 64px)",
            maxWidth: "min(780px, 96vw)",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.1vw, 20px)",
            lineHeight: "1.6em",
            letterSpacing: "-0.01em",
          }}
        >
          At Globonexo, we deliver IT services designed to improve performance,
          reliability, and scalability. Our consultants collaborate closely with
          clients to integrate AI where it creates measurable business impact.
        </p>

        {/* Bento grid — Row 1: [~32% laptop] [~59% bars chart] */}
        <div className="flex gap-6 mb-6">
          <div style={{ flex: "32 0 0%" }}>
            <ServiceCard {...services[0]} />
          </div>
          <div style={{ flex: "59 0 0%" }}>
            <ServiceCard {...services[1]} />
          </div>
        </div>

        {/* Bento grid — Row 2: [~65% building] [~32% terminal] */}
        <div className="flex gap-6">
          <div style={{ flex: "65 0 0%" }}>
            <ServiceCard {...services[2]} />
          </div>
          <div style={{ flex: "32 0 0%" }}>
            <ServiceCard {...services[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
