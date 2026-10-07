import { cn } from "@/lib/utils";

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

function PageContainer({ children, className = "", size = "xl", as: Tag = "main" }) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8",
        sizes[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}

export default PageContainer;
