import { right, left, Either, CusomerError } from '@/shared/core/either';
import { BaseResponse } from '@/shared/core/response/api_response';
import { AppConfigHeader } from '@/shared/app_config';
import { Netwrok } from '@/shared/network/api_constants';
import { String_Const } from '@/shared/constants/string_constants';
import { AddShoppingCardCommand } from '@/domain/command/shopping_card/add';

export async function addShoppingCard(command: AddShoppingCardCommand): Promise<Either<Error, BaseResponse<object>>> {
    try {
        var header = await AppConfigHeader.header();
        const response = await fetch(`${Netwrok.apiUrl}/ShoppingCard`, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(command)
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
