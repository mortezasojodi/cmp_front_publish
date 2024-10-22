"use client"
import { OperationalAddressEntity } from '@/domain/entity/operational_address_entity';
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLoading } from '../loading/loading_context';
import { getAllOperationalAddress } from '@/data/api/dashboard/operationalAddress/get_all';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { UnAuthorize } from '@/shared/core/either';
import { APP_ROUTES } from '@/shared/route/app_route';
import { ShoppingCardEntity } from '@/domain/entity/shopping_card_entity';
import { getAllShoppingCardApi } from '@/data/api/shopping_card/get_all';

interface ShoppingCardContextType {
    itemsCard: ShoppingCardEntity[];
    setitemsCard: React.Dispatch<React.SetStateAction<ShoppingCardEntity[]>>;
    refreshCard: () => Promise<void>;
}

const ShoppingCardContext = createContext<ShoppingCardContextType | undefined>(undefined);

export const ShoppingCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [itemsCard, setitemsCard] = React.useState<ShoppingCardEntity[]>([]);
    const { replace } = useRouter();

    useEffect(() => {
        refreshCard();
    }, []);

    async function refreshCard() {
        try {
            var result = await getAllShoppingCardApi();
            result.fold(
                (error) => {
                    toast.error(error.message);
                    if (error instanceof UnAuthorize) {
                        replace(APP_ROUTES.Login)
                    }
                },
                (data) => {
                    setitemsCard(data)
                }
            );
        } finally {
        }
    }

    return (
        <ShoppingCardContext.Provider value={{ itemsCard, setitemsCard, refreshCard }}>
            {children}
        </ShoppingCardContext.Provider>
    );
};

export const useCard = () => {
    const context = useContext(ShoppingCardContext);
    if (context === undefined) {
        throw new Error('useAddress must be used within an AddressProvider');
    }
    return context;
};
