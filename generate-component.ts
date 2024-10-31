import * as fs from "fs/promises";
import * as path from "path";
import inquirer from "inquirer";

interface ComponentOptions {
  name: string;
  useHooks: boolean;
  useCSSModule: boolean;
  props: string;
}

export async function generateComponent(): Promise<void> {
  const answers: ComponentOptions = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your component?",
      validate: (input: string) =>
        input.trim() !== "" || "Component name is required",
    },
    {
      type: "confirm",
      name: "useHooks",
      message: "Do you want to include React hooks?",
      default: false,
    },
    {
      type: "confirm",
      name: "useCSSModule",
      message: "Do you want to include a CSS module?",
      default: true,
    },
    {
      type: "input",
      name: "props",
      message:
        "List component props (comma-separated, e.g., name:string, age:number):",
      default: "",
    },
  ]);

  const componentName = answers.name;
  const componentDir = path.join(process.cwd(), "components", componentName);

  try {
    await fs.mkdir(componentDir, { recursive: true });

    // generate component file
    const componentContent = generateComponentContent(
      componentName,
      answers.useHooks,
      answers.useCSSModule,
      answers.props
    );
    await fs.writeFile(
      path.join(componentDir, `${componentName}.tsx`),
      componentContent
    );

    // generate CSS module, if required
    if (answers.useCSSModule) {
      const cssContent = generateCSSContent();
      await fs.writeFile(
        path.join(componentDir, `${componentName}.module.css`),
        cssContent
      );
    }

    // generate test file
    const testContent = generateTestContent(componentName);
    await fs.writeFile(
      path.join(componentDir, `${componentName}.test.tsx`),
      testContent
    );

    console.log(`Component ${componentName} generated successfully!`);
  } catch (error) {
    console.error("Error generating component:", error);
  }
}

function generateComponentContent(
  name: string,
  useHooks: boolean,
  useCSSModule: boolean,
  props: string
): string {
  const hooks = useHooks ? "import { useState } from 'react';" : "";
  const cssImport = useCSSModule
    ? `import styles from './${name}.module.css';`
    : "";

  const propTypes = props
    .split(",")
    .map((prop) => prop.trim())
    .map((prop) => `${prop};`)
    .join("\n ");

  return `import React from 'react';
${hooks}
${cssImport}

interface ${name}Props {
  ${propTypes || "// Define your props here"}
}

const ${name}: React.FC<${name}Props> = () => {
  ${useHooks ? 'const [state, setState] = useState<string>("");' : ""}

  return (
    <div${useCSSModule ? " className={styles.container}" : ""}>
      <h1>${name} Component</h1>
    </div>
  );
};

export default ${name};
`;
}

function generateCSSContent(): string {
  return `.container {
  /* Add your styles here */
}
`;
}

function generateTestContent(name: string): string {
  return `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${name} from './${name}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />);
    expect(screen.getByText('${name} Component')).toBeInTheDocument();
  });
});
`;
}
