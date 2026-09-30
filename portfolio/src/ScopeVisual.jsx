import { useRef, useState } from "react";
import useScope from "./useScope";
import useIndication from "./useIndication";


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


  /*
     Execution logs

     Example:

     Initialized browser history
     Created history stack
     Visited Google
     Entered back operation
  */

  const [
    logs,
    setLogs
  ] = useState([]);


  const gen =
    useRef(generator());


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

    if (data.action === "log") {

      setLogs(prev => [
        ...prev,
        data.message
      ]);

      return;

    }


    /* =====================================================
       FUNCTION ADD
    ===================================================== */

    if (data.type === "function-add") {

      addScope(
        data.scope
      );

      return;

    }


    /* =====================================================
       FUNCTION REMOVE
    ===================================================== */

    if (data.type === "function-rm") {

      removeScope(
        data.scope
      );

      return;

    }


    /* =====================================================
       INDICATION
    ===================================================== */

    if (data.action === "indicate") {

      indicate(
        data.name,
        data.value,
        data.index,
        data.array
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

    flashSpot,

    indications,

    clearIndication,

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

  if (type === "primitive") {

    return (
      <span>
        {value?.toString()}
      </span>
    );

  }


  /* =======================================================
     ARRAY
  ======================================================= */

  if (type === "array") {

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
              indications.has(item);


            /* ---------------------------------------------
               ARRAY POSITION INDICATION
            --------------------------------------------- */

            const arrayHighlighted =
              [...flashSpot.values()].some(
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

  if (type === "CLASS") {

    return (

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6
        }}
      >

        {Object.keys(value).map(
          key => (

            <div
              key={key}

              style={{
                display: "flex",
                gap: 10,

                padding: "5px 8px",

                background: "#f8fafc",

                border:
                  "1px solid #cbd5e1",

                borderRadius: 6
              }}
            >

              <strong>
                {key}
              </strong>

              <span>
                {String(value[key])}
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
   VISUALIZE
========================================================= */

function Visualize({
  grid,
  indications,
  flashSpot
}) {

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "100%"
      }}
    >

      {grid.map(
        (row, rowIndex) => {

          const scope =
            row[0];


          return (

            <div
              key={rowIndex}

              style={{
                border:
                  "2px solid #222",

                borderRadius: 16,

                padding: 25,

                width: 700,

                maxWidth: "100%",

                boxSizing: "border-box"
              }}
            >

              {/* =================================================
                  SCOPE NAME
              ================================================= */}

              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 15
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
                  gap: 15
                }}
              >

                {row
                  .slice(1)
                  .map(
                    (variable, index) => {

                      const name =
                        variable[0];

                      const value =
                        variable[1];

                      const type =
                        variable[2];


                      /* -----------------------------------------
                         VARIABLE HIGHLIGHT
                      ----------------------------------------- */

                      const highlighted =
                        indications.has(value);


                      return (

                        <div
                          key={index}

                          style={{
                            minWidth: 140,
                            minHeight: 80,

                            maxWidth: 450,

                            padding: 12,

                            boxSizing: "border-box",

                            background:
                              highlighted
                                ? "#fecaca"
                                : "#dbeafe",

                            border:
                              highlighted
                                ? "2px solid red"
                                : "2px solid #222",

                            borderRadius: 12
                          }}
                        >

                          {/* -------------------------------------
                              VARIABLE NAME
                          ------------------------------------- */}

                          <div
                            style={{
                              fontWeight: "bold",
                              marginBottom: 8
                            }}
                          >
                            {name}
                          </div>


                          {/* -------------------------------------
                              VALUE
                          ------------------------------------- */}

                          <DisplayValue
                            value={value}
                            type={type}
                            indications={indications}
                            flashSpot={flashSpot}
                          />

                        </div>

                      );

                    }
                  )}

              </div>

            </div>

          );

        }
      )}

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
    flashSpot,
    indications,
    clearIndication,
    clearAll,
    logs
  } =
    useBox(generator);


  return (

    <div
      style={{
        width: "100%",
        padding: 20,
        boxSizing: "border-box"
      }}
    >

      {/* =====================================================
          CONTROLS + LOGS
      ===================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 15,
          marginBottom: 20
        }}
      >

        {/* ===================================================
            NEXT BUTTON
        =================================================== */}

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


        {/* ===================================================
            LOG
        =================================================== */}

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


      {/* =====================================================
          VISUALIZER
      ===================================================== */}

      <Visualize
        grid={grid}
        indications={indications}
        flashSpot={flashSpot}
      />

    </div>

  );

}