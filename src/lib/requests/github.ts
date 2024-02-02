import axios from 'axios';

export interface GithubRepo {
  full_name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
}

export async function getGithubRepo({ repo }: { repo: string }) {
  return axios
    .get<GithubRepo>(`https://api.github.com/repos/${repo}`)
    .then((res) => res.data);
}
