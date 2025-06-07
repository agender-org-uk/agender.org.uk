import { createDirectus, readFile, rest } from "@directus/sdk";

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
  file: string | null;
  direct_link: string | null;
};

type Schema = {
  pages: Page[];
  resources: Resource[];
};

export function FileLink(resource: Resource): string | null {
  const fileId = resource.file;

  if (!fileId) return null;

  return `https://directus.agender.org.uk/assets/${fileId}?download`;
}

const directus = createDirectus<Schema>(
  "https://directus.agender.org.uk/",
).with(rest());

export default directus;
