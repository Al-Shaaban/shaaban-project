import prompts from "prompts";

type Framework = {
  name: string;
  display: string;
};

const FRAMEWORKS: Framework[] = [
  {
    name: "react",
    display: "React",
  },
  {
    name: "next",
    display: "Next",
  },
  {
    name: "docusaurus",
    display: "Docusaurus",
  },
];

async function setupProject() {
  try {
    const projectFramework = await prompts({
      type: "select",
      name: "framework",
      message: "Select a framework:",
      choices: FRAMEWORKS.map((framework) => {
        return {
          title: framework.display,
          value: framework.name,
        };
      }),
    });

    console.log(projectFramework.framework);
  } catch (error) {
    console.log(error);
  }
}

setupProject();
