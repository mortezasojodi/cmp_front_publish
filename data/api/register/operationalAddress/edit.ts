import { right, left, Either, CusomerError } from "@/shared/core/either";
import { BaseResponse } from "@/shared/core/response/api_response";
import { AppConfig, AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from "@/shared/network/api_constants";
import { String_Const } from "@/shared/constants/string_constants";
import { BillingInfromationCommand } from "@/domain/command/billing_information_command";
import { OperationalAddressCommand } from "@/domain/command/operational_address_command";
import { OperationalAddressEntity } from "@/domain/entity/operational_address_entity";

export async function editOperationalAddress(
    command: OperationalAddressCommand, Id: number
): Promise<Either<Error, OperationalAddressEntity>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/OperationalAddress/${Id}`, {
            method: "Put",
            headers: header,
            body: JSON.stringify(command),
        });
        const data = await response.json();
        const result: BaseResponse<OperationalAddressEntity> = data;

        if (result.Success) {
            return right(result.Data);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
