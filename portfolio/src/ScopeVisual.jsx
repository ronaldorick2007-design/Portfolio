import {
  useRef,
  useState
} from "react";

import useScope from "./useScope";
import useIndication from "./useIndication";
import useVisual from "./useVisual";



/* =========================================================
   USE BOX
========================================================= */

function useBox(generator) {

  const {
    grid,
    write,
    addScope,
    removeScope
  } = useScope();


  const {
    flashSpot,
    indications,
    indicate,
    clearIndication,
    clearAll
  } = useIndication();


  const {
    visuals,
    visual,
    clearVisual
  } = useVisual();


  /*
    LOGS
  */

  const [
    logs,
    setLogs
  ] = useState([]);


  const gen =
    useRef(
      generator()
    );



  /* =======================================================
     NEXT
  ======================================================= */

  const next = () => {

    const result =
      gen.current.next();


    /* =====================================================
       GENERATOR DONE
    ===================================================== */

    if (result.done) {

      console.log("DONE");

      return;

    }


    const data =
      result.value;


    /* =====================================================
       LOG
    ===================================================== */

    if (
      data.action === "log"
    ) {

      setLogs(prev => [
        ...prev,
        data.message
      ]);

      return;

    }


    /* =====================================================
       FUNCTION ADD
    ===================================================== */

    if (
      data.type === "function-add"
    ) {

      addScope(
        data.scope
      );

      return;

    }


    /* =====================================================
       FUNCTION REMOVE
    ===================================================== */

    if (
      data.type === "function-rm"
    ) {

      removeScope(
        data.scope
      );

      return;

    }


    /* =====================================================
       INDICATION
    ===================================================== */

    if (
      data.action === "indicate"
    ) {

      indicate(
        data.name,
        data.value,
        data.index,
        data.array
      );

      return;

    }


    /* =====================================================
       CLEAR INDICATION
    ===================================================== */

    if (
      data.action === "clear-indicate"
    ) {

      clearIndication(
        data.name
      );

      return;

    }


    /* =====================================================
       VISUAL
    ===================================================== */

    if (
      data.action === "visual"
    ) {

      visual(
        data.element,
        data.type,
        data.value
      );

      return;

    }


    /* =====================================================
       NORMAL WRITE
    ===================================================== */

    write(
      data.scope,
      data.name,
      data.value,
      data.type
    );

  };



  return {

    next,

    grid,

    visuals,

    flashSpot,

    indications,

    clearIndication,

    clearVisual,

    clearAll,

    logs

  };

}



/* =========================================================
   DISPLAY VALUE
========================================================= */

function DisplayValue({

  value,

  type,

  indications,

  flashSpot

}) {


  /* =======================================================
     PRIMITIVE
  ======================================================= */

  if (
    type === "primitive"
  ) {

    return (

      <span>

        {value?.toString()}

      </span>

    );

  }



  /* =======================================================
     ARRAY
  ======================================================= */

  if (
    type === "array"
  ) {

    return (

      <div

        style={{

          display: "flex",

          gap: 8,

          flexWrap: "wrap",

          padding: 5

        }}

      >

        {value.map(

          (item, index) => {


            /* ---------------------------------------------
               OBJECT INDICATION
            --------------------------------------------- */

            const objectHighlighted =

              indications.has(
                item
              );


            /* ---------------------------------------------
               ARRAY POSITION INDICATION
            --------------------------------------------- */

            const arrayHighlighted =

              [
                ...flashSpot.values()
              ].some(

                indication =>

                  indication &&

                  typeof indication === "object" &&

                  indication.array === value &&

                  indication.index === index

              );


            /* ---------------------------------------------
               EITHER ONE
            --------------------------------------------- */

            const highlighted =

              objectHighlighted ||

              arrayHighlighted;


            return (

              <div

                key={index}

                style={{

                  minWidth: 50,

                  minHeight: 50,

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  background:

                    highlighted

                      ? "#fecaca"

                      : "#bfdbfe",

                  border:

                    highlighted

                      ? "2px solid red"

                      : "2px solid #222",

                  borderRadius: 8,

                  padding: 5,

                  boxSizing: "border-box"

                }}

              >

                {String(item)}

              </div>

            );

          }

        )}

      </div>

    );

  }



  /* =======================================================
     CLASS
  ======================================================= */

  if (
    type === "CLASS"
  ) {

    return (

      <div

        style={{

          display: "flex",

          flexDirection: "column",

          gap: 6

        }}

      >

        {Object.keys(

          value || {}

        ).map(

          key => (

            <div

              key={key}

              style={{

                display: "flex",

                gap: 10,

                padding: "5px 8px",

                background: "#f8fafc",

                border: "1px solid #cbd5e1",

                borderRadius: 6

              }}

            >

              <strong>

                {key}

              </strong>

              <span>

                {String(
                  value[key]
                )}

              </span>

            </div>

          )

        )}

      </div>

    );

  }



  /* =======================================================
     DEFAULT
  ======================================================= */

  return (

    <span>

      {String(value)}

    </span>

  );

}



/* =========================================================
   TREE NODE
========================================================= */

function TreeNode({

  node,

  indications

}) {

  if (!node) {

    return null;

  }


  const highlighted =
    indications.has(node);


  return (

    <div

      style={{

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        gap: 15

      }}

    >

      {/* NODE */}

      <div

        style={{

          minWidth: 55,

          minHeight: 55,

          padding: 8,

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          borderRadius: "50%",

          background:

            highlighted

              ? "#fecaca"

              : "#dbeafe",

          border:

            highlighted

              ? "3px solid red"

              : "2px solid #222",

          boxSizing: "border-box"

        }}

      >

        {node.data}

      </div>



      {/* CHILDREN */}

      <div

        style={{

          display: "flex",

          gap: 60,

          alignItems: "flex-start"

        }}

      >

        {/* LEFT */}

        <div>

          {node.left && (

            <TreeNode

              node={node.left}

              indications={indications}

            />

          )}

        </div>


        {/* RIGHT */}

        <div>

          {node.right && (

            <TreeNode

              node={node.right}

              indications={indications}

            />

          )}

        </div>

      </div>

    </div>

  );

}



/* =========================================================
   TREE VISUAL
========================================================= */

function TreeVisual({

  root,

  indications

}) {

  if (!root) {

    return (

      <div>

        Empty tree

      </div>

    );

  }


  return (

    <div

      style={{

        display: "flex",

        justifyContent: "center",

        padding: 20,

        overflowX: "auto"

      }}

    >

      <TreeNode

        node={root}

        indications={indications}

      />

    </div>

  );

}



/* =========================================================
   VISUALIZE
========================================================= */

function Visualize({
  grid,
  visuals,
  indications,
  flashSpot
}) {
  const heap = grid.find((row) => row[0] === "heap");

  const stack = grid.filter((row) => row[0] !== "heap");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1.5fr",
        gap: 20,
        width: "100%",
        alignItems: "start"
      }}
    >

      {/* ================= HEAP ================= */}

      <div
        style={{
          border: "2px solid #222",
          borderRadius: 16,
          padding: 20,
          background: "#fff",
          minHeight: 200
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 15
          }}
        >
          Heap
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          {heap &&
            heap.slice(1).map((variable, index) => {
              const [name, value, type] = variable;

              const highlighted =
                indications.has(value);

              return (
                <div
                  key={index}
                  style={{
                    minWidth: 100,
                    minHeight: 70,
                    padding: 12,
                    background: highlighted
                      ? "#fecaca"
                      : "#dbeafe",
                    border: highlighted
                      ? "2px solid red"
                      : "2px solid #222",
                    borderRadius: 12,
                    boxSizing: "border-box"
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: 8
                    }}
                  >
                    {name}
                  </div>

                  <DisplayValue
                    value={value}
                    type={type}
                    indications={indications}
                    flashSpot={flashSpot}
                  />
                </div>
              );
            })}
        </div>
      </div>


      {/* ================= FUNCTION STACK ================= */}

      <div
        style={{
          border: "2px solid #222",
          borderRadius: 16,
          padding: 20,
          background: "#fff"
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 15
          }}
        >
          Function Stack
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}
        >
          {stack
            .slice()
            .reverse()
            .map((row, rowIndex) => {
              const scope = row[0];

              return (
                <div
                  key={rowIndex}
                  style={{
                    border: "2px solid #222",
                    borderRadius: 12,
                    padding: 12,
                    background: "#dbeafe"
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: 10
                    }}
                  >
                    {scope}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10
                    }}
                  >
                    {row.slice(1).map(
                      (variable, index) => {
                        const [
                          name,
                          value,
                          type
                        ] = variable;

                        const highlighted =
                          indications.has(value);

                        return (
                          <div
                            key={index}
                            style={{
                              minWidth: 100,
                              padding: 10,
                              background:
                                highlighted
                                  ? "#fecaca"
                                  : "#fff",
                              border:
                                highlighted
                                  ? "2px solid red"
                                  : "2px solid #222",
                              borderRadius: 8
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "bold"
                              }}
                            >
                              {name}
                            </div>

                            <DisplayValue
                              value={value}
                              type={type}
                              indications={
                                indications
                              }
                              flashSpot={
                                flashSpot
                              }
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>


      {/* ================= VISUALS ================= */}

      <div
        style={{
          border: "2px solid #222",
          borderRadius: 16,
          padding: 20,
          background: "#fff"
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 15
          }}
        >
          Visuals
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20
          }}
        >
          {[...visuals.entries()].map(
            ([element, visual]) => {
              if (visual.type !== "tree") {
                return null;
              }

              return (
                <div
                  key={element}
                  style={{
                    border: "2px solid #222",
                    borderRadius: 16,
                    padding: 15,
                    background: "#dbeafe",
                    overflowX: "auto"
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: 10
                    }}
                  >
                    {element}
                  </div>

                  <TreeVisual
                    root={visual.value}
                    indications={indications}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>

    </div>
  );
}



/* =========================================================
   SCOPE VISUAL
========================================================= */

export default function ScopeVisual({

  generator

}) {

  const {

    next,

    grid,

    visuals,

    flashSpot,

    indications,

    clearIndication,

    clearVisual,

    clearAll,

    logs

  } =

    useBox(
      generator
    );


  return (

    <div

      style={{

        width: "100%",

        padding: 20,

        boxSizing: "border-box"

      }}

    >

      {/* ===================================================
          CONTROLS + LOGS
      =================================================== */}

      <div

        style={{

          display: "flex",

          alignItems: "flex-start",

          gap: 15,

          marginBottom: 20

        }}

      >

        {/* NEXT */}

        <button

          onClick={next}

          style={{

            padding: "10px 20px",

            fontSize: 16,

            cursor: "pointer",

            flexShrink: 0

          }}

        >

          NEXT

        </button>



        {/* LOG */}

        <div

          style={{

            display: "flex",

            flexDirection: "column",

            gap: 4,

            paddingTop: 5,

            fontFamily: "monospace",

            fontSize: 14

          }}

        >

          {logs.map(

            (log, index) => (

              <div key={index}>

                {log}

              </div>

            )

          )}

        </div>

      </div>



      {/* ===================================================
          VISUALIZER
      =================================================== */}

      <Visualize

        grid={grid}

        visuals={visuals}

        indications={indications}

        flashSpot={flashSpot}

      />

    </div>

  );

}