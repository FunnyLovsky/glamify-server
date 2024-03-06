import mongoose, { ClientSession } from 'mongoose'

type TCallback = (session: ClientSession) => Promise<object>

class TransactionService {
    async withTransaction(asyncCallback: TCallback) {
        let session: ClientSession | null = null
        try {
            session = await mongoose.startSession()
            session.startTransaction()
            console.log('startSession')

            const result = await asyncCallback(session)

            await session.commitTransaction()
            return result
        } catch (error: any) {
            if (session) {
                await session.abortTransaction()
                console.log('errSession')
            }
            throw new Error(error)
        } finally {
            if (session) {
                await session.endSession()
                console.log('endSession')
            }
        }
    }
}

export default new TransactionService()
