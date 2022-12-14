import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import About from "../components/About";
import ContactMe from "../components/ContactMe";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";
import { Experience, PageInfo, Project, Skill, Social } from "../typings";
import { fetchExperience } from "../utils/fetchExperience";
import { fetchPageInfo } from "../utils/fetchPageInfo";
import { fetchProjects } from "../utils/fetchProjects";
import { fetchSkills } from "../utils/fetchSkills";
import { fetchSocials } from "../utils/fetchSocials";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[]; 
}

const Home = ({pageInfo ,experiences ,projects ,skills ,socials}: Props) => {
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80">
      <Head>
        <title>My portfolio</title>
      </Head>

      <Header socials={socials}/>

      <section id="hero" className="snap-center">
        <Hero pageInfo={pageInfo}/>
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo}/>
      </section>

      {/* Experience */}
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences}/>
      </section>

      {/* skill */}
      <section id="skills" className="snap-start">
        <Skills skills={skills}/>
      </section>

      {/* Projects */}
      <section id="projects" className="snap-start">
        <Projects />
      </section>

      {/* Contact Me */}
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img 
              className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer" 
              src="https://1.imgur.com/e2yvD6A.png" 
              alt="ArrowUp" />
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperience();
  const projects: Project[] = await fetchProjects();
  const skills: Skill[] = await fetchSkills();
  const socials: Social[] = await fetchSocials();
  
  return{
    props: {
      pageInfo,
      experiences,
      projects,
      skills,
      socials,
    },
    revalidate: 10,
  }
}