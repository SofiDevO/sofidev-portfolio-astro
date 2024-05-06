 const portafolioData = [
  {
    imgSrc: "../img/portfolio_img/aluraFlix.webp",
    titulo: "Alura Flix",
    skills: ["React", "StyledComponents"],
    descripcion:
      "Final project for the One Oracle Next Education Program. Educational programming video website demonstrating CRUD requests.",
    demoURL: "https://alura-flix-self.vercel.app/",
    repoURL: "https://github.com/SofiDevO/alura-flix",
    anim:"fade-right"
  },
  {
    imgSrc: "../img/portfolio_img/alura_geek.webp",
    titulo: "Alura Geek",
    skills: ["JavaScript", "CSS"],
    descripcion: " CRUD operations using HTTP requests.",
    demoURL: "https://alura-geek-ruddy.vercel.app/",
    repoURL: "https://github.com/SofiDevO/alura-geek",
    anim:"fade-up"
  },
  {
    imgSrc: "../img/portfolio_img//react_org.webp",
    titulo: "React ORG",
    skills: ["React", "CSS"],
    descripcion: "React application to manage your team members.",
    demoURL: "https://react-org-delta.vercel.app/",
    repoURL: "https://github.com/SofiDevO/react-org",
    anim:"fade-left"
  },
  {
    imgSrc: "../img/portfolio_img//portfolio.webp",
    titulo: "My Portfolio",
    skills: ["Astro", "React", "JavaScript"],
    descripcion: "Just the repository of my portfolio on GitHub.",
    demoURL: "https://sofidev-portfolio-astro-delta.vercel.app/",
    repoURL: "https://github.com/SofiDevO/sofidev-portfolio-astro",
    anim:"fade-right"
  },
  {
    imgSrc: "../img/portfolio_img/SASS.webp",
    titulo: "Eco Store",
    skills: ["Sass", "JavaScript"],
    descripcion: "Made with sass for the,Sass fundamentals course",
    demoURL: "https://sofidevo.github.io/eco-store-sass/",
    repoURL: "https://github.com/SofiDevO/eco-store-sass",
    anim:"fade-up"
  },
  {
    imgSrc: "../img/portfolio_img/BooststrapCurso.webp",
    titulo: "fruto & Fruta",
    skills: ["Bootstrap", "JavaScript"],
    descripcion: "Made with Bootstrap for the, Bootstrap  course",
    demoURL: "https://sofidevo.github.io/bootstrap-curso/",
    repoURL: "https://github.com/SofiDevO/bootstrap-curso",
    anim:"fade-left"
  },

  {
    imgSrc: "../img/portfolio_img//encriptador_mensajes_dark.webp",
    titulo: "Message Encryptor",
    skills: ["JavaScript", "CSS"],
    descripcion:
      "Message Encryptor for the first Alura Latam Challenge: Programming Logic.",
    demoURL: "https://sofidevo.github.io/encriptador-mensajes/",
    repoURL: "https://github.com/SofiDevO/encriptador-mensajes",
    anim:"fade-up"
  },
];

 const skillIcons = {
  JavaScript: "skill-icons:javascript",
  React: "skill-icons:react-dark",
  Astro: "skill-icons:astro",
  CSS: "skill-icons:css",
  Sass: "skill-icons:sass",
  StyledComponents: "skill-icons:styledcomponents",
  Bootstrap: "devicon:bootstrap",
  /*  Tailwind: "skill-icons:tailwindcss-dark", */
};

export  {portafolioData,skillIcons}