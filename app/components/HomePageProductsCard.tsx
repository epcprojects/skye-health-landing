import Image, { StaticImageData } from "next/image";
import { AddIcon, RxIcon } from "@/public/icons";
import { Images } from "../images";

type HomePageProductCardProps = {
  category: string;
  title: string;
  image: string | StaticImageData;
  tags: string[];
  price: string | number;
  onAddToCart: () => void;
  isInDemand?: boolean;
  bgImage?: string | StaticImageData;
};

const HomePageProductCard = ({
  category,
  title,
  image,
  tags,
  price,
  onAddToCart,
  isInDemand = false,
  bgImage,
}: HomePageProductCardProps) => {
  const showDemandHover = isInDemand && bgImage;
  return (
    <div className="bg-[#F8F8FA] h-full  p-4 lg:p-8 rounded-xl flex flex-col  justify-between gap-8  lg:min-w-94.25 lg:max-w-94.25 group relative overflow-hidden">
      {showDemandHover && (
        <Image
          src={bgImage}
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        />
      )}

      {showDemandHover && (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="flex flex-col gap-4 justify-between relative z-10 ">
        <div className="flex flex-row justify-between">
          <span
            className={`
              flex-1 text-sm uppercase font-bold transition-colors duration-300
              ${showDemandHover ? "text-neutral-700 group-hover:text-white backdrop-blur-[10px]" : "text-neutral-700"}
            `}
          >
            {category}
          </span>
          <div
            className={
              showDemandHover
                ? "text-[#A3A3A3] group-hover:text-white transition-colors duration-300"
                : "text-[#A3A3A3]"
            }
          >
            <RxIcon />
          </div>
        </div>

        <Image
          src={image ? image : Images.landingPage.product}
          alt={title}
          width={300}
          height={300}
          className={
            showDemandHover
              ? "transition-opacity duration-300 group-hover:opacity-0"
              : ""
          }
        />

        <div className="flex flex-col gap-3">
          <div>
            <p
              className={`
              text-lg lg:text-xl font-semibold break-all  md:line-clamp-2 text-ellipsis transition-colors duration-300
              ${showDemandHover ? "text-gunmetal group-hover:text-white" : "text-gunmetal"}
            `}
            >
              {title}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className={`
                  border py-1 px-3 rounded-full text-sm font-medium transition-colors duration-300
                  ${
                    showDemandHover
                      ? "border-gray-200 bg-white text-gray-700 group-hover:bg-white/20 group-hover:text-black group-hover:border-white"
                      : "border-gray-200 bg-white text-gray-700"
                  }
                `}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between relative z-10 ">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className={`
    py-3.5 flex flex-row items-center cursor-pointer gap-2.5 rounded-full px-4.25 transition-colors duration-300
    ${
      showDemandHover
        ? "border border-gray-300 bg-white text-black group-hover:bg-black group-hover:text-white group-hover:border-black [&_path]:fill-black group-hover:[&_path]:fill-white"
        : "border border-gray-300 bg-white text-black [&_path]:fill-black"
    }
  `}
        >
          <AddIcon />

          <span className="text-base lg:text-lg font-medium">Learn More</span>
        </button>

        <p
          className={`
            text-xl lg:text-[28px] font-bold leading-[130%] transition-colors duration-300
            ${showDemandHover ? "text-[#2E2E2E] group-hover:text-white" : "text-[#2E2E2E]"}
          `}
        >
          {typeof price === "number" ? `$${price.toFixed(2)}` : price}
        </p>
      </div>
    </div>
  );
};

export default HomePageProductCard;
