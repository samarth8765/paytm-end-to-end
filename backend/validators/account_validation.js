import zod from 'zod';

export const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number(),
});