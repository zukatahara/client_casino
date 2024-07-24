// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DialogPortalProps } from "@radix-ui/react-dialog";
declare module "@radix-ui/react-dialog" {
  interface DialogPortalProps {
    children?: React.ReactNode;
    /**
     * Specify a container element to portal the content into.
     */
    container?: PortalProps["container"];
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
    className?: string;
  }
}
