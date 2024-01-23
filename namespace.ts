// Add this at the top of your file
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}