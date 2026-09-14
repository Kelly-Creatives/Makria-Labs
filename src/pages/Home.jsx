import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Insights from '../components/Insights';
import CTA from '../components/CTA';

import { servicesData, portfolioData, processData, testimonialsData, blogData } from '../data';

export default function Home() {
  return (
    <>
      <Hero />
      <Services data={servicesData} />
      <About />
      <Portfolio data={portfolioData} />
      <Process data={processData} />
      <Testimonials data={testimonialsData} />
      <Insights data={blogData} />
      <CTA />
    </>
  );
}
