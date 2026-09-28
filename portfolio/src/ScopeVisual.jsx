import { useRef } from "react";

import useScope from "./useScope";
import useIndication from "./useIndication";


/* =========================================================
   EXECUTION
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


  const gen =
    useRef(generator());


  /* =======================================================
     NEXT
  ======================================================= */

  function next() {

    const result =
      gen.current.next();


    /* -------------------------------------------------------
       GENERATOR FINISHED
    ------------------------------------------------------- */

    if (result.done) {

      console.log("DONE");

      return;
    }


    const data =
      result.value;


    /* =======================================================
       FUNCTION ADD
    ======================================================= */

    if (
      data.type === "function-add"
    ) {

      addScope(
        data.scope
      );

      return;
    }


    /* =======================================================
       FUNCTION REMOVE
    ======================================================= */

    if (
      data.type === "function-rm"
    ) {

      removeScope(
        data.scope
      );

      return;
    }


    /* =======================================================
       INDICATION
    ======================================================= */

    if (
      data.action === "indicate"
    ) {

      indicate(
        data.name,
        data.value
      );

      return;
    }


    /* =======================================================
       NORMAL VALUE
    ======================================================= */

    write(
      data.scope,
      data.name,
      data.value,
      data.type
    );

  }


  return {

    next,

    grid,

    flashSpot,

    indications,

    clearIndication,

    clearAll

  };

}


/* =========================================================
   VALUE
========================================================= */

function DisplayValue({
  value,
  type,
  indications
}) {


  /* =======================================================
     PRIMITIVE
  ======================================================= */

  if (
    type === "primitive"
  ) {

    return (

      <div
        style={{
          fontSize: 15,

          color: "#1e3a8a",

          overflowWrap:
            "anywhere"
        }}
      >

        {value?.toString()}

      </div>

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

          flexWrap: "wrap",

          gap: 8,

          width: "100%"
        }}
      >

        {value.map(
          (item, index) => {

            /*
               Check whether this
               exact object is
               currently indicated.
            */

            const highlighted =
              indications.has(item);


            return (

              <div
                key={index}
                style={{
                  background:
                    highlighted
                      ? "#fecaca"
                      : "#bfdbfe",

                  borderRadius: 8,

                  padding:
                    "7px 10px",

                  fontSize: 13,

                  color:
                    highlighted
                      ? "#991b1b"
                      : "#1e3a8a",

                  overflowWrap:
                    "anywhere",

                  border:
                    highlighted
                      ? "2px solid #ef4444"
                      : "2px solid transparent"
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

          flexDirection:
            "column",

          gap: 7,

          width: "100%"
        }}
      >

        {Object.keys(value).map(
          key => (

            <div
              key={key}
              style={{
                display: "flex",

                justifyContent:
                  "space-between",

                gap: 15,

                fontSize: 14,

                borderBottom:
                  "1px solid #bfdbfe",

                paddingBottom: 5
              }}
            >

              <strong>
                {key}
              </strong>


              <span
                style={{
                  overflowWrap:
                    "anywhere",

                  textAlign:
                    "right"
                }}
              >

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


  return null;

}


/* =========================================================
   VISUALIZER
========================================================= */

function Visualize({
  grid,
  indications
}) {

  return (

    <div
      style={{
        marginTop: 30,

        display: "flex",

        flexDirection:
          "column",

        gap: 25
      }}
    >

      {grid.map(
        ([scope, ...variables]) => (

          /* =================================================
             SCOPE
          ================================================= */

          <div
            key={scope}
            style={{
              border:
                "2px solid #222",

              borderRadius: 16,

              padding: 25,

              width: 700,

              maxWidth: "100%",

              boxSizing:
                "border-box"
            }}
          >

            {/* =================================================
               SCOPE NAME
            ================================================= */}

            <div
              style={{
                textAlign:
                  "center",

                fontSize: 20,

                fontWeight:
                  "bold",

                marginBottom: 25
              }}
            >

              {scope}

            </div>


            {/* =================================================
               VARIABLES
            ================================================= */}

            <div
              style={{
                display: "flex",

                flexWrap: "wrap",

                alignItems:
                  "flex-start",

                gap: 20
              }}
            >

              {variables.map(
                ([name, value, type]) => {

                  /*
                     Check the value itself.

                     Example:

                     indications =
                     {
                       Node#2
                     }

                     value === Node#2
                     → RED
                  */

                  const highlighted =
                    indications.has(
                      value
                    );


                  return (

                    /* =========================================
                       VARIABLE BOX
                    ========================================= */

                    <div
                      key={name}
                      style={{
                        minWidth: 140,

                        minHeight: 80,

                        maxWidth: 450,

                        background:
                          highlighted
                            ? "#fecaca"
                            : "#dbeafe",

                        borderRadius: 12,

                        padding: 16,

                        boxSizing:
                          "border-box",

                        display: "flex",

                        flexDirection:
                          "column",

                        alignItems:
                          "center",

                        gap: 12,

                        border:
                          highlighted
                            ? "2px solid #ef4444"
                            : "2px solid transparent"
                      }}
                    >

                      {/* ===================================
                         VARIABLE NAME
                      =================================== */}

                      <div
                        style={{
                          fontSize: 16,

                          fontWeight:
                            "bold",

                          color:
                            highlighted
                              ? "#991b1b"
                              : "#111827"
                        }}
                      >

                        {name}

                      </div>


                      {/* ===================================
                         VALUE
                      =================================== */}

                      <DisplayValue
                        value={value}
                        type={type}
                        indications={
                          indications
                        }
                      />

                    </div>

                  );

                }
              )}

            </div>

          </div>

        )
      )}

    </div>

  );

}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ScopeVisual({
  generator
}) {

  const {
    next,
    grid,

    flashSpot,
    indications,

    clearIndication,
    clearAll

  } = useBox(
    generator
  );


  return (

    <div
      style={{
        padding: 30,

        fontFamily:
          "monospace"
      }}
    >

      {/* ===================================================
         TITLE
      =================================================== */}

      <h2>
        DSA Visualizer
      </h2>


      {/* ===================================================
         NEXT
      =================================================== */}

      <button
        onClick={next}
        style={{
          padding:
            "10px 25px",

          fontSize: 16,

          cursor: "pointer"
        }}
      >

        NEXT

      </button>


      {/* ===================================================
         VISUALIZER
      =================================================== */}

      <Visualize
        grid={grid}
        indications={
          indications
        }
      />

    </div>

  );

}