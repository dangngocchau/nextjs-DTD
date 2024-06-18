"use client";
import { sessionToken } from "@/lib/https";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

//NOTE: Use context to control session token

// const AppContext = createContext({
//   sessionToken: "",
//   setSessionToken: (token: string) => {},
// });

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }

//   return context;
// };

// export default function AppProvider({
//   children,
//   initialSessionToken = "",
// }: {
//   children: React.ReactNode;
//   initialSessionToken?: string;
// }) {
//   const [sessionToken, setSessionToken] = useState(initialSessionToken);

//   return (
//     <AppContext.Provider value={{ sessionToken, setSessionToken }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

const AppContext = createContext({});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      sessionToken.value = initialSessionToken;
    }
  });

  return <>{children}</>;
}
