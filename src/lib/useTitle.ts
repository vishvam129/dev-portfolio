import { useEffect } from "react";

/** Sets document.title + meta description per route (replaces Next metadata). */
export function useTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
    window.scrollTo(0, 0);
  }, [title, description]);
}
