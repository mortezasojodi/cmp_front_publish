// import { right, left, Either, CusomerError } from '@/shared/core/either';
// import { BaseResponse } from '@/shared/core/response/api_response';
// import { AppConfigHeader } from '@/shared/app_config';
// import { Netwrok } from '@/shared/network/api_constants';
// import { String_Const } from '@/shared/constants/string_constants';
// import { ServiceAppointmentEntity } from '@/domain/entity/service_appointment_entity';
// import { ServiceAppointmentEmergencyEntity } from '@/domain/entity/service_appointment_emergency';

// export async function getAllServiceEmergencyAppointmentApi(OperationalAddressId: number): Promise<Either<Error, BaseResponse<ServiceAppointmentEmergencyEntity[]>>> {
//     try {
//         var header = await AppConfigHeader.header();
//         const response = await fetch(`${Netwrok.apiUrl}/ServiceAppointmentEmergency/OperationalAddress${OperationalAddressId}`, {
//             method: 'GET',
//             headers: header,
//         });
//         const data = await response.json();
//         const result: BaseResponse<ServiceAppointmentEntity[]> = data;

//         if (result.Success) {
//             return right(result);
//         } else {
//             return left(new CusomerError(result.Message));
//         }
//     } catch (error) {
//         return left(new Error(String_Const.Error));
//     }
// }
