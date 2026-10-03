import { useState, useEffect } from "react";

const ROLES = ["developer", "creator", "!vibe coder"];

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function Terminal() {
  const [sayMyNameText, setSayMyNameText] = useState("");
  const [nameText, setNameText] = useState("");
  const [whoAmIText, setWhoAmIText] = useState("");
  const [roleText, setRoleText] = useState("");
  const [activeStep, setActiveStep] =
    useState("sayMyName");

  useEffect(() => {
    let isMounted = true;

    const typeString = async (
      text,
      setter,
      speed = 100
    ) => {
      for (let i = 1; i <= text.length; i++) {
        if (!isMounted) return;

        setter(text.slice(0, i));
        await wait(speed);
      }
    };

    const cycleRoles = async (roles) => {
      let roleIndex = 0;

      while (isMounted) {
        const currentRole = roles[roleIndex];

        for (let i = 1; i <= currentRole.length; i++) {
          if (!isMounted) return;

          setRoleText(currentRole.slice(0, i));
          await wait(120);
        }

        await wait(1200);

        for (
          let i = currentRole.length - 1;
          i >= 0;
          i--
        ) {
          if (!isMounted) return;

          setRoleText(currentRole.slice(0, i));
          await wait(60);
        }

        roleIndex =
          (roleIndex + 1) % roles.length;
      }
    };

    const runTerminalSequence = async () => {
      setActiveStep("sayMyName");

      await typeString(
        "saymyname",
        setSayMyNameText
      );

      await wait(800);

      setActiveStep("name");

      await typeString(
        "Ronald",
        setNameText
      );

      await wait(1000);

      setActiveStep("whoAmI");

      await typeString(
        "whoami",
        setWhoAmIText
      );

      await wait(800);

      setActiveStep("roles");

      await cycleRoles(ROLES);
    };

    runTerminalSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  const cursor =
    "after:content-['|'] after:font-light after:ml-1 after:animate-blink";

  return (
    <div>
      {/* Command */}
      <div
        className={`
          mb-2
          text-[1.4rem]
          text-black
          ${activeStep === "sayMyName" ? cursor : ""}
        `}
      >
        <span>$ </span>
        {sayMyNameText}
      </div>

      {/* Name */}
      {activeStep !== "sayMyName" && (
        <div
          className={`
            font-bold
            text-[7rem]
            leading-none
            text-red-500
            [text-shadow:5px_5px_#000]
            ${activeStep === "name" ? cursor : ""}
          `}
        >
          {nameText}
        </div>
      )}

      {/* Whoami */}
      {(activeStep === "whoAmI" ||
        activeStep === "roles") && (
        <div
          className={`
            mb-2
            -ml-40
            text-[1.4rem]
            text-black
            ${
              activeStep === "whoAmI"
                ? cursor
                : ""
            }
          `}
        >
          <span>$ </span>
          {whoAmIText}
        </div>
      )}

      {/* Roles */}
      {activeStep === "roles" && (
        <div
          className={`
            font-bold
            -ml-40
            text-[6rem]
            leading-none
            text-orange-500
            [text-shadow:3px_3px_#000]
            ${cursor}
          `}
        >
          {roleText}
        </div>
      )}
    </div>
  );
}