"use client";
import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AnimatedText = ({ textColor }: { textColor: string }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold text-center"
      style={{ color: textColor }}
    >
      Welcome to Your AI Cooking Assistant
    </motion.h1>
  );
};

const HomePage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "#1a1a1a" : "#f0f0f0";
  const textColor = isDarkMode ? "#f0f0f0" : "#1a1a1a";
  const cardBackgroundColor = isDarkMode ? "#2a2a2a" : "#ffffff";
  const cardTextColor = isDarkMode ? "#f0f0f0" : "#1a1a1a";
  const buttonBackgroundColor = isDarkMode ? "#ff5722" : "#ff9800";
  const buttonTextColor = isDarkMode ? "#ffffff" : "#000000";
  const buttonHoverBackgroundColor = isDarkMode ? "#e64a19" : "#fb8c00";

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen transition-colors"
      style={{ backgroundColor, color: textColor }}
    >
      <AnimatedText textColor={textColor} />

      <motion.div
        className="mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Canvas>
          {/* 3D Model */}
        </Canvas>
      </motion.div>

      <Card
        className="p-4 mb-4 shadow-lg"
        style={{ backgroundColor: cardBackgroundColor, color: cardTextColor }}
      >
        <h2 className="text-xl font-semibold">Explore Recipes</h2>
        <p className="mt-2">Find step-by-step instructions tailored for you.</p>
      </Card>

      <Button
        onClick={() => alert("Get Started!")}
        style={{
          backgroundColor: buttonBackgroundColor,
          color: buttonTextColor,
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "10px 20px",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = buttonHoverBackgroundColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = buttonBackgroundColor;
        }}
      >
        Start Cooking
      </Button>
    </div>
  );
};

export default HomePage;
