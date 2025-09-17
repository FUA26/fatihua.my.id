import { BiLogoPostgresql } from 'react-icons/bi'
import { BsFillBootstrapFill } from 'react-icons/bs'
import {
  SiClickup,
  SiCss3,
  SiDocker,
  SiExpress,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiJest,
  SiJira,
  SiLaravel,
  SiMdx,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPhp,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSass,
  SiStorybook,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'

type StacksProps = Record<string, React.ReactNode>

const iconSize = '100%'

export const STACKS: StacksProps = {
  PHP: <SiPhp size={iconSize} className="text-blue-500" />,
  HTML: <SiHtml5 size={iconSize} className="text-amber-600" />,
  CSS: <SiCss3 size={iconSize} className="text-blue-500" />,
  JavaScript: <SiJavascript size={iconSize} className="text-yellow-400" />,
  TypeScript: <SiTypescript size={iconSize} className="text-blue-400" />,
  PostgreSql: <BiLogoPostgresql size={iconSize} className="text-blue-400" />,
  MonggoDB: <SiMongodb size={iconSize} className="text-green-700" />,
  MySql: <SiMysql size={iconSize} className="text-blue-500" />,
  Prisma: <SiPrisma size={iconSize} className="text-teal-500" />,

  'Node JS': <SiNodedotjs size={iconSize} className="text-green-600" />,
  Laravel: <SiLaravel size={iconSize} className="text-red-600" />,
  'Next.js': <SiNextdotjs size={iconSize} />,
  'React.js': <SiReact size={iconSize} className="text-sky-500" />,
  'Nest.js': <SiNestjs size={iconSize} className="text-red-600" />,
  Vite: <SiVite size={iconSize} className="text-yellow-500" />,
  'Express.js': <SiExpress size={iconSize} />,

  TailwindCSS: <SiTailwindcss size={iconSize} className="text-cyan-300" />,
  Bootstrap: (
    <BsFillBootstrapFill size={iconSize} className="text-purple-500" />
  ),
  'Material UI': <SiMui size={iconSize} className="text-sky-400" />,
  SASS: <SiSass size={iconSize} className="text-pink-600" />,
  RadixUi: <SiRadixui size={iconSize} />,

  Storybook: <SiStorybook size={iconSize} className="text-pink-500" />,
  Swangger: <SiSwagger size={iconSize} className="text-lime-500" />,
  Mdx: <SiMdx size={iconSize} />,

  Jest: <SiJest size={iconSize} className="text-orange-600" />,
  'GitHub Action': <SiGithubactions size={iconSize} />,
  Jenkins: <SiJenkins size={iconSize} />,
  Github: <SiGithub size={iconSize} />,
  Docker: <SiDocker size={iconSize} className="text-blue-500" />,

  Redux: <SiRedux size={iconSize} className="text-purple-500" />,
  'React Query': <SiReactquery size={iconSize} className="text-red-600" />,

  Jira: <SiJira size={iconSize} className="text-blue-500" />,
  Clickup: <SiClickup size={iconSize} />,
  Notion: <SiNotion size={iconSize} />,
}
