// // AddressContext.tsx
// import { AppConfig } from '@/shared/app_config';
// import React, { createContext, useContext, ReactNode } from 'react';

// interface TokenProviderType {
//     token: string; // Replace 'any' with the appropriate type for addresses
// }

//  const TokenContext = createContext<TokenProviderType | undefined>(undefined);

// export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [token, setToken] = React.useState<string>(null);



//     return (
//         <TokenContext.Provider value={{ token }}>
//             {children}
//         </TokenContext.Provider>
//     );
// };

// export const useAddress = () => {
//     const context = useContext(TokenContext);
//     if (context === undefined) {
//         throw new Error('useAddress must be used within an AddressProvider');
//     }
//     return context;
// };
