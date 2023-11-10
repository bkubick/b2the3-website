import { Technology } from 'src/interface/skill';
import { College } from 'src/interface/school';
import Company from './company';
import StartEndData from './StartEndDate';


interface Project extends StartEndData {
    title: string;
    details: string[];
    technologies: Technology[];
    link?: string;
    associatedWith?: College | Company;
}


export type { Project };
