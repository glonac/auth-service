export const jwtConstants = {
  secret: process.env.JWT_TOKEN_SECRET,
  signOptions: { expiresIn: process.env.JWT_TOKEN_LIVE },
};
