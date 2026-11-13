import { useEffect, useMemo, useRef, useState } from "react";
import cytoscape from "cytoscape";

/*
Expected snapshot:
{
  "visual": [
    {
      "name": "Node@101",
      "type": "Node",
      "color": "#4A90E2",
      "edges": [
        { "name": "Node@102", "relationship": "next" }
      ]
    }
  ]
}

Rules:
- Type view: only objects of that type and edges between that same type.
- Focus view: BFS in BOTH directions; depth defaults to 1.
- Depth "all": entire connected component containing the focused object.
*/

const demoSnapshot = {
  visual: [
    {
      name: "Node@101", type: "Node", color: "#8ecae6",
      edges: [
        { name: "Node@102", relationship: "next" },
        { name: "Node@104", relationship: "child" },
        { name: "SLL@201", relationship: "list" }
      ]
    },
    {
      name: "Node@102", type: "Node", color: "#8ecae6",
      edges: [
        { name: "Node@103", relationship: "next" },
        { name: "Node@101", relationship: "prev" }
      ]
    },
    {
      name: "Node@103", type: "Node", color: "#8ecae6",
      edges: [{ name: "Node@102", relationship: "prev" }]
    },
    {
      name: "Node@104", type: "Node", color: "#8ecae6",
      edges: [{ name: "Node@105", relationship: "next" }]
    },
    {
      name: "Node@105", type: "Node", color: "#8ecae6",
      edges: [{ name: "Node@104", relationship: "prev" }]
    },
    {
      name: "SLL@201", type: "SLL", color: "#ffb703",
      edges: [{ name: "SLL@202", relationship: "next" }]
    },
    {
      name: "SLL@202", type: "SLL", color: "#ffb703",
      edges: [{ name: "SLL@201", relationship: "prev" }]
    }
  ]
};

const DEFAULTS = {
  nodeRepulsion: 7500,
  idealEdgeLength: 115,
  edgeElasticity: 100,
  gravity: 0.25,
  iterations: 700
};

function normalizeSnapshot(snapshot) {
  const raw = Array.isArray(snapshot?.visual) ? snapshot.visual : [];
  const nodes = raw
    .filter(item => item && item.name != null)
    .map(item => ({
      id: String(item.name),
      name: String(item.name),
      type: String(item.type ?? "Unknown"),
      color: typeof item.color === "string" ? item.color : "#ffffff"
    }));

  const known = new Set(nodes.map(node => node.id));
  const links = [];

  raw.forEach(item => {
    const source = String(item.name);
    (Array.isArray(item.edges) ? item.edges : []).forEach((edge, index) => {
      if (edge?.name == null) return;
      const target = String(edge.name);
      if (!known.has(source) || !known.has(target)) return;
      links.push({
        id: `${source}->${target}:${index}`,
        source,
        target,
        relationship: String(edge.relationship ?? "reference")
      });
    });
  });

  return { nodes, links };
}

function bfsBothWays(root, links, depth) {
  const adjacency = new Map();

  for (const edge of links) {
    if (!adjacency.has(edge.source)) adjacency.set(edge.source, new Set());
    if (!adjacency.has(edge.target)) adjacency.set(edge.target, new Set());
    adjacency.get(edge.source).add(edge.target);
    adjacency.get(edge.target).add(edge.source);
  }

  const visited = new Set([root]);
  let frontier = [root];

  if (depth === "all") {
    while (frontier.length) {
      const next = [];
      for (const id of frontier) {
        for (const neighbour of adjacency.get(id) ?? []) {
          if (!visited.has(neighbour)) {
            visited.add(neighbour);
            next.push(neighbour);
          }
        }
      }
      frontier = next;
    }
    return visited;
  }

  for (let level = 0; level < Number(depth); level++) {
    const next = [];
    for (const id of frontier) {
      for (const neighbour of adjacency.get(id) ?? []) {
        if (!visited.has(neighbour)) {
          visited.add(neighbour);
          next.push(neighbour);
        }
      }
    }
    frontier = next;
    if (!frontier.length) break;
  }

  return visited;
}

export default function ForceCanvasDemo({
  snapshot = demoSnapshot,
  height = 560
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const settingsRef = useRef(DEFAULTS);

  const [settings, setSettings] = useState(DEFAULTS);
  const [view, setView] = useState("all");
  const [focusId, setFocusId] = useState("");
  const [depth, setDepth] = useState("1");
  const [hover, setHover] = useState(null);

  const graph = useMemo(() => normalizeSnapshot(snapshot), [snapshot]);

  const types = useMemo(
    () => [...new Set(graph.nodes.map(node => node.type))].sort(),
    [graph.nodes]
  );

  const selectedType = view.startsWith("type:") ? view.slice(5) : null;

  const visibleGraph = useMemo(() => {
    if (selectedType) {
      const nodes = graph.nodes.filter(node => node.type === selectedType);
      const ids = new Set(nodes.map(node => node.id));
      // Strict type-to-type view: hide edges crossing into other types.
      const links = graph.links.filter(
        edge => ids.has(edge.source) && ids.has(edge.target)
      );
      return { nodes, links };
    }

    if (view === "focus" && focusId) {
      const reached = bfsBothWays(focusId, graph.links, depth);
      const nodes = graph.nodes.filter(node => reached.has(node.id));
      const ids = new Set(nodes.map(node => node.id));
      const links = graph.links.filter(
        edge => ids.has(edge.source) && ids.has(edge.target)
      );
      return { nodes, links };
    }

    return graph;
  }, [graph, selectedType, view, focusId, depth]);

  const elements = useMemo(() => [
    ...visibleGraph.nodes.map(node => ({
      data: {
        id: node.id,
        label: node.name,
        type: node.type,
        color: node.color
      },
      classes: view === "focus" && node.id === focusId ? "focused" : ""
    })),
    ...visibleGraph.links.map(edge => ({
      data: {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        relationship: edge.relationship
      }
    }))
  ], [visibleGraph, view, focusId]);

  function runLayout(cy, config) {
    cy.layout({
      name: "cose",
      animate: true,
      animationDuration: 300,
      fit: true,
      padding: 35,
      nodeRepulsion: () => config.nodeRepulsion,
      idealEdgeLength: () => config.idealEdgeLength,
      edgeElasticity: () => config.edgeElasticity,
      gravity: config.gravity,
      numIter: config.iterations,
      componentSpacing: 75,
      nodeOverlap: 18,
      randomize: false
    }).run();
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      pixelRatio: "auto",
      elements,
      minZoom: 0.2,
      maxZoom: 3,
      wheelSensitivity: 0.18,
      boxSelectionEnabled: false,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            shape: "ellipse",
            width: 58,
            height: 58,
            "background-color": "data(color)",
            "border-color": "#111",
            "border-width": 1.6,
            color: "#111",
            "font-size": 10,
            "font-weight": 650,
            "font-family": "Arial, sans-serif",
            "text-valign": "center",
            "text-halign": "center",
            "text-wrap": "none"
          }
        },
        {
          selector: ".focused",
          style: {
            "border-width": 4,
            "border-color": "#111",
            width: 66,
            height: 66,
            "z-index": 10
          }
        },
        {
          selector: "edge",
          style: {
            width: 1.6,
            "line-color": "#555",
            "target-arrow-color": "#555",
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.85,
            "curve-style": "bezier",
            opacity: 0.7
          }
        },
        {
          selector: "edge:hover",
          style: {
            width: 3.2,
            opacity: 1,
            "line-color": "#000",
            "target-arrow-color": "#000"
          }
        },
        {
          selector: "node:hover",
          style: {
            "border-width": 3,
            "border-color": "#111"
          }
        }
      ]
    });

    cyRef.current = cy;
    runLayout(cy, settingsRef.current);

    const showNode = event => {
      const p = event.renderedPosition;
      const d = event.target.data();
      setHover({
        x: p.x + 12, y: p.y + 12,
        lines: [`${d.label}`, `Type: ${d.type}`]
      });
    };
    const showEdge = event => {
      const p = event.renderedPosition;
      const d = event.target.data();
      setHover({
        x: p.x + 12, y: p.y + 12,
        lines: [`Relationship: ${d.relationship}`]
      });
    };
    const moveHover = event => {
      const p = event.renderedPosition;
      setHover(old => old ? { ...old, x: p.x + 12, y: p.y + 12 } : old);
    };
    const clearHover = () => setHover(null);

    cy.on("mouseover", "node", showNode);
    cy.on("mousemove", "node", moveHover);
    cy.on("mouseout", "node", clearHover);
    cy.on("mouseover", "edge", showEdge);
    cy.on("mousemove", "edge", moveHover);
    cy.on("mouseout", "edge", clearHover);
    cy.on("pan zoom", clearHover);

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, [elements]);

  function updateSetting(key, value) {
    const next = { ...settingsRef.current, [key]: Number(value) };
    settingsRef.current = next;
    setSettings(next);
    if (cyRef.current) runLayout(cyRef.current, next);
  }

  const controls = [
    ["nodeRepulsion", "Node repulsion", 1000, 20000, 500],
    ["idealEdgeLength", "Link length", 50, 250, 5],
    ["edgeElasticity", "Link elasticity", 10, 250, 5],
    ["gravity", "Center gravity", 0, 1, 0.05],
    ["iterations", "Layout iterations", 100, 2000, 100]
  ];

  const selectStyle = {
    width: "100%",
    padding: "8px 9px",
    border: "1px solid #bbb",
    borderRadius: 6,
    background: "#fff",
    color: "#111"
  };

  return (
    <div style={{
      width: "100%",
      color: "#111",
      background: "#fff",
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        padding: "10px 12px",
        marginBottom: 10,
        border: "1px solid #d8b66a",
        borderRadius: 7,
        background: "#fff9e9",
        color: "#513d13",
        fontSize: 12
      }}>
        <strong>Performance note:</strong> Keep snapshots small and focused.
        Large, dense graphs can slow layout, consume memory and make your PC
        unresponsive. Start with only the objects you need to inspect.
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
        gap: 12,
        padding: 14,
        marginBottom: 10,
        border: "1px solid #ddd",
        borderRadius: 9
      }}>
        <label style={{ display: "grid", gap: 5, fontSize: 12 }}>
          <strong>Display</strong>
          <select
            value={view}
            onChange={event => setView(event.target.value)}
            style={selectStyle}
          >
            <option value="all">All objects</option>
            {types.map(type => (
              <option key={type} value={`type:${type}`}>{type} only</option>
            ))}
            <option value="focus">Focus object + BFS</option>
          </select>
        </label>

        {view === "focus" && (
          <>
            <label style={{ display: "grid", gap: 5, fontSize: 12 }}>
              <strong>Focus object</strong>
              <select
                value={focusId}
                onChange={event => setFocusId(event.target.value)}
                style={selectStyle}
              >
                <option value="">Select an object</option>
                {graph.nodes.map(node => (
                  <option key={node.id} value={node.id}>
                    {node.name} ({node.type})
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: 5, fontSize: 12 }}>
              <strong>BFS depth (both directions)</strong>
              <select
                value={depth}
                onChange={event => setDepth(event.target.value)}
                style={selectStyle}
              >
                <option value="1">1 — direct neighbours</option>
                <option value="2">2 — two levels</option>
                <option value="3">3 — three levels</option>
                <option value="4">4 — four levels</option>
                <option value="5">5 — five levels</option>
                <option value="all">None — all connected objects</option>
              </select>
            </label>
          </>
        )}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))",
        gap: 12,
        padding: 14,
        marginBottom: 10,
        border: "1px solid #ddd",
        borderRadius: 9
      }}>
        {controls.map(([key, label, min, max, step]) => (
          <label key={key} style={{ display: "grid", gap: 5, fontSize: 12 }}>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{label}</strong>
              <span>{settings[key].toFixed(key === "gravity" ? 2 : 0)}</span>
            </span>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={settings[key]}
              onChange={event => updateSetting(key, event.target.value)}
              style={{ width: "100%", accentColor: "#111" }}
            />
          </label>
        ))}
        <div style={{ display: "flex", alignItems: "end", gap: 8 }}>
          <button
            onClick={() => {
              settingsRef.current = DEFAULTS;
              setSettings(DEFAULTS);
              if (cyRef.current) runLayout(cyRef.current, DEFAULTS);
            }}
            style={{
              padding: "8px 12px",
              border: "1px solid #111",
              borderRadius: 6,
              background: "#111",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Reset settings
          </button>
          <button
            onClick={() => cyRef.current && runLayout(cyRef.current, settingsRef.current)}
            style={{
              padding: "8px 12px",
              border: "1px solid #111",
              borderRadius: 6,
              background: "#fff",
              color: "#111",
              cursor: "pointer"
            }}
          >
            Re-layout
          </button>
        </div>
      </div>

      <div style={{ fontSize: 12, color: "#444", marginBottom: 7 }}>
        Showing {visibleGraph.nodes.length} objects and {visibleGraph.links.length} connections
      </div>

      <div style={{
        height,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #ccc",
        borderRadius: 9,
        background: "#fff"
      }}>
        <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        {hover && (
          <div style={{
            position: "absolute",
            left: Math.max(4, Math.min(hover.x, 450)),
            top: Math.max(4, Math.min(hover.y, height - 55)),
            pointerEvents: "none",
            zIndex: 5,
            padding: "7px 10px",
            border: "1px solid #111",
            borderRadius: 5,
            background: "#fff",
            color: "#111",
            boxShadow: "0 3px 12px #0002",
            fontSize: 12,
            fontWeight: 650,
            whiteSpace: "nowrap"
          }}>
            {hover.lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: 7, fontSize: 11, color: "#444" }}>
        Hover nodes or connections for details · Drag nodes · Scroll to zoom
      </div>
    </div>
  );
}
