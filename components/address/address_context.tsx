"use client"
import { OperationalAddressEntity } from '@/domain/entity/operational_address_entity';
import React, { createContext, useContext, ReactNode } from 'react';

interface AddressContextType {
    addresses: OperationalAddressEntity[];
    setAddresses: React.Dispatch<React.SetStateAction<OperationalAddressEntity[]>>;
    selectedAddresses: OperationalAddressEntity | null;
    setSelectedAddresses: React.Dispatch<React.SetStateAction<OperationalAddressEntity>>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [addresses, setAddresses] = React.useState<OperationalAddressEntity[]>([]);
    const [selectedAddresses, setSelectedAddresses] = React.useState<OperationalAddressEntity>(null);

    return (
        <AddressContext.Provider value={{ addresses, setAddresses, selectedAddresses, setSelectedAddresses }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (context === undefined) {
        throw new Error('useAddress must be used within an AddressProvider');
    }
    return context;
};
