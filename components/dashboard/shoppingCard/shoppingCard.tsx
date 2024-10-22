'use client'

import { useCard } from '@/components/context_api/shopping_card_context'
import React, { useEffect, useState } from 'react'
import styles from './shoppingCard.module.css';
import { LiaEdit } from 'react-icons/lia';
import { FiTrash } from 'react-icons/fi';
import { deleteShoppingCard } from '@/data/api/shopping_card/delete';
import toast from 'react-hot-toast';
import { useLoading } from '@/components/loading/loading_context';
import { ButtonsForm } from '@/components/forms/signUpButtons/signUpButtons';
import { CreateInvoiceApi } from '@/data/api/invoice/create_invoice_api';
import { AddServiceAppointmentCommand } from '@/domain/command/service_appointment/add_service_appointment_command';
import { useRouter } from "next/navigation";
import { InvoiceEntity } from '@/domain/entity/invoice_entity';
import ShowInvoice from "@/components/Invoice/invoice_modal";
import { APP_ROUTES } from '@/shared/route/app_route';
import { AiTwotoneShopping } from 'react-icons/ai';
import TitleBack from '@/components/forms/title/title_back';

const ShoppingCard = () => {

    var { itemsCard, refreshCard } = useCard();
    const { setLoading } = useLoading();
    const { back, push } = useRouter();
    const [invoiceModalIsOpen, setInvoiceModalIsOpen] = useState(false);
    const [invoiceModel, setInvoiceModel] = useState<InvoiceEntity | null>(null);

    useEffect(() => {

    }, [itemsCard]);

    async function creatInvoice() {

        try {
            setLoading(true);

            var commands = itemsCard.map((e) => {
                return new AddServiceAppointmentCommand(
                    e.OperationalAddressId,
                    e.ServicePriceCrmId,
                    e.StartDate,
                    e.FrequencyType,
                    e.ServiceCrmId);
            });

            var result = await CreateInvoiceApi(commands);
            await result.fold(
                (error) => {
                    toast.error(error.message);
                },
                async (data) => {
                    refreshCard();
                    push(APP_ROUTES.Invoices);
                }
            );
        } finally {
            setLoading(false);
        }
    }
    const openInvoice = (data) => {
        setInvoiceModel(data);
        setInvoiceModalIsOpen(true);
    };

    async function unregisterService(Id: number) {
        try {
            setLoading(true);

            var result = await deleteShoppingCard(Id);
            result.fold(
                (error) => {
                    toast.error(error.message);
                },
                (data) => {
                    refreshCard();
                }
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        // <a className='pagecontent'>
        //     <TitleBack title={"Shopping Card"} icon={"/invoices_and_payments_logo.svg"} />
        //     {
        (itemsCard.length > 0) ?
            <div className={styles.cardContainer}>
                <div className={styles.itemsContainer}>
                    {itemsCard.map((item, index) => (
                        <div className={styles.form} key={index}>
                            <div className={styles.fakeInput}>
                                {item.AddressName}
                                <br />
                                {item.Name} - {item.PriceName}
                                <div className={styles.inputIconButton}>
                                    <button type="button" onClick={() => unregisterService(item.Id)}>
                                        <FiTrash size={22} style={{ color: "rgba(76, 142, 59, 1)" }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <ShowInvoice
                    isOpen={invoiceModalIsOpen}
                    onClose={() => { setInvoiceModalIsOpen(false) }}
                    model={invoiceModel}
                />
                <div className={styles.buttonContainer}>
                    <ButtonsForm nameOfButton={"Continue"} status={"save"} onClick={() => { creatInvoice(); }} />
                </div>
            </div>
            : <div className={styles.buttonContainer}>
                <AiTwotoneShopping size={400} color='rgb(241, 237, 237)' />
            </div>
        //     }
        // </a>

    )
}

export default ShoppingCard