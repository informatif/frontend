declare module "react-dom" {
  export function createRoot(
    container: HTMLElement | null,
    options?: { hydrate?: boolean }
  ): { render: (element: JSX.Element) => void };
}
