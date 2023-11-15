# B<sup>3</sup> (Brandon Kubick) Personal Website

## Description
A centralized personal website for me (Brandon Kubick) consisting of various/random react apps I have built and tools I use every so often.

## Description
A centralized personal website for me (Brandon Kubick) consisting of various/random react apps I have built to include:
- **Personal Portfolio**: My personal portfolio that highlights my work experiences, personal projects, and various skills I have acquired.
- **Cover Letter Generator**: An application that uses OpenAI's ChatGPT to generate cover letters for a given job post based off your custom experiences, skills, and previous cover letters.
- **Startup Idea Generator**: An application that uses OpenAI's ChatGPT to generate startup ideas based on inputs

This app was deployed to Amazon Web Services (AWS) using AWS Amplify.

## Tech Stack
<img style="padding-right:20px;" align=left alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img style="padding-right:20px;" align=left alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<img style="padding-right:20px;" align=left alt="Webpack" src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black"/>
<img style="padding-right:20px;" align=left alt="Tailwind" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img style="padding-right:20px;" align=left alt="ChatGPT" src="https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white"/>
<img alt="AWS" style="padding-right:20px;" align=left src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
<img alt="Framer" style="padding-right:20px" align=left src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue"/>
<img alt="React Router" style="padding-right:20px" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>

## Creating
This App was built using React.js, TypeScript, and Webpack. To setup the project, direct to the `web-app` directory and run the following commands.

```
npm install
```

## Running
To start the app on local, run the following command from the my-app (name to change soon) directory.

```
npm start
```

## Application

The application consists of various tools, dashboards, etc that I use every so often. This is an ongoing project and is the root repository for any new tools or quick apps I want to create.

### Personal Portfolio
My Engineering Portfolio is a website built using a React, TypeScript, and Tailwind frontend, that highlights my work experiences, personal projects, and various skills I have acquired through each experience.

As I build out my skillset, I need a centralized location that highlights my experience, projects, and skills. To me, the best way to fully broadcast my skills was to build out a personal website that will house summaries of all my current and previous work, along with the skills that each experience exemplifies.


### Tools

#### 1. Cover Letter Generator
The application uses ChatGPT to generate a cover letter based off form information. You decide the OpenAI model to use based off the complexity of the Cover Letter to be generated.

It takes in details on the position, your background experiences, and reference cover letters, then generates a prompt (can be viewed on the `Prompt` tab) to pass to the corresponding ChatGPT model. Once the response is received, the generated Cover Letter is displayed under the `Cover Letter` tab.

As of now, the prompt is auto-generated and has limited scope on additional ways of phrasing the prompt. As I hash out the best ways to phrase the prompt, I will make this more customizable.

#### 2. Startup Idea Generator

The application uses ChatGPT to generate startup ideas based off form information.

It takes in details about what industry/type of the startup ideas, along with personal information to help tailor the ideas to the individual.
