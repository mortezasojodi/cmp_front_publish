import { right, left, Either, CusomerError } from "@/shared/core/either";
import { BaseResponse } from "@/shared/core/response/api_response";
import { AppConfig, AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from "@/shared/network/api_constants";
import { String_Const } from "@/shared/constants/string_constants";
import { BillingInfromationCommand } from "@/domain/command/billing_information_command";
import { OperationalAddressCommand } from "@/domain/command/operational_address_command";
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";

export async function deleteOperationalAddress(
    Id: number
): Promise<Either<Error, BaseResponse<object>>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/OperationalAddress/${Id}`, {
            method: "DELETE",
            headers: header,
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
