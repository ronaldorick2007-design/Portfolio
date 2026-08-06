import { useState, useEffect } from "react";
import "../styles/Terminal.css";

const ROLES = ["developer", "creator", "!vibe coder"];

// Helper function for clean timing delays
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Terminal() {
  const [sayMyNameText, setSayMyNameText] = useState("");
  const [nameText, setNameText] = useState("");
  const [whoAmIText, setWhoAmIText] = useState("");
  const [roleText, setRoleText] = useState("");

  // Tracks which section currently owns the active blinking cursor
  const [activeStep, setActiveStep] = useState("sayMyName"); // "sayMyName" | "name" | "whoAmI" | "roles"

  useEffect(() => {
    let isMounted = true;

    // Helper: Type out a string character by character
    const typeString = async (text, setter, speed = 100) => {
      for (let i = 1; i <= text.length; i++) {
        if (!isMounted) return;
        setter(text.slice(0, i));
        await wait(speed);
      }
    };

    // Helper: Loop roles (type, pause, delete, switch)
    const cycleRoles = async (roles) => {
      let roleIndex = 0;

      while (isMounted) {
        const currentRole = roles[roleIndex];

        // Type forward
        for (let i = 1; i <= currentRole.length; i++) {
          if (!isMounted) return;
          setRoleText(currentRole.slice(0, i));
          await wait(120);
        }

        // Pause on completed word
        await wait(1200);

        // Delete backward
        for (let i = currentRole.length - 1; i >= 0; i--) {
          if (!isMounted) return;
          setRoleText(currentRole.slice(0, i));
          await wait(60);
        }

        roleIndex = (roleIndex + 1) % roles.length;
      }
    };

    // Main animation pipeline
    const runTerminalSequence = async () => {
      // Step 1: Type command "saymyname"
      setActiveStep("sayMyName");
      await typeString("saymyname", setSayMyNameText);
      await wait(800);

      // Step 2: Reveal target Name ("Alice")
      setActiveStep("name");
      await typeString("Ronald", setNameText);
      await wait(1000);

      // Step 3: Type command "whoami"
      setActiveStep("whoAmI");
      await typeString("whoami", setWhoAmIText);
      await wait(800);

      // Step 4: Start continuous Roles animation
      setActiveStep("roles");
      await cycleRoles(ROLES);
    };

    runTerminalSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="terminal">
  {/* 1. SayMyName Command */}
  <div className={`command ${activeStep === "sayMyName" ? "cursor" : ""}`}>
    <span className="prompt">$ </span>{sayMyNameText}
  </div>

  {/* 2. Output Name */}
  {activeStep !== "sayMyName" && (
    <div className={`name ${activeStep === "name" ? "cursor" : ""}`}>
      {nameText}
    </div>
  )}

  {/* 3. WhoAmI Command */}
  {(activeStep === "whoAmI" || activeStep === "roles") && (
    <div className={`command ${activeStep === "whoAmI" ? "cursor" : ""}`}>
      <span className="prompt">$ </span>{whoAmIText}
    </div>
  )}

  {/* 4. Roles Output */}
  {activeStep === "roles" && (
    <div className="roles cursor">
      {roleText}
    </div>
  )}
</div>
  );
}