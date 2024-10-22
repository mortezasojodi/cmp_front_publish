import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfig, AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from '@/shared/network/api_constants';
import { String_Const } from '@/shared/constants/string_constants';
import { AddServiceAppointmentCommand } from '@/domain/command/service_appointment/add_service_appointment_command';
import { InvoiceEntity } from '@/domain/entity/invoice_entity';

export async function SendInvoiceApi(invoiceId: number): Promise<Either<Error, InvoiceEntity>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/Invoice/${invoiceId}`, {
            method: 'PUT',
            headers: header,
        });
        const data = await response.json();
        const result: BaseResponse<InvoiceEntity> = data;

        if (result.Success) {
            return right(result.Data);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
