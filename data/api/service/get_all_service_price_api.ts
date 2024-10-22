import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from '@/shared/network/api_constants';
import { String_Const } from '@/shared/constants/string_constants';
import { ServicePriceEntity } from '@/domain/entity/service_price_entity';

export async function getAllServicePriceApi(productId: string): Promise<Either<Error, ServicePriceEntity[]>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/Service/${productId}`, {
            method: 'GET',
            headers: header,
        });
        const data = await response.json();
        const result: BaseResponse<ServicePriceEntity[]> = data;

        if (result.Success) {
            return right(result.Data);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
