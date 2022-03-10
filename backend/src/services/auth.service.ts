import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import User, { IUser } from '../models/user.model';

export const signup = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body;

  try {
    // check if email exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }
    user = await User.create({
      _id: uuid(),
      fullname,
      email,
      password,
      active: true,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET as string, {
      expiresIn: process.env.JWT_TOKEN_EXPIRE,
    });
    const jwtCookieExpire = Number(process.env.JWT_COOKIE_EXPIRE);
    const httpsDev = Boolean(process.env.HTTPS_DEV);
    const options = {
      expires: new Date(Date.now() + jwtCookieExpire * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: httpsDev,
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    return res.status(200).cookie('_token', token, options).json({
      success: true,
      message: 'Account login successfully',
      data: { user },
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Account creation error',
      data: err,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Validate email & password
  if (!email || !password) {
    return res.status(200).json({
      success: false,
      message: 'Please provide an email and password',
    });
  }

  // Check for user
  const user: IUser = await User.findOne({ email: email }).select('+password');
  if (!user) {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  // Check if password matches
  const isMatch = user.matchPassword(password);
  const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET as string, {
    expiresIn: process.env.JWT_TOKEN_EXPIRE,
  });

  const jwtCookieExpire = Number(process.env.JWT_COOKIE_EXPIRE);

  const httpsDev = Boolean(process.env.HTTPS_DEV);

  const options = {
    expires: new Date(Date.now() + jwtCookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: httpsDev,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  if (isMatch) {
    return res.status(200).cookie('_token', token, options).json({
      success: true,
      message: 'Account login successfully',
      data: { user },
    });
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials',
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(200).json({
      success: false,
      message: 'Please provide an email',
    });
  }

  const user = await User.findOne({ 'email': email });

  if (!user) {
    return res.status(200).json({
      success: false,
      message: 'Invalid email',
    });
  }

  const secretKey = `${process.env.JWT_TOKEN_SECRET}${user.password}`;
  const token = jwt.sign({ uid: user._id }, secretKey, {
    expiresIn: `1h`,
  });

  return res.status(200).json({
    success: true,
    data: { token },
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const token: string = req.params.token;

  const payload: JwtPayload = jwt.decode(token) as JwtPayload;
  if (!payload) {
    return res.status(200).json({
      success: false,
      message: 'Invalid reset token',
    });
  }

  const user: IUser = await User.findOne({ _ui: payload.uid }).select('+password');
  if (!user) {
    return res.status(200).json({
      success: false,
      message: 'Invalid reset token',
    });
  }

  const newPassword: string = await req.body.password;

  if (!newPassword) {
    return res.status(200).json({
      success: false,
      message: 'Please provide a new password',
    });
  }
  try {
    const secretKey = `${process.env.JWT_TOKEN_SECRET}${user.password}`;
    const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;

    if (user._id === decoded._id) {
      user.password = newPassword;
      await user.save();
      return res.status(200).json({
        success: true,
        message: 'Password updated successfully',
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'Invalid reset token',
      });
    }
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: 'Invalid reset token',
      data: err,
    });
  }
};
