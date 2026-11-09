import { db } from "../src/lib/db";
import { posts, profile, projects } from "../src/lib/db/schema";

const importedProjects = [
  {
    slug: "fpt-v2",
    title: "FPT V2",
    summary: "Fullstack, UI/UX, and DevOps. Currently listed as coming soon.",
    role: "Fullstack, UI/UX, DevOps",
    tech: "React, Next.js, T3",
    liveUrl: null,
    featured: true,
  },
  {
    slug: "felicia-putri-tjiasaka",
    title: "Felicia Putri Tjiasaka",
    summary: "Portfolio project spanning fullstack development, UI/UX, and DevOps.",
    role: "Fullstack, UI/UX, DevOps",
    tech: "Laravel, jQuery",
    liveUrl: "https://feliciaputritjiasaka.com/",
    featured: true,
  },
  {
    slug: "enfagrow",
    title: "Enfagrow",
    summary: "Conversion rate optimization work using Google Optimize.",
    role: "CRO",
    tech: "Google Optimize",
    liveUrl: "https://store.enfa.co.id/",
  },
  {
    slug: "sushi-king-malaysia",
    title: "Sushi King Malaysia",
    summary: "API integration work with CleverTap.",
    role: "API integration",
    tech: "CleverTap",
    liveUrl: "https://sushi-king.com/",
  },
  {
    slug: "innisfree-malaysia",
    title: "Innisfree Malaysia",
    summary: "Conversion optimization and UI/UX work.",
    role: "CRO, UI/UX",
    tech: "Google Optimize",
    liveUrl: "https://www.innisfree.my/",
  },
  {
    slug: "wahana-visi-indonesia",
    title: "Wahana Visi Indonesia",
    summary: "Conversion rate optimization work with Google Optimize and jQuery.",
    role: "CRO",
    tech: "Google Optimize, jQuery",
    liveUrl: "https://wahanavisi.org/",
  },
  {
    slug: "tokio-marine-vietnam",
    title: "Tokio Marine Vietnam",
    summary: "CRM work using Mailchimp.",
    role: "CRM",
    tech: "Mailchimp",
    liveUrl: "https://tokiomarineonline.com.vn/",
  },
  {
    slug: "unhcr-thailand",
    title: "UNHCR Thailand",
    summary: "Conversion rate optimization work using Google Optimize.",
    role: "CRO",
    tech: "Google Optimize",
    liveUrl: "https://www.unhcr.or.th/donate/refugees",
  },
  {
    slug: "noel-gifts",
    title: "Noel Gifts",
    summary: "Conversion rate optimization work with Google Optimize and jQuery.",
    role: "CRO",
    tech: "Google Optimize, jQuery",
    liveUrl: "https://noelgifts.com/",
  },
  {
    slug: "ampg",
    title: "AMPG",
    summary: "Fullstack and DevOps project using Laravel. Internal use only.",
    role: "Fullstack, DevOps",
    tech: "Laravel",
    liveUrl: null,
  },
  {
    slug: "cari-kuliah",
    title: "Cari Kuliah",
    summary: "Fullstack, UI/UX, and DevOps project using Laravel and jQuery.",
    role: "Fullstack, UI/UX, DevOps",
    tech: "Laravel, jQuery",
    liveUrl: "https://carikuliah.com/",
  },
  {
    slug: "peruri-sign",
    title: "Peruri Sign",
    summary: "UI/UX design using Adobe XD and Figma.",
    role: "UI/UX",
    tech: "Adobe XD, Figma",
    liveUrl: "https://sign.peruri.co.id/",
  },
  {
    slug: "sscorner",
    title: "SSCorner",
    summary: "Frontend development using Laravel.",
    role: "Frontend",
    tech: "Laravel",
    liveUrl: "https://sscorner.id/",
  },
  {
    slug: "lofity",
    title: "Lofity",
    summary: "Fullstack, UI/UX, and DevOps project using Laravel and jQuery. Site no longer available.",
    role: "Fullstack, UI/UX, DevOps",
    tech: "Laravel, jQuery",
    liveUrl: null,
  },
  {
    slug: "love-bonito-csr-rating",
    title: "Love, Bonito — CSR Rating",
    summary: "Fullstack, UI/UX, and DevOps project using Laravel and jQuery. Internal use only.",
    coverImage: null,
    role: "Fullstack, UI/UX, DevOps",
    tech: "Laravel, jQuery",
    liveUrl: null,
  },
  {
    slug: "love-bonito-asset-management",
    title: "Love, Bonito — Asset Management",
    summary: "Fullstack, UI/UX, and DevOps project using Laravel and jQuery. Internal use only.",
    coverImage: null,
    role: "Fullstack, UI/UX, DevOps",
    tech: "Laravel, jQuery",
    liveUrl: null,
  },
  {
    slug: "love-bonito-return-receipt",
    title: "Love, Bonito — Return Receipt",
    summary: "Fullstack, UI/UX, and DevOps project using Laravel and jQuery. Internal use only.",
    coverImage: null,
    role: "Fullstack, UI/UX, DevOps",
    tech: "Laravel, jQuery",
    liveUrl: null,
  },
  {
    slug: "love-bonito-career-page",
    title: "Love, Bonito — Career Page",
    summary: "Fullstack, UI/UX, and DevOps project using Laravel and jQuery. Site no longer available.",
    coverImage: null,
    role: "Fullstack, UI/UX, DevOps",
    tech: "Laravel, jQuery",
    liveUrl: null,
  },
  {
    slug: "love-bonito-blog",
    title: "Love, Bonito — Blog",
    summary: "Fullstack, UI/UX, and DevOps project using WordPress. Site no longer available.",
    coverImage: null,
    role: "Fullstack, UI/UX, DevOps",
    tech: "WordPress",
    liveUrl: null,
  },
];

console.log("Importing verified portfolio content…");

db.delete(posts).run();
db.delete(projects).run();
db.delete(profile).run();

db.insert(profile)
  .values({
    id: 1,
    name: "Fred",
    brand: "Frediant",
    role: "Fullstack Developer & CRO Specialist",
    headline:
      "I build high-conversion digital products, from architecture to pixel-perfect UI.",
    bio: "Building digital products that convert. Pixel by pixel. My work spans fullstack development, UI/UX, DevOps, and CRO.",
    location: "Jakarta, Indonesia",
    email: "hi@frediant.com",
    github: null,
    gitlab: "https://gitlab.com/aldyfrediant",
    twitter: null,
    linkedin: "https://www.linkedin.com/in/aldyfrediant/",
    avatar: null,
    availability: "",
    updatedAt: new Date(),
  })
  .run();

db.insert(projects)
  .values(
    importedProjects.map((project, index) => ({
      ...project,
      content: "",
      year: "",
      repoUrl: null,
      published: true,
      sortOrder: index + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  )
  .run();

console.log(`Imported ${importedProjects.length} projects, no placeholder posts, and 1 profile.`);
