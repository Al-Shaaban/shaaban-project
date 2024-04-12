import fs from "node:fs";
import path from "node:path";
import { black, blue, cyan, green, red, reset, yellow } from "kolorist";
import prompts from "prompts";

type FrameworkPropperties = {
  name: string;
  display: string;
  color: (str: string | number) => string;
};

type Framework = FrameworkPropperties & {
  variants: FrameworkPropperties[];
};

const cwd = process.cwd();
const FRAMEWORKS: Framework[] = [
  {
    name: "react",
    display: "React",
    color: blue,
    variants: [
      {
        name: "react-vite-ts-tw",
        display: "Vite",
        color: cyan,
      },
    ],
  },
];
const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
};

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
  const root = path.join(cwd, projectName);
  const template = `template-${frameWork}`;

  if (!fs.existsSync(root)) fs.mkdirSync(projectName, { recursive: true });

  if (!isEmpty(root)) {
    console.log(red("Project directory already exists"));
    console.log(
      yellow("Solution:"),
      `delete ${green(projectName)} folder and try again.`,
    );

    return;
  }

  const files = fs.readdirSync(template);

  function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file);
      const destFile = path.resolve(destDir, file);
      copy(srcFile, destFile);
    }
  }

  function copy(src: string, dest: string) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(template, file), targetPath);
    }
  };

  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  console.log(`created ${green(projectName)} with ${cyan(frameWork)}`);
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

    createProject({
      frameWork: projectSetUp.variant,
      projectName: projectSetUp.projectName,
    });

    console.table({
      projectName: validPackageName(projectSetUp.projectName),
      pojectType: projectSetUp.variant,
    });
  } catch (error) {
    console.log(error);
  }
}

async function addComponent() {
  const componentChoices = ["Header", "Footer", "Sidebar"];

  const { componentName } = await prompts({
    type: "select",
    name: "componentName",
    message: "Select a component to add:",
    choices: componentChoices.map((name) => ({ title: name, value: name })),
  });

  // Create file and add component logic here
  console.log(`Adding ${green(componentName)} component.`);
}

async function main() {
  const { action } = await prompts({
    type: "select",
    name: "action",
    message: "What do you want me to help you with today?",
    choices: [
      { title: "Setup a project", value: "setup" },
      { title: "Add a component", value: "addComponent" },
    ],
  });

  if (action === "setup") await setupProject();
  else if (action === "addComponent") await addComponent();
}

main();
