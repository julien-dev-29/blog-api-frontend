import { NavLink } from "react-router";

import { ModeToggle } from "@/components/toggle-mode";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full border-b bg-background/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="text-lg font-semibold">
            Blog API
          </NavLink>

          <nav className="hidden gap-3 md:flex">
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-medium text-primary"
                  : "text-sm text-muted-foreground"
              }
            >
              Posts
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-medium text-primary"
                  : "text-sm text-muted-foreground"
              }
            >
              About
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <NavLink to="/auth/login">Log in</NavLink>
            </Button>

            <Button asChild variant="default" size="sm">
              <NavLink to="/auth/register">Sign up</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
