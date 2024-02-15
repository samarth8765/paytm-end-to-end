import zod from 'zod';

export const registerBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
});

export const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

export const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
});