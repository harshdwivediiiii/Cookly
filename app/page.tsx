"use client";
import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // ✅ ShadCN Input
import { TypeAnimation } from "react-type-animation";
import AssistantChat from "@/components/AssistantChat";
import RecipeChat from "@/components/RecipeChat";

const HomePage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const buttonBackgroundColor = isDarkMode ? "#ff5722" : "#ff9800";
  const buttonTextColor = isDarkMode ? "#ffffff" : "#000000";
  const buttonHoverBackgroundColor = isDarkMode ? "#e64a19" : "#fb8c00";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-colors bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#f0f0f0] px-4 sm:px-6 md:px-8">
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <TypeAnimation
      sequence={[
        "Welcome to Your AI Cooking Assistant",
        1000,
        "Discover Recipes Tailored to You",
        1000,
        "Cook with Confidence",
        1000,
      ]}
      wrapper="h1"
      speed={50}
      className="text-4xl font-bold text-center text-[#1a1a1a] dark:text-[#f0f0f0]"
      repeat={Infinity}
    />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg text-center mt-2"
        >
          Personalized cooking instructions, just for you.
        </motion.p>
      </motion.div>

      {/* 3D Canvas */}
      <motion.div
        className="mb-8 mt-6 w-full max-w-xl h-60"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Canvas>
          <ambientLight />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color={isDarkMode ? "orange" : "tomato"} />
          </mesh>
        </Canvas>
      </motion.div>

      {/* Search Bar with ShadCN Input */}
      <Input
        type="text"
        placeholder="Search recipes..."
        className="mb-6 max-w-md w-full bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-[#f0f0f0]"
      />

      {/* Feature Card */}
      <Card className="p-4 mb-4 shadow-lg w-full max-w-md bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-[#f0f0f0]">
        <h2 className="text-xl font-semibold">Explore Recipes</h2>
        <p className="mt-2">Find step-by-step instructions tailored for you.</p>
      </Card>

      {/* Popular Recipes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 max-w-5xl w-full">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="p-4"
            style={{ backgroundColor: isDarkMode ? "#2a2a2a" : "#ffffff" }}
          >
            <img
              src={`https://via.placeholder.com/300x200?text=Recipe+${i}`}
              alt={`Recipe ${i}`}
              className="rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">Recipe Title {i}</h3>
            <p className="text-sm mt-1">Short description about recipe {i}</p>
          </Card>
        ))}
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => alert("Get Started!")}
        className="mt-8"
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
      {/* Assistant Chat */}
      <div className="mt-8 w-full max-w-xl">
        <AssistantChat />
      </div>
      <RecipeChat  onResponse={(data) => {
  // handle response here
  console.log("Response from Gemini:", data);
}} />
    </div>
  );
};

export default HomePage;
