"use client"
import React from 'react';
import styles from '@/components/dashboard/invoicesTable/invoicesTable.module.css'
import Link from "next/link";
import Image from "next/image";

import { useState } from 'react';
import { MdDone } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";


export default function InvoicesTable(){

    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setButtonClicked(true);
        console.log('Кнопка нажата');
      };

    const data = [
        { number: '#00001', date: '11/17/23', amount: '$250', status: 'paid' },
        { number: '#00001', date: '11/17/23', amount: '$250', status: 'paid' },
        { number: '#00002', date: '11/18/23', amount: '$300', status: 'pay' },
        { number: '#00003', date: '11/19/23', amount: '$200', status: 'paid' },
        { number: '#00002', date: '11/18/23', amount: '$300', status: 'pay' },
        { number: '#00003', date: '11/19/23', amount: '$200', status: 'paid' },
        { number: '#00003', date: '11/19/23', amount: '$200', status: 'paid' },
    ];
    
    return(
            <div className={styles.table_container}>
            <table  className={styles.table}>
            <thead>
                <tr>
                    <th><button className={styles.sortButton} onClick={handleClick}><p>Number</p><img src="/sort.svg"/></button></th>
                    <th> <button  className={styles.sortButton}><p>Date</p><img src="/sort.svg"/></button></th>
                    <th><button  className={styles.sortButton}><p>Amount</p> <img src="/sort.svg"/></button></th>
                    <th><button  className={styles.sortButton}><p>Status</p> <img src="/sort.svg"/></button></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.number}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    {item.status === "paid" 
                    ? (<td> <div className={styles.statusPaid}><MdDone size={'24px'} />{item.status}</div></td>) 
                    : (<td className={styles.statusPay}><Link href={"/dashboard/invoices/payments"} className={styles.buttonPay}><IoCardOutline size={'24px'} />{item.status}</Link></td>)}
                    <td>
                    {item.status === "paid" 
                    ? (<Image  src="/download_icon_dark.svg" width={'24'} height={'24'} alt='download icon'/>) 
                    : (<Image src="/download_icon_grey.svg"  width={'24'} height={'24'} alt='download icon'/>)} 
                    </td>  
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}