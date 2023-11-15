interface HonorSociety {
    name: string;
    description: string;
    logo?: string;
    link?: string;
}


interface Honors {
    societies: HonorSociety[];
    awards: string[];
}


export type { Honors };
