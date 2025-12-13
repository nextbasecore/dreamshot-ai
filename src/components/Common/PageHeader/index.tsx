interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col text-center items-center gap-4 justify-center px-4 ${className}`}
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
        {title}
      </h1>
      {description && <p className="text-gray-500 max-w-xl">{description}</p>}
    </div>
  );
}
