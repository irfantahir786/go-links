"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearSession } from "@/lib/auth";
import type { User } from "@/lib/definitions";
import { LogOut, User as UserIcon, Home } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "./icons";

export default function DashboardHeader({ user }: { user: User }) {
  const router = useRouter();
  const avatarImage = PlaceHolderImages.find(img => img.id === 'user-avatar');

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/80 backdrop-blur-xl">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Logo className="h-8 w-8 text-primary" />
        <span className="font-bold text-lg">TinyLink</span>
      </Link>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
            <Link href="/">
                <Home className="mr-2" />
                Public Site
            </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                {avatarImage && (
                  <AvatarImage 
                    src={avatarImage.imageUrl} 
                    alt={user.name} 
                    data-ai-hint={avatarImage.imageHint}
                  />
                )}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
