import mongoose from "mongoose";
import ApiError from "../exceptions/api-error";

type TCallback = () => Promise<object>

class TransactionService {
    async withTransaction(asyncCallback: TCallback) {
        let session;
        try {
            session = await mongoose.startSession();
            session.startTransaction();
            console.log('startSession');
            
            const result = await asyncCallback();

            await session.commitTransaction();
            return result;
        } catch (error: any) {
            if (session) {
                await session.abortTransaction();
                console.log('errSession');
            }
            throw ApiError.BadRequest('Ошибка при создании продукта', [error.message]);
        } finally {
            if (session) {
                await session.endSession();
                console.log('endSession');
            }
        }
    }
}

export default new TransactionService()

