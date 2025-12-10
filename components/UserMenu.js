"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useUser } from "@/lib/contexts/UserContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function UserMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { userInfo, setUserInfo } = useUser();
  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempName, setTempName] = useState(userInfo.name);
  const [tempPassword, setTempPassword] = useState("12345678"); // example password

  const handleLogout = async () => {
    await logout();
    setUserInfo({ name: "", email: "", img: "" });
    router.push("/");
  };

  const handleEditPicture = () => {
    fileInputRef.current?.click();
  };

  const handleEditPictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setUserInfo((prev) => ({ ...prev, img: imageUrl }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleSaveInfo = () => {
    if (!tempName.trim() || !tempPassword.trim()) {
      alert("Name and password cannot be empty!");
      return;
    }
    setUserInfo((prev) => ({ ...prev, name: tempName }));
    // TODO: Update password in backend if needed
    alert("Info updated!");
    setDialogOpen(false);
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-10 h-10 cursor-pointer">
            {userInfo.img ? (
              <AvatarImage src={userInfo.img} alt={userInfo.name} />
            ) : (
              <AvatarFallback>U</AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64 p-3 space-y-3">
          <div className="flex flex-col items-start mx-4 justify-start mb-2  ">
            <span className="text-lg font-semibold text-black">
              {userInfo.name}
            </span>
            <span className="text-sm text-gray-700 mt-1">{user.email}</span>
          </div>

          {/* Recent Info Tooltip */}
          <DropdownMenuItem asChild className="cursor-default select-none">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" className="w-full">
                  Recent Info
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-blue-50 text-black p-3 rounded shadow-lg space-y-2 w-64"
              >
                {/* Username */}
                <div className="flex justify-between items-center">
                  <span>Username: {userInfo.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(userInfo.name)}
                  >
                    Copy
                  </Button>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center">
                  <span>Email: {userInfo.email}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(userInfo.email)}
                  >
                    Copy
                  </Button>
                </div>

                {/* Password */}
                <div className="flex justify-between items-center">
                  <span>
                    Password: {showPassword ? tempPassword : "********"}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(tempPassword)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Change Info Button triggers Dialog */}
          <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
            <Button
              variant="default"
              className="w-full"
              onClick={() => setDialogOpen(true)}
            >
              Change Info
            </Button>
          </DropdownMenuItem>

          {/* Edit Picture Button */}
          <DropdownMenuItem asChild>
            <Button
              variant="default"
              className="w-full"
              onClick={handleEditPicture}
            >
              Edit Picture
            </Button>
          </DropdownMenuItem>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleEditPictureChange}
          />

          {/* Logout Button */}
          <DropdownMenuItem asChild>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog outside Dropdown */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Change Account Info</DialogTitle>
            <DialogDescription>
              Update your username and password here.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Username"
              className="border p-2 rounded w-full"
            />
            <input
              type="password"
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              placeholder="Password"
              className="border p-2 rounded w-full"
            />
          </div>

          <DialogFooter>
            <Button
              variant="default"
              className="w-full"
              onClick={handleSaveInfo}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
