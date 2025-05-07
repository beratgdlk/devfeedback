import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
