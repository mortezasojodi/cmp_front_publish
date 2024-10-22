"use client"
import React, { useEffect } from 'react';
import styles from '@/components/dashboard/invoicesTable/invoicesTable.module.css'
import Link from "next/link";
import Image from "next/image";

import { useState } from 'react';
import { MdDone } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { GetAllInvoiceApi } from '@/data/api/invoice/get_all_invoice_api';
import { InvoiceEntity } from '@/domain/entity/invoice_entity';
import { useLoading } from '@/components/loading/loading_context';
import ShowInvoice from "@/components/Invoice/invoice_modal";

export default function InvoicesTable() {

    const [buttonClicked, setButtonClicked] = useState(false);
    const [invoices, setinvoices] = useState<InvoiceEntity[]>([]);
    const { setLoading } = useLoading();
    const [invoiceModalIsOpen, setInvoiceModalIsOpen] = useState(false);
    const [invoiceModel, setInvoiceModel] = useState<InvoiceEntity | null>(null);

    const handleClick = () => {
        setButtonClicked(true);
        console.log('Кнопка нажата');
    };

    useEffect(() => {
        fetchInvoice();
    }, []);


    async function fetchInvoice() {
        try {
            setLoading(true);
            var result = await GetAllInvoiceApi();
            result.fold(
                (error) => {
                },
                (data) => {
                    setinvoices(data);
                }
            );
        } finally {
            setLoading(false);
        }
    }
    function invoiceHandler(model: InvoiceEntity) {
        switch (model.Status) {
            case "draft":
                openInvoice(model);
                break;
            case "sent":
                openInvoice(model);
                break;

            default:
                break;
        }
    }

    const openInvoice = (data) => {
        setInvoiceModel(data);
        setInvoiceModalIsOpen(true);
    };


    return (
        <div className={styles.table_container}>
            <ShowInvoice
                isOpen={invoiceModalIsOpen}
                onClose={() => { fetchInvoice(); setInvoiceModalIsOpen(false) }}
                model={invoiceModel}
            />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><button className={styles.sortButton} onClick={handleClick}><p>Number</p><img src="/sort.svg" /></button></th>
                        <th> <button className={styles.sortButton}><p>Date</p><img src="/sort.svg" /></button></th>
                        <th><button className={styles.sortButton}><p>Amount</p> <img src="/sort.svg" /></button></th>
                        <th><button className={styles.sortButton}><p>Status</p> <img src="/sort.svg" /></button></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((item, index) => (
                        <tr key={index}>
                            <td>{item.InvoiceCrmId}</td>
                            <td>{new Date(item.RegisterDate).toLocaleDateString() + " " + new Date(item.RegisterDate).toLocaleTimeString()}</td>
                            <td>${item.Amount}</td>
                            {item.Status === "paid"
                                ? (<td>

                                    <div className={styles.statusPaid}><MdDone size={'24px'} />{item.Status}</div></td>)
                                : (<td className={styles.statusPay}><a
                                    onClick={() => invoiceHandler(item)}
                                    // href={"/dashboard/invoices/payments"}
                                    className={styles.buttonPay}><IoCardOutline size={'24px'} />{item.Status}</a></td>)}
                            <td>
                                {item.Status === "paid"
                                    ? (<Image src="/download_icon_dark.svg" onClick={() => openInvoice(item)} width={'24'} height={'24'} alt='download icon' />)
                                    : (<Image src="/download_icon_grey.svg" width={'24'} height={'24'} alt='download icon' />)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}