import { Technology } from './skill';
import { College } from './school';
import Company from './company';
import StartEndData from './StartEndDate';


interface Project extends StartEndData {
    title: string;
    details: string[];
    technologies: Technology[];
    link?: string;
    associatedWith?: College | Company;
    img?: string;
}


export type { Project };
