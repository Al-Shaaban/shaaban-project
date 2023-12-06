import fs from "node:fs";
import prompts from "prompts";
import { blue, black, green, yellow, cyan, reset, red } from "kolorist";

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
        name: "react-js-tw",
        display: "React + JS + Tailwind",
        color: yellow,
      },
      {
        name: "react-ts-tw",
        display: "React + TS + Tailwind",
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
        name: "next-js-tw",
        display: "Next + JS + Tailwind",
        color: yellow,
      },
      {
        name: "next-ts-tw",
        display: "Next + TS + Tailwind",
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

function isEmpty(path: string) {
  const files = fs.readdirSync(path, { recursive: true });
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function createProject({
  projectName,
  frameWork,
}: {
  projectName: string;
  frameWork: string;
}) {
  if (fs.existsSync(projectName)) {
    if (isEmpty(projectName)) {
      console.log(`creating project inside ${green(projectName)} folder.`);
      // todo: create project inside existing folder.
    } else {
      console.log(red("Project directory already exists"));
      console.log(
        yellow("Solution:"),
        `delete ${green(projectName)} folder and try again.`
      );
    }
  } else {
    fs.mkdirSync(projectName, { recursive: true });
    console.log(`created ${green(projectName)} with ${cyan(frameWork)}`);
  }
}

async function setupProject() {
  let projectSetUp: prompts.Answers<"projectName" | "framework" | "variant">;

  try {
    projectSetUp = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "Project name:",
        initial: "shaaban-project",
      },
      {
        type: "select",
        name: "framework",
        message: reset("Select a framework:"),
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
        message: reset("Select a variant:"),
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
      projectName: validPackageName(projectSetUp.projectName),
      pojectType: projectSetUp.variant,
    });

    createProject({
      frameWork: projectSetUp.variant,
      projectName: projectSetUp.projectName,
    });
  } catch (error) {
    console.log(error);
  }
}

setupProject();
