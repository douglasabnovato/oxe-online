/* Vagas de exemplo do layout (conteúdo do Figma original; empresas reais, vagas ilustrativas) */
import BusinessNiantic from "../components/static/images/business-niantic.png";
import BusinessInstacart from "../components/static/images/business-instacart.png";
import BusinessTwitch from "../components/static/images/business-twitch.png";
import InvestorAircnc from "../components/static/images/investor-aircnc.png";
import InvestorStripe from "../components/static/images/investor-stripe.png";
import InvestorYelp from "../components/static/images/investor-yelp.png";

/* city: cidade da vaga; remote: aceita trabalho remoto (filtro "Aceita remoto") */
export type Job = { id: string; title: string; posted: string; city: string; remote: boolean };
export type Company = {
  id: string;
  name: string;
  tagline: string;
  size: string;
  logo: string;
  investor: { name: string; logo: string };
  careersUrl: string;
  jobs: Job[];
};

export const companies: Company[] = [
  {
    id: "niantic",
    name: "Niantic",
    tagline: "Building technologies and ideas that move us as the leaders in Augmented Reality",
    size: "501–1000 funcionários",
    logo: BusinessNiantic,
    investor: { name: "Aircnc", logo: InvestorAircnc },
    careersUrl: "https://nianticlabs.com/careers",
    jobs: [
      { id: "n1", title: "Senior Game Designer - Pokemon Go San Francisco", posted: "hoje", city: "San Francisco", remote: false },
      { id: "n2", title: "Software Engineer - Web/Fullstack San Francisco", posted: "há 4 semanas", city: "San Francisco", remote: false },
      { id: "n3", title: "Software Engineer - Server/Backend Seattle", posted: "há 1 mês", city: "Seattle", remote: false },
    ],
  },
  {
    id: "instacart",
    name: "Instacart",
    tagline: "Our mission is to create a world where everyone has access to the food they love and more",
    size: "1001–5000 funcionários",
    logo: BusinessInstacart,
    investor: { name: "Stripe", logo: InvestorStripe },
    careersUrl: "https://instacart.careers",
    jobs: [
      { id: "i1", title: "Senior Software Engineer - San Francisco - $130k – $170k • 0.003% – 0.027%", posted: "hoje", city: "San Francisco", remote: false },
      { id: "i2", title: "Senior Android Engineer - San Francisco - $130k – $170k • 0.003% – 0.027%", posted: "há 4 semanas", city: "San Francisco", remote: false },
      { id: "i3", title: "Senior iOS Engineer - San Francisco - $130k – $170k • 0.003% – 0.027%", posted: "há 1 mês", city: "San Francisco", remote: false },
    ],
  },
  {
    id: "twitch",
    name: "Twitch",
    tagline: "Come together live every day to chat, interact, and make entertainment together",
    size: "1001–5000 funcionários",
    logo: BusinessTwitch,
    investor: { name: "Yelp", logo: InvestorYelp },
    careersUrl: "https://www.twitch.tv/jobs",
    jobs: [
      { id: "t1", title: "Software Architect Subs - Seattle • San Francisco / Remote possible - $240k – $320k • 0.0% – 0.001%", posted: "hoje", city: "Seattle • San Francisco", remote: true },
      { id: "t2", title: "Applied Scientist Lead - Twitch Commerce - Seattle • San Francisco • Remote possible - $240k – $320k", posted: "há 4 semanas", city: "Seattle • San Francisco", remote: true },
    ],
  },
];
/* Fim de jobs.ts */
