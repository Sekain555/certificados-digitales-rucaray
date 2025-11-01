
"use client";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Home, FileText, Folder, Settings, Shield, ClipboardCheck } from "lucide-react";
import RucarayLogo from "../RucarayLogo";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavLink = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
            isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
};


export function AppSidebar() {
  const { user } = useAuth();
  
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-white text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base p-1"
          >
            <RucarayLogo className="h-full w-full transition-all group-hover:scale-110" />
            <span className="sr-only">Rucaray</span>
          </Link>
          <NavLink href="/dashboard" icon={Home} label="Dashboard" />
          <NavLink href="/dashboard/certifications" icon={FileText} label="Historial" />
           <NavLink href="/dashboard/higiene" icon={ClipboardCheck} label="Inspección Higiene" />
          {user?.role === 'admin' && (
            <NavLink href="/dashboard/categories" icon={Folder} label="Categorías" />
          )}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {user?.role === 'admin' && (
            <NavLink href="/dashboard/administration" icon={Shield} label="Administración" />
          )}
          <NavLink href="/dashboard/settings" icon={Settings} label="Perfil" />
        </nav>
      </TooltipProvider>
    </aside>
  );
}
