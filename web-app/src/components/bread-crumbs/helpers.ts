import { BreadCrumb } from "./types";


/**
 * Returns an array of BreadCrumb objects from the current pathname.
 * 
 * @param {string} pathname The current pathname.
 * @returns {BreadCrumb[]} An array of BreadCrumb objects.
 */
function getBreadCrumbsFromPathname(pathname: string): BreadCrumb[] {
    const pathnames = pathname.split("/").filter((x) => x);

    if (pathnames.length <= 1) return [];

    const breadCrumbs: BreadCrumb[] = [];
    pathnames.forEach((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join("/")}`;
        breadCrumbs.push({
            title: pathnames[index].split("_").join(" ").toLocaleUpperCase(),
            route: url,
        });
    });

    return breadCrumbs;
}


export { getBreadCrumbsFromPathname };
