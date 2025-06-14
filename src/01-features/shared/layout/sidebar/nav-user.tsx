import {
  Bomb,
  ChevronsUpDown,
  LogIn,
  LogOut,
  UserPen,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/02-components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/02-components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/02-components/ui/sidebar"
import { User } from "@/05-model/base/User"
import { Link } from "react-router"
import { cn } from "@/98-lib/utils"
import { avatarFallback, loader } from "@/02-components/utils/misc"
import { useState } from "react"

interface NavUserProps {
  user: User | null,
  logout: () => void,
}

const NavUser = ({ user, logout }: NavUserProps) => {
  const { isMobile } = useSidebar()

  const [hasError, setHasError] = useState(false);

  const simulateError = false;

  // Simulazione errore per testare pagina di errore generico
  const handleError = () => {
    try {
      loader();
    } catch {
      setHasError(true);
    }
  };

  if (hasError) {
    throw new Error('Error from dropdown menu item click');
  }

  const UserInfo = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn("cursor-pointer", "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground")}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={`/avatars/${user.avatar}`} alt={`${user.firstName} ${user.lastName}`} className="object-cover" />
                <AvatarFallback className="rounded-lg">{avatarFallback(user.firstName, user.lastName)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`${user.firstName} ${user.lastName}`}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={`/avatars/${user.avatar}`} alt={`${user.firstName} ${user.lastName}`} className="object-cover" />
                  <AvatarFallback className="rounded-lg">{avatarFallback(user.firstName, user.lastName)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{`${user.firstName} ${user.lastName}`}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/profile">
                <DropdownMenuItem>
                  <UserPen />
                  Profilo
                </DropdownMenuItem>
              </Link>
              {simulateError &&
                <DropdownMenuItem onClick={handleError}>
                  <Bomb />
                  Simula errore
                </DropdownMenuItem>
              }
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
    else {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="Guest" alt="Guest" />
                <AvatarFallback className="rounded-lg">G</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Guest</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="Guest" alt="Guest" />
                  <AvatarFallback className="rounded-lg">G</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Guest</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/login">
                <DropdownMenuItem>
                  <LogIn />
                  Login
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {UserInfo()}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
export default NavUser