import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
// import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-xs 2xl:text-base font-medium transition-colors hover:bg-main hover:text-white focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    active?: boolean;
    icon?: React.ReactNode;
    isHot?: boolean;
    link?: string;
  }
>(({ className, active, link, children, icon, isHot, ...props }, ref) => (
  <Link to={link || "/"}>
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        navigationMenuTriggerStyle(),
        "group text-white relative",
        className,
        `${active === true ? "bg-main2 text-white" : ""}`
      )}
      {...props}
    >
      {isHot && (
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABCCAMAAADDqGATAAAB/lBMVEUAAADkSj/oPjzvREPoQD7oRETvLy7tR0XsMjLqRkXpSEbnPz7mSEflSEfuRUPuMC/sMjHlSUfsR0XrNDPoPz/rNTTmQkDoRkXnR0boPjzhSEfuOjnnSkntMTDpSknrOjrlSEfqSkfnNDPoQT/kUE/uNTTjUE/oREPuQ0LkSEfuR0TkTUvsNDPoSknrODblQkHoODjnNjbqNzfrPzzuODfsPjzkTEvrNjXjS0roSkfqOTnmS0vsMjHpNjXoSUn/////KSj/FhX+Liz/LCr7Ghn8FhX7HR39KCb1JiX2FRT6JyX/Hx73OTf/IyL6FhX8MS/+Hhz/JyX6NDL6IyH/Ghn7KSf2HRzwLS3xKinzJCLyHRv0PTz2IyLoHhzxQT/3IB/wFRTqIiH++/r4NjTvJCPcGxr9GhnnFxbtFhXuIB/0GhjjFxbzLy73LSzyKCf75+b519byrKzwnZzwlpXtkI/xPj3xOjnmKSn8JSP9ISDrHh3kHh3wGRjqFRT99vb99PP53d31wcH1vLzypqbmQT/1MzH1KSjjISDqGhn2yMfzt7frhIPrYWDtWlnmUlHnTEvkR0buQD/mNTToLi33Kin97+/74eD30dD1tLTyfXzsd3fjbW3mZWTxNTTtMjHeMjD4MS/aJibjGxr77Oz1zMz1jYzrfXzpVVTyUVDiQ0InapnpAAAAP3RSTlMACA38Pzn5x6iRdyUh9+/swresi31wYlQ0GP795dnCsaZZMR368e/t4t/c2c2YlGpTTf3x4cvJt5BwW1DkpYWQ9E7HAAAE0UlEQVRYw+2U519SYRiGEbVyVZYtNbXcOdp7vI7D4YB4QA9DEFQQZCsuQBDN3LlHjnK3/8ue9wj8KFL4iR+9vuAXLp/nfm8ezhlnnHEyUtOzcxJPwROXveR0Pk6JXXRjadxu306KXXQ9yy6cUBSnxiy69dg20blTWvQ69pEe7Ty6yqkoeBGr6OZ8Ihc+7hTl3IpN9Lrg8DOlLDshttWKAkXIK0jm/A335ZWciptRipLLgn/eT0vnhla14mJLc3N//LvoRC+eheRVWhr8/4lX4ptF7Y2N7aKlG1GJ8tJDd0lPu8/+ced8S7OoUVwDiEUlUYnS8zihZGTmxXGTS1pgGJDUAjV7zuvRiJ798/NIKC6+2C9qF7OWKkzN+NNoRGUZ7EdINP6d/JqGKr7dGU0xsiEUTEg02II1fD6/ASMbz41ClBZ8k7jkexBNUCOTCYVCMNU38O1ZKZHv0YL/quUn+aOpwSvxZUJKqVfYGHc9ILNVRhSlLKSGR8MXCim9drn303clg0Xu1UJuJFHCYlywNYGAZViz2K1DqAuL6uoGhLaMiBcyLTQa/1ZK7ew0Qmi4J0tNDtQBzOqTSKKMNDYasX8YPiDs3HyPgLV9r4r1wEiM7fhS3gxEUxuIBlDq1xD6Bq5MjZzEGolEQk6UH7fWX9Hw2WhWXFqtdnNjwfAFoW4QsRqpRMIojiolG40oJBrQrPQ4kG79x6TGY/ZMdiHdsoqQYI9U2kFOPA9ThLRGHLAAlH6uC7F8cJnlKs8MQn1T8g4pplpKqs+l/GeapGBrqmrBIsTox3RoqHdrpovdSa5yDaFPkyqiQ1qN6SCbroWLcloC0QRKrKSU2g9o+LdX492FmOdUcvlUD0KfTTSv+hCy6W2Y52WLKJgwv6pBqJwd2TSbXQj1eGEnzTxCI1NyYnAZofdGAYj8E10NE51vbqwJDAPhMP3wjUnNGEI/4JlI1cE3NKSx0BbfRxgtICLUiodhohKROPjDpBg3Y4ZvzHoXIVwskhv7EBqzEPTgAkK9hyKCUDf959XOi8TgwTvFj84pGbUZlpk2GIaR40BFEBYjvNeKheAJ2r4vtWERQbZSigvccFGSc6+2qqGBz/yCp9aolB7DOtTYAHNtGQctJusG0uFseAKA5hGkmlJchr3CSc3ak4HIrdY6YAmNx7sLjm5DJkJfF61W6xZsZMKT8Hg8AjSd5y7cPaLVueMyuHz1jPkzQqOG36M6aKFu19CL0FB33whcD20gGpJqunT11tFHyGnn14NI5fqKhkbwwZiGpK0Hvf5mrxxGQ7RSTbevxXGO4em4DEQDrZ4+BHTN7O8PQ42NxvnRdUfPrK+NjaaVjeZ4Xm2vuuE+kCoXbPXFYJyy4hr72tpMPp8JNMFoIvLE7q4HkXxqFERWeCqo8ZpJQLMPBTv5o4lMhk0It09CDEKfHdZBWmDa0HXraR68VDCaqOAWrjJwsqB9kPXPNpoWbCsgYZ4/mgecqKm0MRK4V7TpJ7wSVsBKNC9yNOGlPEeREmkHT+BzoGkVjdsX1proyJ0g8c2iBb/i8UBhrYmaBAXsBoPQ+J2C0ZyEcoqsxkT4QUXmlaKVYG8fG01lPufElHeSBAzjjyYGUgqbKDXFRhMj+bmXdt5cSOScBlzOGafOH+z1y+aDaPLJAAAAAElFTkSuQmCC"
          alt=""
          className="hotLabel"
        />
      )}
      {icon} {children}
      {/* <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    /> */}
    </NavigationMenuPrimitive.Trigger>
  </Link>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
