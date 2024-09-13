import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfig, AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from '@/shared/network/api_constants';
import { String_Const } from '@/shared/constants/string_constants';
import { DocumentEntity } from '@/domain/entity/document_entity';
import { DocumentCommand } from '@/domain/command/document_command';

export async function addDcoument(command: DocumentCommand): Promise<Either<Error, BaseResponse<object>>> {

    try {
        var header = await AppConfigHeader.tokenheader();
        const formData = new FormData();
        formData.append('BusinessLicense', command.BusinessLicense);
        formData.append('HealthDepartmentCertificate', command.HealthDepartmentCertificate);
        const response = await fetch(`${Netwrok.apiUrl}/Document`, {
            method: 'POST',
            headers: header,
            body: formData
        });
        const data = await response.json();
        const result: BaseResponse<object> = data;

        if (result.Success) {
            return right(result);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
