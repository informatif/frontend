declare module "react-dom" {
  export function unstable_createRoot(
    container: HTMLElement | null,
    options?: { hydrate?: boolean }
  ): { render: (element: JSX.Element) => void };
}
