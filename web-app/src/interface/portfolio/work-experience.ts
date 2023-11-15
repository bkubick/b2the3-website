import Company from 'src/interface/portfolio/company';
import { ProfessionalSkill, Technology } from './skill';


interface WorkExperience {
    jobTitle: string;
    company: Company;
    description: string;
    details: string[];
    startMonth: number;
    startYear: number;
    endMonth?: number;
    endYear?: number;
    technologies: Technology[];
    professionalSkills: ProfessionalSkill[];
}


export type { WorkExperience };
