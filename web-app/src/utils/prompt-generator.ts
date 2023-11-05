/**
 * @fileoverview This file contains the prompt generator function that will be used to generate the prompts
 * to be used in conjunction with the AI model.
 */


/**
 * This function generates the prompt to be used in conjunction with the AI model.
 * 
 * @param industries the industries that the user is interested in
 * @param hobbies the hobbies that the user is interested in
 * @param ideaDetails the details specific to the ideas that the user is interested in
 * @param personalDetails the details specific to the user that the user wants to be taken into account
 * @param passions the passions of the user
 * @param skills the skills of the user
 * @returns the prompt to be used in conjunction with the AI model
 */
function generateIdeaPrompt(industries: string[],
                            hobbies: string[],
                            ideaDetails?: string,
                            personalDetails?: string,
                            passions?: string[],
                            skills?: string[]): string {
    const industriesString: string = industries.join(', ');
    const hobbiesString: string = hobbies.join(', ');

    let prompt: string = `
        Please provide a list of startup ideas with explicit details about the idea, along with the
        reason for the idea.
        
        I am interested in the following industries: ${industriesString}. I am also
        interested in the following hobbies: ${hobbiesString}.
    `

    if (ideaDetails) {
        prompt += `

            Please take into account the following details about the ideas I am interested in
            pursuing: ${ideaDetails}.
        `
    }

    if (personalDetails) {
        prompt += `

            Please take into account the following details about the me to help
            tailor the ideas more to me: ${personalDetails}.
        `
    }

    if (passions && passions.length > 0) {
        prompt += `

            Please take into account the following passions of mine: ${passions.join(', ')}.
        `
    }

    if (skills && skills.length > 0) {
        prompt += `

            Please take into account the following skills of mine: ${skills.join(', ')}.
        `
    }

    return prompt;
}


/**
 * This function generates the prompt to be used in conjunction with the AI model
 * to generate a cover letter from user and job posting information.
 * 
 * @param position the position of the job posting
 * @param company the company of the job posting
 * @param jobDescription the job description of the job posting
 * @param personalExperiences the personal experiences of the user
 * @param coverLetterExamples the cover letter examples the user has provided
 * @returns the generated cover letter prompt.
 */
function generatorCoverLetterPrompt(position: string,
                                    company: string,
                                    jobDescription: string,
                                    personalExperiences: string,
                                    coverLetterExamples?: string[]): string {
    let prompt: string = `
        Please write a cover letter between 350 and 450 words for the following
        job posting for the position of ${position || '\"\"'} at ${company || '\"\"'}:

        Job Description:
        "${jobDescription}"
        
        There is no need to include a header or footer. The cover letter should be written
        in a professional manner and should be tailored to the job posting using the following
        experiences:

        My Experiences:
        "${personalExperiences}"\n
    `;

    if (coverLetterExamples && coverLetterExamples.length > 0) {
        prompt += `
            Please use my following cover letters that I have used in the
            past as a reference:\n\n
        `;

        coverLetterExamples.forEach((coverLetter, index) => {
            if (coverLetter) {
                prompt += `
                    Cover Letter Example ${index + 1}:\n
                    "${coverLetter}"\n\n
                `;
            }
        });
    
    }

    return prompt.trimStart();
};


export { generatorCoverLetterPrompt, generateIdeaPrompt };
