import { Octokit } from "octokit";

const {
  GITHUB_TOKEN,
  CF_PAGES_COMMIT_SHA,
  CF_PAGES_URL
} = process.env;

const octokit = new Octokit({
  auth: GITHUB_TOKEN
})

await octokit.request('POST /repos/{owner}/{repo}/statuses/{sha}', {
  owner: 'agender-org-uk',
  repo: 'agender.org.uk',
  sha: CF_PAGES_COMMIT_SHA,
  state: 'success',
  target_url: CF_PAGES_URL,
  context: 'deployment/cloudflare-pages',
})
