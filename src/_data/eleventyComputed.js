import { promisify } from "util";
import { exec } from "child_process";

import EleventyFetch from "@11ty/eleventy-fetch";

export default {
  commit: async (data) => {
    const gitLog = await promisify(exec)(`git log -n1 --pretty=format:%H -- ${data.page.inputPath}`)

    const gitHash = gitLog.stdout

    const commit = await EleventyFetch(`https://api.github.com/repos/agender-org-uk/agender.org.uk/commits/${gitHash}`, {
      duration: '1d',
      type: 'json'
    });

    return commit;
  },

  author: (data) => data.commit.author,

  decap: {
    collection: (data) => data.page.filePathStem.match(/^\/(\w+)/)[1],
    entry: (data) => data.page.filePathStem.replace(/^\/(\w+)\//, '')
  }
}