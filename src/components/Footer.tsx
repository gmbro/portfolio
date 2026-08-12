import { profile } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 pb-32 pt-8 md:px-16">
      <div className="mx-auto max-w-7xl font-body text-xs text-white/50">
        © 2026 {profile.name}
      </div>
    </footer>
  );
};

export default Footer;
