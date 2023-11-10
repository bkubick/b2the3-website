import Company from 'src/interface/company';
import { ProfessionalSkill, Technology } from '../interface/skill';


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
