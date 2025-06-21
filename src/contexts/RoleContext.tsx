import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'Admin' | 'Auditor' | 'Viewer' | null;
const RoleContext = createContext<any>(null);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);