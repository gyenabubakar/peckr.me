import { createFileRoute } from '@tanstack/react-router';

function App() {
  return (
    <main>
      <h1>Hello World!</h1>
    </main>
  );
}

export const Route = createFileRoute('/')({ component: App });
