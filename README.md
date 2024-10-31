# next-comp-cli

A CLI tool to quickly scaffold Next.js components with TypeScript support, optional CSS modules, and unit tests.

## Installation

Install the package globally:

```bash
$ npm install -g next-comp-cli
```

## Usage

Navigate to your Next.js project directory and run:

```bash
$ gnc
```

Follow the prompts to specify:

- Component name
- Whether to include React hooks
- Whether to add a CSS module for styling
- Props for the component (comma-separated list)

### Defining Props

When prompted for props, you can enter a comma-separated list of property names (e.g., title, onClick, disabled). Each prop will be typed as string by default in the generated component file. You can easily update the types later if different types are needed.

```bash
$ gnc

✔ What is the name of your component? Button
✔ Do you want to include React hooks? yes
✔ Do you want to include a CSS module? yes
✔ List component props (comma-separated, e.g., name:string, age:number): label: string, onClick: () => void, disabled: boolean

Component Button generated successfully!
```

This will generate a folder `components/Button` with:

- `Button.tsx`
- `Button.module.css`
- `Button.test.tsx`

In `Button.tsx`, the interface `ButtonProps` will include the specified props;

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
}
```

## Development

To set up the project for development:

1. Clone the repository
2. Install the dependencies

```bash
$ npm install
```

3. Build the project

```bash
$ npm run build
```

4. Link the package locally for testing

```bash
$ npm link
```

Now you can run gnc locally to test any changes.
