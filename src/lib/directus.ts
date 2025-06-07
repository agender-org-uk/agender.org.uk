import { createDirectus, rest } from "@directus/sdk";

type Page = {
  title: string;
  content: string;
  slug: string;
};

type Resource = {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  direct_link: string | null;
};

type Schema = {
  pages: Page[];
  resources: Resource[];
};

const directus = createDirectus<Schema>("https://directus.agender.org.uk").with(
  rest(),
);

export default directus;
