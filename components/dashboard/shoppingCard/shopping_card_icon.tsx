import { useCard } from '@/components/context_api/shopping_card_context';
import React, { useEffect } from 'react';
import { IoBasketOutline } from 'react-icons/io5';
import styles from './shoppingCard.module.css';
import { APP_ROUTES } from '@/shared/route/app_route';
import { useRouter } from "next/navigation";

const ShoppingCardIcon = () => {
    var { itemsCard } = useCard();
    const { push } = useRouter();

    useEffect(() => {
    }, [itemsCard]);

    return (
        <div className={styles.iconContainer} onClick={() => push(APP_ROUTES.ShoppingCard)}>
            <IoBasketOutline color='white' size={'30px'} />
            {itemsCard.length > 0 && (
                <span className={styles.badge}>{itemsCard.length}</span>
            )}
        </div>
    );
};

export default ShoppingCardIcon;
