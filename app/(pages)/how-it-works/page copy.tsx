"use client"
import { HowItWorksScrollCards, MarqueeCard, MarqueeLanding, SectionHeroCTA } from '@/app/components'
import NEWFAQ from '@/app/components/FAQ';
import FaqAccordion from '@/app/components/FaqAccordion';
import { DotIcon } from '@/public/icons';
import React from 'react'

const page = () => {
    const items = [
  {
    num: "01",
    title: "Complete a health assessment",
    description:
      "Your responses help our medical team personalize care and ensure",
    
  },
  {
    num: "02",
    title: "Upload labs or order new ones",
    description: "Upload your existing lab results securely, or order new labs",
  
  },
  {
    num: "03",
    title: "Provider review & approval",
    description:
      "A licensed healthcare provider carefully reviews your health information.",
   
  },
  {
    num: "04",
    title: "Customized treatment plan",
    description:
      "Receive a treatment plan tailored to your unique health needs.",
  },
  //   { num: "05", title: "Ongoing Tracking", color: "#D8EAFF" },
];
  return (
    <>
    <SectionHeroCTA
          title="How Paramount HealthRx Works"
          titleSize='xl:text-6xl sm:text-5xl text-4xl'
          description="Simple steps to affordable, reliable healthcare"
          primaryButton={{
            label: "Start Your Assessment",
            onClick: () => console.log("Primary clicked"),
          }}
          secondaryButton={{
            label: "Explore Treatments",
            withArrow: true,
            onClick: () => console.log("Secondary clicked"),
          }}
        />
         <section className="pb-8 xl:pt-24 xl:pb-16 space-y-3 lg:space-y-0">
                <HowItWorksScrollCards items={items} />
                <div className='container max-w-7xl mx-auto flex justify-center'>
                <div className=' bg-neutral-50 inline-flex gap-2 lg:gap-4 px-2 lg:px-4 py-1.5 rounded-full flex-row justify-center items-center '>
                     <p className='lg:text-base text-sm'>No clinics</p>
                     <DotIcon/>
                     <p className='lg:text-base text-sm'>No waiting rooms</p>
                     <DotIcon/>
                     <p className='lg:text-base text-sm'>No confusion.</p>
                </div>
                </div>
              </section>
        
    <section className="container mx-auto max-w-7xl px-4 xl:px-8">
        <div className="space-y-5 lg:space-y-11">
          <h2 className="text-4xl sm:text-5xl xl:text-[54px] font-extrabold text-center text-neutral-900 ">
            Frequent Asked Question?
          </h2>
           <NEWFAQ/>
          {/* <FaqAccordion /> */}
        </div>
      </section>
    
    </>
  )
}

export default page
