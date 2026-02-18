
import React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  category?: string;
  icon?: React.ReactNode;
  domain?: string;
  tools?: string;
  solves?: string;
  works?: string;
  github?: string;
  context?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}