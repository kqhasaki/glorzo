import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "@glorzo-player/App";

async function main(): Promise<void> {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById("root")
  );
}

void main();
