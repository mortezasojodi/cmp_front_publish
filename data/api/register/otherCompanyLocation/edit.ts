import { right, left, Either, CusomerError } from "@/shared/core/either";
import { BaseResponse } from "@/shared/core/response/api_response";
import { AppConfig, AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from "@/shared/network/api_constants";
import { String_Const } from "@/shared/constants/string_constants";
import { OtherCompanyLocationCommand } from "@/domain/command/other_company_location_command";
import { CompanyEntity } from "@/domain/entity/company_entity";

export async function editOtherCompanyLocation(
    command: OtherCompanyLocationCommand, id: number
): Promise<Either<Error, CompanyEntity>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/RegisterCompanyLocation/${id}`, {
            method: "PUT",
            headers: header,
            body: JSON.stringify(command),
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
