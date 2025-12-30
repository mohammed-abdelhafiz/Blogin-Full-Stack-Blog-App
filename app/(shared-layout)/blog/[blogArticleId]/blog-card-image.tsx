import Image from "next/image";

interface BlogCardImageProps {
  blogTitle: string;
  imageUrl: string | null;
}

export const BlogCardImage = ({ blogTitle, imageUrl }: BlogCardImageProps) => {
  return (
    <div className="h-[400px] w-full mb-8 rounded-xl overflow-hidden shadow-sm relative">
      <Image
        src={
          imageUrl ??
          "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"
        }
        alt={blogTitle}
        fill
        className="object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};
