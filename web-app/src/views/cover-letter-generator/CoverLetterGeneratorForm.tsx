import { ErrorMessage, Formik, Form, Field, FieldArray } from 'formik';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';

import { fieldTypes, InputField, RadioGroup, TextareaField } from 'src/components/form/fields';
import { Error, Required } from 'src/components/form/validation';

import * as AI from 'src/ai';
import { generatorCoverLetterPrompt } from 'src/utils/prompt-generator';


interface FormValues {
    gptModel: string;
    apiToken: string;
    position: string;
    company: string;
    experiences: string;
    jobDescription: string;
    exampleCoverLetters: string[];
}


interface Props {
    generatingHandler: (generating: boolean) => void;
    generatedCoverLetterHandler: (idea: string) => void;
}


interface State {}


class CoverLetterGeneratorForm extends React.Component<Props, State> {

    GPT_MODEL_OPTIONS: fieldTypes.Option[] = [
        { label: AI.GPTModel.GPT_35_TURBO, value: AI.GPTModel.GPT_35_TURBO },
        { label: AI.GPTModel.GPT_35_TURBO_16K, value: AI.GPTModel.GPT_35_TURBO_16K },
        { label: AI.GPTModel.GPT_4, value: AI.GPTModel.GPT_4 },
    ]

    INITIAL_FORM_VALUES: FormValues = {
        gptModel: AI.GPTModel.GPT_4,
        apiToken: '',
        position: '',
        company: '',
        experiences: '',
        jobDescription: '',
        exampleCoverLetters: [''],
    }

    FORM_VALIDATION_SCHEMA = Yup.object().shape({
        exampleCoverLetters: Yup.array().max(3, 'Max of 3 Cover Letters'),
    });

    constructor(props: Props) {
        super(props);
        this.state = {
            submitting: false,
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Form submission handler to generate the cover letter from the form values.
     * 
     * @param values   The form values.
     * @param actions   The form actions.
     */
    async onSubmit(values: FormValues, actions: any): Promise<void> {
        this.props.generatingHandler(true);
        console.log('VALUES: \n\n', values)
        const prompt = generatorCoverLetterPrompt(values.position,
                                                  values.company,
                                                  values.jobDescription,
                                                  values.experiences,
                                                  values.exampleCoverLetters || []);
        console.log('PROMPT: \n\n', prompt);
        const model = new AI.ChatGPT(values.apiToken);

        let coverLetter: string = 'Coudn\'t generate cover letter.... Check your API token and please try again.';
        try {
            const response = await model.ask(prompt, values.gptModel, 1);
            coverLetter = response.choices[0].message.content;
        }
        catch (err) {
            console.log('ERROR: ', err);
        }

        this.props.generatedCoverLetterHandler(coverLetter);

        actions.setSubmitting(false);
        this.props.generatingHandler(false);
    }

    /**
     * Renders the idea generator form.
     * 
     * @returns  The idea generator form.
     */
    render(): ReactElement {
        return (
            <Formik initialValues={ this.INITIAL_FORM_VALUES } onSubmit={ this.onSubmit } validationSchema={ this.FORM_VALIDATION_SCHEMA }>
                <Form className='w-full'>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Chat GPT Model:
                        </div>
                        <Field name="gptModel" className="flex" options={ this.GPT_MODEL_OPTIONS } component={ RadioGroup } validate={ Required }/>
                        <ErrorMessage name="gptModel"/>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Position Details
                            <div className='text-sm font-light'>
                                List the position and company name you are applying for. Also, include the job description
                                for the position. You can rephrase or only include the important parts of the job description
                                you know you have experience with.
                            </div>
                        </div>
                        <div className='mb-4'>
                            <Field name="position" placeholder="Job Position" className="input" component={ InputField } validate={ Required }/>
                            <ErrorMessage name="position"/>
                        </div>
                        <div className='mb-4'>
                            <Field name="company" placeholder="Company Name" className="input" component={ InputField } validate={ Required }/>
                            <ErrorMessage name="company"/>
                        </div>
                        <div className='mb-4'>
                            <Field name="jobDescription" placeholder="Job Description" className="textarea-input w-full" component={ TextareaField } validate={ Required }/>
                            <ErrorMessage name="jobDescription"/>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Your Experiences
                            <div className='text-sm font-light'>
                                Write out all of your work experiences you have. Try to be descriptive and keep it
                                specific to the job posting. This will help the chatbot generate a more accurate cover letter.
                            </div>
                        </div>
                        <Field name="experiences" className="textarea-input w-full" placeholder="Work experiences, projects, etc." component={ TextareaField } validate={ Required }/>
                        <ErrorMessage name="experiences"/>
                    </div>
                    <div className='mb-4'>
                        <FieldArray name="exampleCoverLetters">
                            {(props) => (
                                <div>
                                    <div className='flex'>
                                        <div className='mb-4 text-lg font-medium text-slate-300'>
                                            Cover Letter Examples
                                            <div className='text-sm font-light'>
                                                Please give some example cover letters you have used in the past. This will be
                                                used as a reference for the chatbot to generate a more accurate cover letter.
                                                Max of 3 Cover Letters.
                                            </div>
                                        </div>
                                        <div className='flex ml-4'>
                                            <button type="button" className='mr-4 text-2xl' onClick={() => props.push('')}>
                                                +
                                            </button>
                                            <button type="button" className='text-2xl' onClick={() => {props.remove(props.form.values.exampleCoverLetters.length - 1)}}>
                                                -
                                            </button>
                                        </div>
                                    </div>
                                    {props.form.values.exampleCoverLetters.map((_: any, index: number) => (
                                        <div key={index} className={index != props.form.values.exampleCoverLetters.length - 1 ? 'mb-4' : ''}>
                                            <Field name={`exampleCoverLetters[${index}]`} placeholder="Example Cover Letter" className="textarea-input w-full" component={ TextareaField }/>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FieldArray>
                        <ErrorMessage name="exampleCoverLetters">
                            { (msg) => (typeof msg === 'string' ? Error(msg) : null) }
                        </ErrorMessage>
                    </div>
                    <div className='pb-6'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Chat GPT API Token
                            <div className='text-sm font-light'>
                                In order to generate the cover letter, you need to provide a Chat GPT API token.
                                If you do not have a token set up, you can set one up from the &nbsp;
                                <a href='https://platform.openai.com/' target='_blank' rel='noreferrer' className='text-blue-400 hover:underline'>website</a>.
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <div className='w-full pr-4'>
                                <Field type="password" name="apiToken" placeholder="Token..." className="input" component={ InputField } validate={ Required } />
                            </div>
                            <button className='btn-sm btn-primary-outline' type="submit">Submit</button>
                        </div>
                        <ErrorMessage name="apiToken"/>
                    </div>
                </Form>
            </Formik>
        )
    }
}


export default CoverLetterGeneratorForm;
