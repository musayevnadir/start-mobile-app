export const EndpointResources = {
  github: {
    userRepos: (username: string) => `/users/${username}/repos`,
    searchRepos: '/search/repositories',
    repo: (owner: string, repo: string) => `/repos/${owner}/${repo}`,
    repoContents: (owner: string, repo: string, path?: string) =>
      `/repos/${owner}/${repo}/contents${path ? `/${path}` : ''}`,
    repoCommits: (owner: string, repo: string) =>
      `/repos/${owner}/${repo}/commits`,
    repoIssues: (owner: string, repo: string) =>
      `/repos/${owner}/${repo}/issues`,
    repoPulls: (owner: string, repo: string) => `/repos/${owner}/${repo}/pulls`,
  },
} as const;
