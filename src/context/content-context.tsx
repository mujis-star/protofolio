"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import defaultData from "@/data/content.json";

type ContentData = typeof defaultData;

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
          setData(docSnap.data() as ContentData);
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
