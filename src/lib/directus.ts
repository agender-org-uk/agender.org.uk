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

export async function FileLink(resource: Resource): Promise<string | null> {
  const fileId = resource.file;

  if (!fileId) return null;

  const file = await directus.request(readFile(fileId));

  return `https://directus.agender.org.uk/assets/${file.id}?download`;
}

const directus = createDirectus<Schema>(
  "https://directus.agender.org.uk/",
).with(rest());

export default directus;
