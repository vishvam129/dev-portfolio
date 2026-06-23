import { useEffect, useState } from "react";

export type Repo = {
  name: string;
  language: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
  description: string | null;
};

/** Live recent pushes from GitHub (public API, CORS-enabled, no auth).
 *  null = loading, [] = unavailable/empty (render a graceful fallback). */
export function useGitHub(user = "vishvam129", n = 5) {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=${n}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Repo[]) => { if (alive && Array.isArray(d)) setRepos(d.slice(0, n)); })
      .catch(() => { if (alive) setRepos([]); });
    return () => { alive = false; };
  }, [user, n]);
  return repos;
}

const LANG: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5", HTML: "#e34c26",
  CSS: "#563d7c", Java: "#b07219", "C++": "#f34b7d", C: "#555555", Shell: "#89e051", Dart: "#00B4AB",
};
export const langColor = (l: string | null) => (l && LANG[l]) || "#8b98a9";

export function ago(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 3600) return `${Math.max(1, Math.floor(d / 60))}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  if (d < 2592000) return `${Math.floor(d / 86400)}d ago`;
  if (d < 31536000) return `${Math.floor(d / 2592000)}mo ago`;
  return `${Math.floor(d / 31536000)}y ago`;
}
