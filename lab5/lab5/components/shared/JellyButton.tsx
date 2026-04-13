"use client";
import React from "react";

interface JellyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  size?: "sm" | "md";
}

export const JellyButton: React.FC<JellyButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
}) => {
  const width  = size === "sm" ? "120px" : "150px";
  const height = size === "sm" ? "40px"  : "48px";
  const fontSize = size === "sm" ? "12px" : "14px";

  const base: React.CSSProperties = {
    position: "relative",
    width, height,
    borderRadius: "45px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize, fontWeight: 500,
    fontFamily: "inherit",
    flexShrink: 0,
    transition: "opacity 0.15s",
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      backgroundColor: "rgb(151,95,255)",
      color: "white",
      boxShadow: "0px 10px 10px rgb(210,187,253) inset, 0px 5px 10px rgba(5,5,5,0.21), 0px -10px 10px rgb(124,54,255) inset",
    },
    outline: {
      ...base,
      backgroundColor: "transparent",
      color: "rgb(151,95,255)",
      boxShadow: "0 0 0 1.5px rgb(151,95,255) inset",
    },
  };

  return (
    <button style={styles[variant]} className="jelly-btn" onClick={onClick}>
      {children}
    </button>
  );
};
