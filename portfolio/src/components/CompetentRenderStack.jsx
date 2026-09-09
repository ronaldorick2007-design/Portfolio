import { useComponentRegistry } from '../hooks/useComponentRegistryStack';

export default function CompetentRenderStack({generator}) {
  const { refs,
          render,
          next,
          log,
          start,
          stop,
          running} = useComponentRegistry(generator);  

  return (
          <div
              style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
              }}
          >
              <div style={{ display: "flex",justifyContent:"center", gap: "10px" }}>
                  <button onClick={start}>
                      {running ? "Pause" : "Play"}
                  </button>
  
                  <button onClick={next}>
                      Step
                  </button>
  
                  <button onClick={stop}>
                      Stop
                  </button>
              </div>
              <div>{log}</div>
              {render()}
              
          </div>
      );
}