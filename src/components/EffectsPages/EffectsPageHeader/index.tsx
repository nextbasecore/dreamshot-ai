interface EffectsPageHeaderProps {
  title: string;
  description: string;
}

export default function EffectsPageHeader({
  title,
  description,
}: EffectsPageHeaderProps) {
  return (
    <div className="flex flex-col text-center items-center gap-10 justify-center mt-15 px-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
        {title}
      </h1>
      <p className="text-gray-500 max-w-xl">{description}</p>
    </div>
  );
}
