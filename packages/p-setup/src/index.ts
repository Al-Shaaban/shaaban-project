import prompts from "prompts";
import { blue, black, green } from "kolorist";

type Framework = {
  name: string;
  display: string;
  color: (str: string | number) => string;
};

const FRAMEWORKS: Framework[] = [
  {
    name: "react",
    display: "React",
    color: blue,
  },
  {
    name: "next",
    display: "Next",
    color: black,
  },
  {
    name: "docusaurus",
    display: "Docusaurus",
    color: green,
  },
];

function validPackageName(projectName: string): string {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

async function setupProject() {
  try {
    const projectFramework = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "Project name:",
        initial: "shaaban-project",
      },
      {
        type: "select",
        name: "framework",
        message: "Select a framework:",
        choices: FRAMEWORKS.map((framework) => {
          return {
            title: framework.color(framework.display),
            value: framework.name,
          };
        }),
        initial: 0,
      },
    ]);

    console.table({
      projectName: validPackageName(projectFramework.projectName),
      framework: projectFramework.framework,
    });
  } catch (error) {
    console.log(error);
  }
}

setupProject();
