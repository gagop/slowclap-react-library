# A/B Testing Context Provider for React

For A/B testing in React apps, this module offers a React context and provider. It determines which variant should be rendered to the user based on user IDs and variant weights, enabling feature rollouts and controlled experiments.

## Features

- **ExperimentContext**: A React context with a setter to update the active variant that is currently in use.
- **ExperimentProvider**: A provider component that gives the context access to the active variant by calculating it using the user ID and variant weights.

## Installation

You can copy the files directly or include them in your module bundler or package manager setup to incorporate this A/B testing module into your project.

```
npm install slowclap-react-library
```

## Usage

To use `ExperimentProvider` and `ExperimentContext`, wrap your component hierarchy with `ExperimentProvider` and pass the `userId` and `variants` as props.

### Example - preparing the experiment

```jsx
import { ExperimentProvider, Variant } from 'slowclap-react-library';

const App = () => {
  const userId = 'abc12'; // should be dynamically determined
  const variants = [
    { name: 'RedButton', weight: 50 },
    { name: 'BlueButton', weight: 50 },
  ];

  return (
    <>
      <h1>Experiment</h1>
      <ExperimentProvider userId={userId} variants={variants}>
        <Variant name="RedButton">
          <button style={{ backgroundColor: 'red' }}>Ok</button>
        </Variant>
        <Variant name="BlueButton">
          <button style={{ backgroundColor: 'blue' }}>Ok</button>
        </Variant>
      </ExperimentProvider>
    </>
  );
};

export default App;
```

### Example - using the context
Based on the context, we can determine the value of the selected variant and utilize the set method to manually adjust it.
```
import { useContext } from "react";
import { ExperimentContext } from "slowclap-react-library";

export const TestComponent: React.FC = () => {
  const experimentInfo = useContext(ExperimentContext);
  console.log(experimentInfo);
  //returns the value of the chosen variant and method which allow us to manually change the variant

  return <div>Some test component</div>;
};

```