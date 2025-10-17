type MapProps = {
  title: string;
  src: string;
};

export function MapEmbed({ title, src }: MapProps) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-tr-md border border-black/10">
      <iframe
        title={title}
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        allowFullScreen
      />
    </div>
  );
}
