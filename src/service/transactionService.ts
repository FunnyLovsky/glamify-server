import mongoose from "mongoose";

type TCallback = () => Promise<object>

class TransactionService {
    async withTransaction(asyncCallback: TCallback) {
        let session;
        try {
            session = await mongoose.startSession();
            session.startTransaction();

            const result = await asyncCallback();

            await session.commitTransaction();
            return result;
        } catch (error) {
            if (session) {
                await session.abortTransaction();
            }
            throw error;
        } finally {
            if (session) {
                session.endSession();
            }
        }
    }
}

export default new TransactionService()

