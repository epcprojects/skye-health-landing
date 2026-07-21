import Image from "next/image";
import { images } from "@/app/ui";

const PeptideExpertsSection = () => {
  return (
    <section className="bg-[#F5F8FE] pb-6 xl:pb-27">
      <div className="container mx-auto max-w-7xl px-4 xl:px-8">
        <div className="grid h-full min-h-150 grid-cols-1 overflow-hidden rounded-2xl bg-[url('/images/PeptideExpertBgImage.png')] bg-cover bg-no-repeat pt-5 pr-3.5 pl-3.5 xl:min-h-146.5 xl:grid-cols-2 xl:items-center xl:rounded-4xl xl:pt-0 xl:pr-0 xl:pl-16">
          <div className="flex flex-col gap-4 xl:gap-6">
            <h2 className="text-2xl font-medium text-white xl:text-5xl">
              Your Peptide Experts
            </h2>

            <div className="flex flex-col gap-2 xl:gap-3">
              <h3 className="text-lg font-medium text-white xl:text-[32px]">
                Dr. Barry Sanchez
              </h3>

              <p className="text-sm font-light text-white xl:text-base">
                Stanford fellowship-trained, board certified bariatric surgeon
                and Chief Medical Officer of Skye Health. With expertise in
                metabolic health, hormone optimization and peptide therapy, he
                leads the team of physicians providing modern, research-driven
                care focused on personalization, longevity and real-world
                outcomes.
              </p>
            </div>

            <div className="mb-3.5 flex flex-wrap gap-3 xl:mb-0 xl:gap-4">
              <div className="flex flex-row items-center gap-2.5 rounded-full bg-white/8 px-3.5 py-2 xl:px-4">
                <Image
                  src={images.landingpageimages.StanfordImage}
                  alt="Stanford University"
                  className="h-5 w-5 xl:h-auto xl:w-auto"
                />

                <p className="text-sm font-medium text-white xl:text-base">
                  Stanford University
                </p>
              </div>

              <div className="flex flex-row items-center gap-2.5 rounded-full bg-white/8 px-3.5 py-2 xl:px-4">
                <Image
                  src={images.landingpageimages.SkyHeartImage}
                  alt="Skye Health"
                  className="h-5 w-5 xl:h-auto xl:w-auto"
                />

                <p className="text-sm font-medium text-white xl:text-base">
                  Chief Medical Officer
                </p>
              </div>
            </div>
          </div>

          <div className="w-full xl:h-full xl:self-stretch">
            {/* Mobile images */}
            <div className="relative w-full overflow-hidden xl:hidden">
              <Image
                src={images.landingpageimages.SkyWhiteBg}
                alt=""
                aria-hidden="true"
                fill
                className="z-0 object-fill"
              />

              <Image
                src={images.landingpageimages.DoctorImage}
                alt="Dr. Barry Sanchez"
                className="relative z-10 block h-auto w-full"
              />
            </div>

            {/* Desktop images */}
            <div className="relative hidden h-full w-full xl:block">
              <Image
                src={images.landingpageimages.SkyWhiteDesktopBg}
                alt=""
                aria-hidden="true"
                fill
                className="z-0 rounded-4xl object-fill"
              />

              <Image
                src={images.landingpageimages.DoctorImage}
                alt="Dr. Barry Sanchez"
                className="absolute top-5 -right-10 z-10 rounded-4xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PeptideExpertsSection;