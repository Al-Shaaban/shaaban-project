import prompts from "prompts";
import { blue, black, green, yellow, cyan } from "kolorist";

type FrameworkPropperties = {
  name: string;
  display: string;
  color: (str: string | number) => string;
};

type Framework = FrameworkPropperties & {
  variants: FrameworkPropperties[];
};

const FRAMEWORKS: Framework[] = [
  {
    name: "react",
    display: "React",
    color: blue,
    variants: [
      {
        name: "react-js",
        display: "React + JS",
        color: yellow,
      },
      {
        name: "react-ts",
        display: "React + TS",
        color: cyan,
      },
    ],
  },
  {
    name: "next",
    display: "Next",
    color: black,
    variants: [
      {
        name: "next-js",
        display: "Next + JS",
        color: yellow,
      },
      {
        name: "next-ts",
        display: "Next + TS",
        color: cyan,
      },
    ],
  },
  {
    name: "docusaurus",
    display: "Docusaurus",
    color: green,
    variants: [
      {
        name: "docusaurus-js",
        display: "Docusaurus + JS",
        color: yellow,
      },
      {
        name: "docusaurus-ts",
        display: "Docusaurus + TS",
        color: cyan,
      },
    ],
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
            value: framework,
          };
        }),
        initial: 0,
      },
      {
        type: "select",
        name: "variant",
        message: "Select a variant:",
        choices: (prev: Framework) => {
          return prev.variants.map((variant) => {
            return {
              title: variant.color(variant.display),
              value: variant.name,
            };
          });
        },
        initial: 0,
      },
    ]);

    console.table({
      projectName: validPackageName(projectFramework.projectName),
      pojectType: projectFramework.variant,
    });
  } catch (error) {
    console.log(error);
  }
}

setupProject();
