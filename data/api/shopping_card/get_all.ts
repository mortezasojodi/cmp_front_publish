import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from '@/shared/network/api_constants';
import { String_Const } from '@/shared/constants/string_constants';
import { ShoppingCardEntity } from '@/domain/entity/shopping_card_entity';

export async function getAllShoppingCardApi(): Promise<Either<Error, ShoppingCardEntity[]>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/ShoppingCard`, {
            method: 'GET',
            headers: header,
        });
        const data = await response.json();
        const result: BaseResponse<ShoppingCardEntity[]> = data;

        if (result.Success) {
            return right(result.Data);
        } else {
            return left(new CusomerError(result.Message));
        }
    } catch (error) {
        return left(new Error(String_Const.Error));
    }
}
