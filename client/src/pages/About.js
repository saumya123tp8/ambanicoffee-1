import React from "react";
import Layout from "./../components/Layout/Layout";

const pillars = [
  { icon: "🌱", title: "Sourced with purpose", body: "We partner directly with farmers across Ethiopia, Colombia, and Sumatra — ensuring fair trade, traceability, and exceptional flavour in every batch." },
  { icon: "🔥", title: "Crafted with precision", body: "Our baristas are trained artisans. Each espresso, pour-over, and cold brew follows a meticulous process — because every cup deserves to be remarkable." },
  { icon: "🤝", title: "Built for community", body: "We host live music nights, art showcases, and open-mic events. This space belongs to the neighbourhood as much as it belongs to us." },
  { icon: "🍃", title: "Rooted in sustainability", body: "Compostable packaging, zero food-waste partnerships, and energy-conscious roasting — a great cafe should leave the planet better than it found it." },
];

const team = [
  { initials: "A", name: "Arjun Mehta", role: "Head Roaster" },
  { initials: "P", name: "Priya Sharma", role: "Lead Barista" },
  { initials: "R", name: "Rohan Gupta", role: "Pastry Chef" },
];
const stores = [
  {
    id: "01", name: "Connaught Place", area: "Central Delhi",
    address: "12, Block A, Connaught Place, New Delhi – 110001",
    hours: "Mon – Sun, 7:00 am – 10:00 pm",
    phone: "+91 11 4567 8901",
    status: "open",
    tags: ["Dine-in", "Takeaway", "Events"],
  },
  {
    id: "02", name: "Hauz Khas Village", area: "South Delhi",
    address: "5, Hauz Khas Village, New Delhi – 110016",
    hours: "Mon – Sun, 8:00 am – 11:00 pm",
    phone: "+91 11 4567 8902",
    status: "open",
    tags: ["Dine-in", "Rooftop", "Live music"],
  },
  {
    id: "03", name: "Cyber Hub", area: "Gurugram",
    address: "Cyber Hub, DLF Cyber City, Gurugram – 122002",
    hours: "Mon – Fri 7:30 am – 9:30 pm · Sat–Sun 8 am – 10 pm",
    phone: "+91 124 4567 8903",
    status: "open",
    tags: ["Dine-in", "Drive-through", "Delivery"],
  },
  {
    id: "04", name: "Indiranagar", area: "Bengaluru",
    address: "100 Feet Road, Indiranagar, Bengaluru – 560038",
    hours: "Mon – Sun, 7:00 am – 10:30 pm",
    phone: "+91 80 4567 8904",
    status: "open",
    tags: ["Dine-in", "Takeaway", "Art gallery"],
  },
];

const statusConfig = {
  open:   { dot: "#5DCAA5", label: "Open",        labelColor: "#5DCAA5" },
  closed: { dot: "#F09595", label: "Closed",      labelColor: "#F09595" },
  soon:   { dot: "#EF9F27", label: "Coming soon", labelColor: "#EF9F27" },
};


const About = () => {
  return (
    <Layout title="About Us – Our Cafe">

      {/* Hero */}
      <div className="about-hero">
        <div>
          <p className="eyebrow">Est. 2018 · Specialty Coffee</p>
          <h1>Where every cup tells a <em>story</em></h1>
          <p style={{ color: "#b0a090", lineHeight: 1.7, fontWeight: 300 }}>
            A warm corner of the world where great coffee meets even better company.
            Sourced with care, brewed with precision.
          </p>
        </div>
        <img src="/images/abt.jpeg" alt="Our cafe" style={{ width: "100%", borderRadius: 4, aspectRatio: "4/3", objectFit: "cover" }} />
      </div>

      {/* Stats */}
      <div className="about-stats">
        {[["12+", "Origins sourced"], ["6yrs", "Of craft"], ["500+", "Cups daily"]].map(([n, l]) => (
          <div className="stat" key={l}>
            <div className="stat-num">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "48px" }}>

        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#c9a96e", fontWeight: 500, marginBottom: 24 }}>
          What we stand for
        </p>

        <div className="pillars-grid">
          {pillars.map(p => (
            <div className="pillar-card" key={p.title}>
              <div className="icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#c9a96e", fontWeight: 500, margin: "40px 0 20px" }}>
          Meet the team
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {team.map(t => (
            <div key={t.name} style={{ background: "#fafafa", border: "0.5px solid #e5e5e5", borderRadius: 12, padding: 20, textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2e1f14", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: "#c9a96e", fontFamily: "'Playfair Display', serif", fontSize: 18 }}>{t.initials}</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, margin: "0 0 4px" }}>{t.name}</p>
              <p style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{t.role}</p>
            </div>
          ))}
        </div>
        {/* Stores Section — paste above the CTA strip */}
<p className="section-eyebrow">Our stores</p>

<div className="stores-grid">
  {stores.map((s) => {
    const sc = statusConfig[s.status];
    return (
      <div className="store-card" key={s.id}>
        <div className="store-card-top">
          <div>
            <p className="store-name">{s.name}</p>
            <p className="store-area">{s.area}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <span className="store-number">{s.id}</span>
            <div className="open-dot">
              <div className="dot" style={{ background: sc.dot }} />
              <span style={{ color: sc.labelColor }}>{sc.label}</span>
            </div>
          </div>
        </div>
        <div className="store-card-body">
          <div className="store-detail-row"><i className="ti ti-map-pin" /><span>{s.address}</span></div>
          <div className="store-detail-row"><i className="ti ti-clock" /><span>{s.hours}</span></div>
          <div className="store-detail-row"><i className="ti ti-phone" /><span>{s.phone}</span></div>
        </div>
        <div className="store-card-footer">
          {s.tags.map(t => <span className="store-tag" key={t}>{t}</span>)}
        </div>
      </div>
    );
  })}

  {/* Coming soon placeholder */}
  <div className="coming-soon-card">
    <i className="ti ti-building-store" />
    <p style={{ fontWeight: 500 }}>Coming soon</p>
    <p>Bandra, Mumbai · Opening Q3 2025</p>
  </div>
</div>
        {/* CTA */}
        <div className="about-cta">
          <div>
            <h3>Come visit us today</h3>
            <p>Open daily 7am – 9pm · 12 Connaught Place, New Delhi</p>
          </div>
          <button className="about-cta-btn">Get directions</button>
        </div>

      </div>
    </Layout>
  );
};

export default About;