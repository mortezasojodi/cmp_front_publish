"use client"
import { OperationalAddressEntity } from '@/domain/entity/operational_address_entity';
import React, { createContext, useContext, ReactNode } from 'react';
import { useLoading } from '../loading/loading_context';
import { getAllOperationalAddress } from '@/data/api/dashboard/operationalAddress/get_all';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { UnAuthorize } from '@/shared/core/either';
import { APP_ROUTES } from '@/shared/route/app_route';

interface AddressContextType {
    addresses: OperationalAddressEntity[];
    setAddresses: React.Dispatch<React.SetStateAction<OperationalAddressEntity[]>>;
    refreshAdr: () => Promise<void>;
    selectedAddresses: OperationalAddressEntity | null;
    setSelectedAddresses: React.Dispatch<React.SetStateAction<OperationalAddressEntity>>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [addresses, setAddresses] = React.useState<OperationalAddressEntity[]>([]);
    const [selectedAddresses, setSelectedAddresses] = React.useState<OperationalAddressEntity>(null);
    const { replace } = useRouter();


    async function refreshAdr() {
        try {
            var result = await getAllOperationalAddress();
            result.fold(
                (error) => {
                    toast.error(error.message);
                    if (error instanceof UnAuthorize) {
                        replace(APP_ROUTES.Login)
                    }
                },
                (data) => {
                    setAddresses(data)
                    setSelectedAddresses(data[0]);
                }
            );
        } finally {
        }
    }

    // const refreshAdr = async () => {
    //     // Make sure to call refresh as a function
    //     await refresh();
    // };
    return (
        <AddressContext.Provider value={{ addresses, setAddresses, selectedAddresses, setSelectedAddresses, refreshAdr }}>
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
