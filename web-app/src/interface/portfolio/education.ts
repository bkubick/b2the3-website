import { College } from 'src/interface/portfolio/school';
import StartEndData from './StartEndDate';
import { Technology } from './skill';


interface Course {
    name: string,
    technologies: Technology[],
}


interface Education extends StartEndData{
    school: College;
    degree: string;
    gpa: number;
    details: string[];
    honors: string[];
    clubs: string[];
    courses: Course[];
}

export type { Education };
