import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfig, AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from '@/shared/network/api_constants';
import { CompanyEntity } from '@/domain/entity/company_entity';
import { String_Const } from '@/shared/constants/string_constants';
import { EditProfileCommand } from '@/domain/command/edit_profile_command';

export async function editCompany(command: EditProfileCommand): Promise<Either<Error, CompanyEntity>> {

    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/RegisterCompany`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(command)
        });
        const data = await response.json();
        const result: BaseResponse<CompanyEntity> = data;

        if (result.Success) {
            return right(result.Data);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
