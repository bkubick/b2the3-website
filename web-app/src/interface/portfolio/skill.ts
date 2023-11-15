enum Technology {
    REACT='React',
    VUE='Vue',
    FLASK='Flask',
    PYTHON='Python',
    TYPESCRIPT='TypeScript',
    JAVASCRIPT='JavaScript',
    CPP='C++',
    JAVA='Java',
    ROS='ROS',
    MICROSOFT_OFFICE='Microsoft Office',
    MATLAB='MATLAB',
    SOLIDWORKS='SolidWorks',
    AUTOCAD='AutoCAD',
    GIT='Git',
    TKINTER='TKinter',
    DOCKER='Docker',
    BOOTSTRAP='Bootstrap',
    TAILWIND='Tailwind',
    SQL='SQL',
    MACHINE_LEARNING='Machine Learning',
    GENETIC_ALGORITHM='Genetic Algorithm',
    AI='AI',
    MATPLOTLIB='Matplotlib',
    NUMPY='Numpy',
    SKLEARN='Scikit Learn',
    PANDAS='Pandas'
}


enum ProfessionalSkill {
    TECHNICAL_DOCUMENTATION='Technical Documentation',
    PROBLEM_SOLVING='Problem Solving',
    SYSTEM_ARCHITECTURE='System Architecture',
    SOFTWARE_DEVELOPMENT='Software Development',
    PRESENTATIONS='Presentations',
    DATA_ANALYSIS='Data Analysis',
    TEAMWORK='Teamwork',
    LEADERSHIP='Leadership',
    MANUFACTURING='Manufacturing',
    TEACHING='Teaching',
    MACHINE_DESIGN='Machine Design',
    ENGINEERING_DRAWINGS='Engineering Drawings',
}


interface PersonalSkills {
    technologies: Technology[];
    frameworks: Technology[];
    professional: ProfessionalSkill[];
}


export { Technology, type PersonalSkills, ProfessionalSkill };
