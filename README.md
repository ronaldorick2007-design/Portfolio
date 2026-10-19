# Dev Log

> This log was written as a record of how the project came to be: the ideas, the dead ends, the doubts, and what was learned along the way. It was not intended as a setup guide or a main README.

## Overview

This repository was created to host a personal webpage on GitHub Pages. It was grown into something much larger: a **code visualizer** that renders data structures and algorithms, driven by code written by the user.

Solid light colors, sharp corners, and subtle transitions were consistently preferred. Both light mode and dark mode were implemented.

## Site Structure

- The **Home** and **Codes** pages were navigated with `react-router`.
- Codes were organized into **Basics** (loops, if-else) and **Data Structures**.
- `fields.html` was started as a place to showcase whatever was built day to day, whether hand-written or vibe-coded. A single page with multiple articles and a docs-style sidebar was planned, closer to an iframe or MS Docs layout.

## The Journey

### 1. The grid problem

CSS Grid was found to handle 1D and 2D arrays well, including 1D data spread across a 2D layout. Shapes were found to be the difficulty: circles, rounded squares, hollow shapes, and triangles. This was struggled with for a long time.

In a vibe-coding session, several layout approaches were tried. Flexbox as a grid was found to work, but DOM management was poor, especially memory-wise.

### 2. Magnetic grid points

Suddenly, an idea was struck upon: **magnetic grid points** would be defined, and array items would be snapped to them. After another vibe-coding session and a range of tests, it was made to work.

### 3. A cleaner architecture

The mind was then changed, and a different design was settled on, with two cases:

- An array was built by the user and passed to a **render class**, which rendered 1D and 2D grids.
- For complex shapes such as a circle or hollow circle, the array was **built by the render engine and returned to the user** for further modification.

The problem was separated in this way, and control was kept with the user.

### 4. Data structures

**Binary trees** were implemented using a complicated math approach and tedious array manipulation. It worked. The same visualizer that was used for the earlier grids was reused, which was its real strength.

Linear structures (linked lists, stacks, queues) were implemented next, followed by **graphs**. Sets and hashmaps were planned as the next step.

## Moving to React

After some React concepts were learned, a clear path to implementing the idea with ease was seen. React was also found to handle DOM changes far better, so the code was translated to it.

Key architectural decisions:

- A **model generator → custom hook → React** pattern was adopted, as was suggested during a discussion with AI and found to fit the visualizer well.
- A **mass refactor** was undertaken, not of the codebase but of the understanding of React itself.
- Custom classes (such as a singly linked list) were stored in `useRef`, so that state was preserved across re-renders. The door was opened to stacks and queues in this way.
- Re-rendering was handled explicitly by converting the custom data structure into an array, which was already rendered well by the grid visualizer.
- Data structures were initialized dynamically from **generator functions**.
- While different rendering architectures were experimented with, a way to **yield recursion** as a separate value for each function was accidentally found, so that calls could be stacked.
- Visual elements were also added for primitive data structures.

## The Parser

A **source-to-source code parser** was built so that user-written code could be simulated and watched, giving better understanding than static hard-coded examples.

- The parser was mostly based on regex and item juggling, so it was handed to AI.
- **ASTs** were learned about along the way. They were not gone into deeply for now, but would be returned to if the project demanded it.
- The next step was pushing the parser toward **recursion**.
- Roughly **70% of LeetCode problems** were made to run on the project, covering arrays, linked lists (single, double, stack, queue), nodes, trees, and basic search and sort algorithms.

## Reflection: Learning vs. Competing with AI

One day, a pause was taken and the question was asked whether this was a project to learn or a project to compete with AI. After honest thought, it was concluded to be the second.

For **three months**, the visualizer was built bit by bit, hand-coded, and AI help was avoided. How much of a speed breaker this was is now seen. It was not regretted. Every small architectural change was owned, though it was accepted that time was lost competing with a tool.

Then, despite ego, **five days** were spent in AI-driven vibe engineering. Roughly **90%** of what was envisioned was completed, with fewer lines, fewer files, and a neater structure. Much of this was credited to the bold choice to redesign the entire architecture and to the steering being kept in hand. Tears were brought to the eyes by the speed of tokens, but it was adapted to, and a new mindset of rapid testing and architectural thinking was gained.

A cost was paid. Lizard-brain Ctrl+C, Ctrl+V behavior was fallen into, and only about **70% of the architecture** was understood. Code was seen to be heavily commoditized, and the changing world was accepted.

## Hosting

Hosting everything on the web was first attempted, but heavy Java compiler overhead was run into. It was decided that a **self-hosted, lightweight editor with the visualizer attached alongside** would be built. **React + Tauri** was suggested by AI for this stack.

## Status

The decision was made to publish the project and take a break, or to return much later. Attention was turned to other CSE topics. I may add visualized code occasionally, since it takes little effort, so this is likely the full stop for the project, at least for now.