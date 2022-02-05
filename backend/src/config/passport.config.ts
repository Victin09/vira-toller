import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';

import User, { IUser } from '../models/user.model';

export interface JwtStrategyOptions {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
}

const opts: JwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN_SECRET as string,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.id }, async (err: unknown, user: IUser) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }),
);

export default passport;
