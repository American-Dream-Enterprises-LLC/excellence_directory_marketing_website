"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const blogPathMatches = ["/blog", "/blogs", "/articles", "/why-excellence"] as const;

function isNavItemActive(pathname: string, matches: readonly string[]) {
  return matches.some(
    (match) => pathname === match || (match !== "/" && pathname.startsWith(`${match}/`)),
  );
}

export function DesktopHeaderNav() {
  const pathname = usePathname();
  const showBlogLink = pathname === "/" || isNavItemActive(pathname, blogPathMatches);
  const navItems = [
    { href: "/", label: "Home", matches: ["/"] },
    ...(showBlogLink
      ? [{ href: "/blogs", label: "Blogs", matches: blogPathMatches }]
      : []),
    { href: "/promotions", label: "Promotions", matches: ["/promotions"] },
  ] as const;

  return (
    <nav className="site-header-nav" aria-label="Primary">
      {navItems.map((item) => {
        const isActive = isNavItemActive(pathname, item.matches);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`site-header-nav-link${isActive ? " site-header-nav-link-active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
