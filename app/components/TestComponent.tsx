// Test file with multiple issues
import React from 'react';

const TestComponent = () => {
  const unusedVariable = 'test';
  const badFormatting = 'bad';

  return (
    <div>
      <h1>Test</h1>
      <p>Bad formatting</p>
    </div>
  );
};

export default TestComponent;
