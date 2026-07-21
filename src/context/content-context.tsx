"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import defaultData from "@/data/content.json";

export type ContentData = typeof defaultData;

export interface ProjectPerformance {
  lighthouse?: number;
  accessibility?: number;
  seo?: number;
  bestPractices?: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  tags: string[];
  description: string;
  overview?: string;
  role?: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  challenges?: string;
  performance?: ProjectPerformance;
  outcome?: string;
  lessonsLearned?: string;
  image: string;
  link?: string;
  github?: string;
  techStack: string[];
}
interface ContentContextType {
  data: ContentData;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  data: defaultData,
  isLoading: true,
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ContentData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "portfolio", "content");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && isMounted) {
          const fetched = docSnap.data() as ContentData;
          const merged = {
            ...defaultData,
            ...fetched,
            personal: { ...defaultData.personal, ...fetched?.personal, email: "mujee00012@gmail.com" },
            about: defaultData.about,
            projects: defaultData.projects,
            faq: defaultData.faq,
          };
          setData(merged);
        }
      } catch (error) {
        console.error("Error fetching content from Firebase:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ data, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext).data;
}

export function useContentLoading() {
  return useContext(ContentContext).isLoading;
}
