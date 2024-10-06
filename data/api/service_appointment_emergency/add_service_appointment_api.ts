import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfig, AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from '@/shared/network/api_constants';
import { String_Const } from '@/shared/constants/string_constants';
import { AddServiceAppointmentCommand } from '@/domain/command/service_appointment/add_service_appointment_command';
import { AddServiceAppointmentEmergencyCommand } from '@/domain/command/service_appointment_emergency/add_service_appointment_emergency_command';
import { ServiceAppointmentEmergencyEntity } from '@/domain/entity/service_appointment_emergency';

export async function addServiceAppointmentApi(command: AddServiceAppointmentEmergencyCommand): Promise<Either<Error, BaseResponse<ServiceAppointmentEmergencyEntity[]>>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/ServiceAppointmentEmergency`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(command)
        });
        const data = await response.json();
        const result: BaseResponse<ServiceAppointmentEmergencyEntity[]> = data;

        if (result.Success) {
            return right(result);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
