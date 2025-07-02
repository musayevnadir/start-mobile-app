import { EndpointResources } from '../EndpointResources.g';

const GITHUB_BASE_URL = 'https://api.github.com';

export interface IResponse<T> {
  result: boolean;
  data: T;
  message?: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}

interface FetchRepositoriesParams {
  username: string;
  page?: number;
  perPage?: number;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
}

interface SearchRepositoriesParams {
  query: string;
  page?: number;
  perPage?: number;
  sort?: 'stars' | 'forks' | 'updated';
}

const responseHandler = <T>(
  response: Response,
): Promise<IResponse<T | null>> => {
  return response.json().then(data => ({
    result: response.ok,
    data: response.ok ? data : null,
    message: response.ok ? undefined : data?.message || 'Request failed',
  }));
};

const errorHandler = (error: any): IResponse<null> => {
  console.error('GitHub API Error:', error);
  return {
    result: false,
    data: null,
    message: error.message || 'Network error occurred',
  };
};

const Fetcher = async (
  url: string,
  options?: RequestInit,
): Promise<Response> => {
  return fetch(`${GITHUB_BASE_URL}${url}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
};

export const GitHubAPI = {
  async getUserRepositories(
    params: FetchRepositoriesParams,
  ): Promise<IResponse<Repository[] | null>> {
    try {
      const { username, page = 1, perPage = 20, sort = 'updated' } = params;
      const url = `${EndpointResources.github.userRepos(
        username,
      )}?page=${page}&per_page=${perPage}&sort=${sort}`;

      return await Fetcher(url)
        .then(response => responseHandler<Repository[]>(response))
        .catch(errorHandler);
    } catch (error) {
      return errorHandler(error);
    }
  },

  async searchRepositories(
    params: SearchRepositoriesParams,
  ): Promise<IResponse<SearchResponse | null>> {
    try {
      const { query, page = 1, perPage = 20, sort = 'stars' } = params;
      const searchQuery = encodeURIComponent(query);
      const url = `${EndpointResources.github.searchRepos}?q=${searchQuery}&page=${page}&per_page=${perPage}&sort=${sort}`;

      return await Fetcher(url)
        .then(response => responseHandler<SearchResponse>(response))
        .catch(errorHandler);
    } catch (error) {
      return errorHandler(error);
    }
  },

  async getRepository(
    owner: string,
    repo: string,
  ): Promise<IResponse<Repository | null>> {
    try {
      return await Fetcher(EndpointResources.github.repo(owner, repo))
        .then(response => responseHandler<Repository>(response))
        .catch(errorHandler);
    } catch (error) {
      return errorHandler(error);
    }
  },

  async getRepositoryContents(
    owner: string,
    repo: string,
    path?: string,
  ): Promise<IResponse<any | null>> {
    try {
      return await Fetcher(
        EndpointResources.github.repoContents(owner, repo, path),
      )
        .then(response => responseHandler<any>(response))
        .catch(errorHandler);
    } catch (error) {
      return errorHandler(error);
    }
  },

  async getRepositoryCommits(
    owner: string,
    repo: string,
    page: number = 1,
    perPage: number = 20,
  ): Promise<IResponse<any[] | null>> {
    try {
      const url = `${EndpointResources.github.repoCommits(
        owner,
        repo,
      )}?page=${page}&per_page=${perPage}`;

      return await Fetcher(url)
        .then(response => responseHandler<any[]>(response))
        .catch(errorHandler);
    } catch (error) {
      return errorHandler(error);
    }
  },

  async getRepositoryIssues(
    owner: string,
    repo: string,
    page: number = 1,
    perPage: number = 20,
  ): Promise<IResponse<any[] | null>> {
    try {
      const url = `${EndpointResources.github.repoIssues(
        owner,
        repo,
      )}?page=${page}&per_page=${perPage}`;

      return await Fetcher(url)
        .then(response => responseHandler<any[]>(response))
        .catch(errorHandler);
    } catch (error) {
      return errorHandler(error);
    }
  },

  async getRepositoryPulls(
    owner: string,
    repo: string,
    page: number = 1,
    perPage: number = 20,
  ): Promise<IResponse<any[] | null>> {
    try {
      const url = `${EndpointResources.github.repoPulls(
        owner,
        repo,
      )}?page=${page}&per_page=${perPage}`;

      return await Fetcher(url)
        .then(response => responseHandler<any[]>(response))
        .catch(errorHandler);
    } catch (error) {
      return errorHandler(error);
    }
  },
};
