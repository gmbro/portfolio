const heroLogoBaseUrl = `${import.meta.env.BASE_URL}logos/partners`;

export interface HeroLogo {
  id: string;
  alt: string;
  src: string;
  width: number;
  height: number;
}

export const portfolioExperienceLogos: HeroLogo[] = [
  {
    id: "nipa",
    alt: "정보통신산업진흥원(NIPA) 로고",
    src: `${heroLogoBaseUrl}/nipa.webp`,
    width: 291,
    height: 160,
  },
  {
    id: "neo",
    alt: "네오사피엔스 로고",
    src: `${heroLogoBaseUrl}/neo.webp`,
    width: 558,
    height: 118,
  },
  {
    id: "lg",
    alt: "LG유플러스 로고",
    src: `${heroLogoBaseUrl}/lg.webp`,
    width: 640,
    height: 148,
  },
  {
    id: "kisa",
    alt: "한국인터넷진흥원(KISA) 로고",
    src: `${heroLogoBaseUrl}/kisa.webp`,
    width: 570,
    height: 126,
  },
  {
    id: "busan",
    alt: "부산광역시 로고",
    src: `${heroLogoBaseUrl}/busan.webp`,
    width: 562,
    height: 160,
  },
  {
    id: "syrup",
    alt: "Syrup Wallet 로고",
    src: `${heroLogoBaseUrl}/syrup.webp`,
    width: 293,
    height: 160,
  },
  {
    id: "nhn",
    alt: "NHN Cloud 로고",
    src: `${heroLogoBaseUrl}/nhn.webp`,
    width: 640,
    height: 104,
  },
  {
    id: "fixness",
    alt: "Fixness 로고",
    src: `${heroLogoBaseUrl}/fixness.webp`,
    width: 640,
    height: 151,
  },
];
