import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import {
  Copy,
  Check,
  CopyCheck,
  ArrowDown,
  ArrowDown01,
  ArrowDownCircle,
} from "lucide-react";
import { IconsPackages } from "./icons";

const PackageInstallComponent = () => {
  const [packageManager, setPackageManager] = useState("npm");
  const [copied, setCopied] = useState(false);

  const packageManagers: any = {
    npm: {
      command: "npm install @babycommando/entity-db",
      icon: "npm",
    },
    yarn: {
      command: "yarn add @babycommando/entity-db",
      icon: "yarn",
    },
    bun: {
      command: "bun add @babycommando/entity-db",
      icon: "bun",
    },
    pnpm: {
      command: "pnpm add @babycommando/entity-db",
      icon: "pnpm",
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(packageManagers[packageManager].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy state after 2 seconds
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-black">
      {/* Dropdown for Package Manager */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="bg-[#1e1e1e] flex items-center gap-2">
            {/* <img
              src={packageManagers[packageManager].icon}
              alt={`${packageManager} icon`}
              className="h-5 w-5"
            /> */}
            {/* <ArrowDown /> */}

            <IconsPackages icon={packageManagers[packageManager].icon} />
            {/* <ArrowDown01 />
            <ArrowDownCircle /> */}
            <span className="">{packageManager}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          {Object.keys(packageManagers).map((key) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setPackageManager(key)}
              className="flex items-center gap-2">
              {/* <img
                src={packageManagers[key].icon}
                alt={`${key} icon`}
                className="h-5 w-5"
              /> */}
              <IconsPackages icon={packageManagers[key].icon} />

              <span className="">{key}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Install Command */}
      <div className="flex-1 mx-4 truncate text-sm ">
        {packageManagers[packageManager].command}
      </div>

      {/* Copy Button */}
      <Button
        onClick={handleCopy}
        variant="ghost"
        className="flex items-center space-x-2">
        {copied ? (
          <CopyCheck className="h-5 w-5 text-green-500" />
        ) : (
          <Copy className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default PackageInstallComponent;
