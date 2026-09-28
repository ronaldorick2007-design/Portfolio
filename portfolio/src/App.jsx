import ScopeVisual from "./ScopeVisual";
import { main } from "./code";

export default function App() {

  return (
    <ScopeVisual
      generator={main}
    />
  );
}