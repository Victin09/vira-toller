import { Request, Response } from 'express';

import workspaceSchema, { IWorkspace } from '../models/workspace.model';

// Find workspaces by user id
export const findWorkspacesByUserId = async (req: Request, res: Response) => {
  try {
    const workspaces: IWorkspace[] = await workspaceSchema.find({ users: req.params.id }).select('-password');
    res.status(200).json({
      success: true,
      message: 'Workspaces found',
      data: workspaces,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error getting workspaces',
    });
  }
};
